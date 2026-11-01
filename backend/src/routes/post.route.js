import { Router } from "express";
import {
  createPost,
  deletePost,
  getPostById,
  getPosts,
  updatePost,
} from "../controllers/post.controller.js";

const router = Router();

// Route names match the tutorial, plus GET /:id for reading one post.
router.post("/create", createPost);
router.get("/getPosts", getPosts);
router.get("/:id", getPostById);
router.patch("/update/:id", updatePost);
router.delete("/delete/:id", deletePost);

export default router;
