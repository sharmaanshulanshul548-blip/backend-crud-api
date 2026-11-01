import assert from "node:assert/strict";
import { after, before, describe, test } from "node:test";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import request from "supertest";
import app from "../backend/src/app.js";

let mongo;

before(async () => {
  mongo = await MongoMemoryServer.create();
  await mongoose.connect(mongo.getUri());
});

after(async () => {
  await mongoose.disconnect();
  await mongo.stop();
});

describe("health endpoint", () => {
  test("reports that the API is running", async () => {
    const response = await request(app).get("/api/v1/health");
    assert.equal(response.status, 200);
    assert.equal(response.body.status, "ok");
  });
});

describe("user endpoints", () => {
  test("registers a user, hides the password, and logs in", async () => {
    const details = { username: "student", email: "student@example.com", password: "secret123" };
    const registered = await request(app).post("/api/v1/users/register").send(details);
    assert.equal(registered.status, 201);
    assert.equal(registered.body.user.email, details.email);
    assert.equal(registered.body.user.password, undefined);

    const login = await request(app)
      .post("/api/v1/users/login")
      .send({ email: details.email, password: details.password });
    assert.equal(login.status, 200);
  });

  test("rejects a duplicate user", async () => {
    const response = await request(app).post("/api/v1/users/register").send({
      username: "student",
      email: "student@example.com",
      password: "secret123",
    });
    assert.equal(response.status, 409);
  });
});

describe("posts CRUD endpoints", () => {
  let postId;

  test("creates a post", async () => {
    const response = await request(app).post("/api/v1/posts/create").send({
      name: "Anshu",
      description: "My first backend post",
      age: 20,
    });
    assert.equal(response.status, 201);
    postId = response.body.post._id;
  });

  test("reads all posts and one post", async () => {
    const all = await request(app).get("/api/v1/posts/getPosts");
    assert.equal(all.status, 200);
    assert.equal(all.body.count, 1);

    const one = await request(app).get(`/api/v1/posts/${postId}`);
    assert.equal(one.status, 200);
    assert.equal(one.body.post.name, "Anshu");
  });

  test("updates a post", async () => {
    const response = await request(app)
      .patch(`/api/v1/posts/update/${postId}`)
      .send({ description: "Updated from the test" });
    assert.equal(response.status, 200);
    assert.equal(response.body.post.description, "Updated from the test");
  });

  test("deletes a post", async () => {
    const deleted = await request(app).delete(`/api/v1/posts/delete/${postId}`);
    assert.equal(deleted.status, 200);

    const missing = await request(app).get(`/api/v1/posts/${postId}`);
    assert.equal(missing.status, 404);
  });
});
