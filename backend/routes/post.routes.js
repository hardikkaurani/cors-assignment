import express from "express"
import { createPost, getAllPosts, getPostById, updatePost, deletePost } from "../controllers/post.controller.js"

export const createPostRoutes = (io) => {
  const router = express.Router()

  router.post("/", (req, res) => {
    createPost(req, res, io)
  })

  router.get("/", getAllPosts)

  router.get("/:id", getPostById)

  router.put("/:id", (req, res) => {
    updatePost(req, res, io)
  })

  router.delete("/:id", (req, res) => {
    deletePost(req, res, io)
  })

  return router
}
