import { useEffect, useState } from "react"
import { useAuth } from "./hooks/useAuth"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import socket from "./services/socket"

function Dashboard(){

  const { user, logout, deleteAccount } = useAuth()
  const navigate = useNavigate()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)

  /* socket connection */
  useEffect(()=>{

    socket.connect()

    socket.on("connect",()=>{
      console.log("Connected:",socket.id)
    })

    socket.on("disconnect",()=>{
      console.log("Disconnected")
    })

    socket.on("connect_error",(b)=>{
      console.log("Error:",b.message)
    })

    socket.on("newPost", (data)=>{
      toast.success(data.message || "New post created!")
    })

    return ()=>{

      socket.off("connect")
      socket.off("disconnect")
      socket.off("connect_error")
      socket.off("newPost")

      socket.disconnect()

    }

  },[])

  const handleCreatePost = async (e) => {
    e.preventDefault()
    
    if (!title.trim() || !content.trim()) {
      toast.error("Title and content are required")
      return
    }

    setLoading(true)
    try {
      const response = await fetch("http://localhost:5000/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          title,
          content,
          userId: user._id
        })
      })

      if (response.ok) {
        setTitle("")
        setContent("")
        toast.success("Post created successfully!")
      } else {
        toast.error("Failed to create post")
      }
    } catch (err) {
      toast.error("Error creating post: " + err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  const handleDelete = async () => {

    const confirmed = window.confirm("Are you sure you want to delete your account?")

    if(!confirmed){
      return
    }

    const result = await deleteAccount(user._id, user.email)

    if(result.success){
      toast.success(result.message)
      navigate("/")
    } else {
      toast.error(result.message)
    }
  }

  return(

    <div style={{ padding: "20px", fontFamily: "Arial" }}>

      <h1>Dashboard</h1>

      <p>Welcome {user?.name}</p>
      <p>{user?.email}</p>

      <hr />

      <h2>Create Post</h2>
      <form onSubmit={handleCreatePost}>
        <div style={{ marginBottom: "10px" }}>
          <input 
            type="text" 
            placeholder="Post Title" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <textarea 
            placeholder="Post Content" 
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{ width: "100%", padding: "8px", boxSizing: "border-box", minHeight: "100px" }}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Post"}
        </button>
      </form>

      <hr />

      <button onClick={handleLogout}>
        Logout
      </button>

      <br/><br/>

      <button onClick={()=>navigate("/edit")}>
        Edit Profile
      </button>

      <br/><br/>

      <button onClick={handleDelete}>
        Delete Account
      </button>

    </div>
  )
}

export default Dashboard