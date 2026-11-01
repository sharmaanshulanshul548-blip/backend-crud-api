import mongoose from "mongoose";
import { Post } from "../models/post.model.js";

function validId(id) {
  return mongoose.isObjectIdOrHexString(id);
}

function validationError(res, error) {
  if (error.name === "ValidationError") {
    res.status(400).json({ message: error.message });
    return true;
  }
  return false;
}

export async function createPost(req, res) {
  try {
    const { name, description, age } = req.body;
    if (!name?.trim() || !description?.trim() || age === undefined) {
      return res.status(400).json({ message: "Name, description and age are required" });
    }

    const post = await Post.create({ name, description, age });
    return res.status(201).json({ message: "Post created successfully", post });
  } catch (error) {
    if (validationError(res, error)) return;
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function getPosts(_req, res) {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    return res.status(200).json({ count: posts.length, posts });
  } catch {
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function getPostById(req, res) {
  try {
    if (!validId(req.params.id)) return res.status(400).json({ message: "Invalid post ID" });
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    return res.status(200).json({ post });
  } catch {
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function updatePost(req, res) {
  try {
    if (!validId(req.params.id)) return res.status(400).json({ message: "Invalid post ID" });
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "No data provided for update" });
    }

    const allowed = ["name", "description", "age"];
    const update = Object.fromEntries(Object.entries(req.body).filter(([key]) => allowed.includes(key)));
    if (Object.keys(update).length === 0) {
      return res.status(400).json({ message: "Only name, description and age can be updated" });
    }

    const post = await Post.findByIdAndUpdate(req.params.id, update, {
      new: true,
      runValidators: true,
    });
    if (!post) return res.status(404).json({ message: "Post not found" });
    return res.status(200).json({ message: "Post updated successfully", post });
  } catch (error) {
    if (validationError(res, error)) return;
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function deletePost(req, res) {
  try {
    if (!validId(req.params.id)) return res.status(400).json({ message: "Invalid post ID" });
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    return res.status(200).json({ message: "Post deleted successfully" });
  } catch {
    return res.status(500).json({ message: "Internal server error" });
  }
}
