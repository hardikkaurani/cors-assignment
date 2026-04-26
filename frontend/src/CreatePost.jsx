import { useState } from "react"
import toast from "react-hot-toast"

export default function CreatePost({ user, onPostCreated }) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [imageFile, setImageFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [uploadError, setUploadError] = useState("")

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      setUploadError("")
    }
  }

  const handleUpload = async () => {
    if (!imageFile) {
      return null
    }

    try {
      const formData = new FormData()
      formData.append("image", imageFile)

      const response = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData
        // Do NOT manually set Content-Type
      })

      if (!response.ok) {
        throw new Error("Upload failed")
      }

      const data = await response.json()
      return data.secure_url
    } catch (err) {
      setUploadError("Image upload failed: " + err.message)
      toast.error("Image upload failed")
      return null
    }
  }

  const handleCreatePost = async (e) => {
    e.preventDefault()

    if (!title.trim() || !content.trim()) {
      toast.error("Title and content are required")
      return
    }

    setLoading(true)
    try {
      // Step 1: Upload image if selected
      let imageUrl = ""
      if (imageFile) {
        imageUrl = await handleUpload()
        if (!imageUrl) {
          setLoading(false)
          return
        }
      }

      // Step 2: Create post with image URL
      const response = await fetch("http://localhost:5000/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          title,
          content,
          coverImage: imageUrl || null,
          userId: user._id
        })
      })

      if (response.ok) {
        // Reset form
        setTitle("")
        setContent("")
        setImageFile(null)
        setUploadError("")
        
        toast.success("Post created successfully!")
        
        // Notify parent component
        if (onPostCreated) {
          onPostCreated()
        }
      } else {
        toast.error("Failed to create post")
      }
    } catch (err) {
      toast.error("Error creating post: " + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ marginBottom: "30px", padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>
      <h2>Create Post</h2>
      
      <form onSubmit={handleCreatePost}>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="text"
            placeholder="Post Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={loading}
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <textarea
            placeholder="Post Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={loading}
            style={{ width: "100%", padding: "8px", boxSizing: "border-box", minHeight: "100px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Upload Cover Image (Optional)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={loading}
            style={{ padding: "8px" }}
          />
          {imageFile && <p style={{ fontSize: "12px", color: "#666" }}>Selected: {imageFile.name}</p>}
          {uploadError && <p style={{ color: "red", fontSize: "12px" }}>{uploadError}</p>}
        </div>

        <button type="submit" disabled={loading} style={{ padding: "8px 16px", cursor: loading ? "not-allowed" : "pointer" }}>
          {loading ? "Creating..." : "Create Post"}
        </button>
      </form>
    </div>
  )
}
