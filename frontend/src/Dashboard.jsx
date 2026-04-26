import { useEffect, useState } from "react"
import { useAuth } from "./hooks/useAuth"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import socket from "./services/socket"
import CreatePost from "./CreatePost"

function Dashboard(){

  const { user, logout, deleteAccount } = useAuth()
  const navigate = useNavigate()
  const [posts, setPosts] = useState([])
  const [postsLoading, setPostsLoading] = useState(false)

  /* Fetch posts */
  const fetchPosts = async () => {
    try {
      setPostsLoading(true)
      const response = await fetch("http://localhost:5000/api/posts", {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setPosts(data)
      }
    } catch (err) {
      toast.error("Error fetching posts: " + err.message)
    } finally {
      setPostsLoading(false)
    }
  }

  /* socket connection */
  useEffect(() => {

    socket.connect()

    socket.on("connect", () => {
      console.log("Connected:", socket.id)
    })

    socket.on("disconnect", () => {
      console.log("Disconnected")
    })

    socket.on("connect_error", (b) => {
      console.log("Error:", b.message)
    })

    socket.on("newPost", (data) => {
      toast.success(data.message || "New post created!")
      fetchPosts()
    })

    return () => {

      socket.off("connect")
      socket.off("disconnect")
      socket.off("connect_error")
      socket.off("newPost")

      socket.disconnect()

    }

  }, [])

  /* Initial posts load */
  useEffect(() => {
    fetchPosts()
  }, [])

  const handlePostCreated = () => {
    fetchPosts()
  }

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  const handleDelete = async () => {

    const confirmed = window.confirm("Are you sure you want to delete your account?")

    if (!confirmed) {
      return
    }

    const result = await deleteAccount(user._id, user.email)

    if (result.success) {
      toast.success(result.message)
      navigate("/")
    } else {
      toast.error(result.message)
    }
  }

  return (

    <div style={{ padding: "20px", fontFamily: "Arial" }}>

      <h1>Dashboard</h1>

      <p>Welcome {user?.name}</p>
      <p>{user?.email}</p>

      <hr />

      <CreatePost user={user} onPostCreated={handlePostCreated} />

      <hr />

      <h2>Posts</h2>
      {postsLoading ? (
        <p>Loading posts...</p>
      ) : posts.length === 0 ? (
        <p>No posts yet. Create one above!</p>
      ) : (
        <div>
          {posts.map((post) => (
            <div key={post._id} style={{ marginBottom: "20px", padding: "15px", border: "1px solid #ddd", borderRadius: "8px" }}>
              {post.coverImage && (
                <img 
                  src={post.coverImage} 
                  alt="cover" 
                  style={{ maxWidth: "100%", maxHeight: "300px", marginBottom: "10px", borderRadius: "4px" }}
                />
              )}
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <small style={{ color: "#666" }}>
                By {post.userId?.name} • {new Date(post.createdAt).toLocaleDateString()}
              </small>
            </div>
          ))}
        </div>
      )}

      <hr />

      <button onClick={() => navigate("/edit")}>
        Edit Profile
      </button>

      <br /><br />

      <button onClick={handleLogout}>
        Logout
      </button>

      <br /><br />

      <button onClick={handleDelete}>
        Delete Account
      </button>

    </div>
  )
}

export default Dashboard