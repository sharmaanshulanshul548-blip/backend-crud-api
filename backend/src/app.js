import express from "express";
import postRouter from "./routes/post.route.js";
import userRouter from "./routes/user.route.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req, res) => {
  res.status(200).json({
    message: "Backend CRUD API is running",
    health: "/api/v1/health",
  });
});

app.get("/api/v1/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);

app.use((_req, res) => {
  res.status(404).json({ message: "Route not found" });
});

export default app;
