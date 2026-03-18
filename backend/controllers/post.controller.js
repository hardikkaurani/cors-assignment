import Post from "../models/post.model.js"

export const createPost = async (req, res, io) => {
  try {
    const { title, content, coverImage } = req.body
    const userId = req.user?.id || req.body.userId

    if (!title || !content) {
      return res.status(400).json({ msg: "Title and content are required" })
    }

    const newPost = new Post({
      userId,
      title,
      content,
      coverImage: coverImage || null
    })

    await newPost.save()

    // Emit new post event to all connected clients
    io.emit("newPost", {
      message: "New post created",
      post: newPost
    })

    res.status(201).json({ msg: "Post created successfully", post: newPost })

  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message })
  }
}

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("userId", "name email")
    res.json(posts)

  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message })
  }
}

export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("userId", "name email")

    if (!post) {
      return res.status(404).json({ msg: "Post not found" })
    }

    res.json(post)

  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message })
  }
}

export const updatePost = async (req, res, io) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true })

    if (!post) {
      return res.status(404).json({ msg: "Post not found" })
    }

    // Emit post update event
    io.emit("postUpdated", {
      message: "Post updated",
      post
    })

    res.json({ msg: "Post updated", post })

  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message })
  }
}

export const deletePost = async (req, res, io) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id)

    if (!post) {
      return res.status(404).json({ msg: "Post not found" })
    }

    // Emit post delete event
    io.emit("postDeleted", {
      message: "Post deleted",
      postId: req.params.id
    })

    res.json({ msg: "Post deleted" })

  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message })
  }
}
