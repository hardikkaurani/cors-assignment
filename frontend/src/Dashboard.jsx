import { useEffect } from "react"
import { useAuth } from "./hooks/useAuth"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import socket from "./services/socket"

function Dashboard(){

  const { user, logout, deleteAccount } = useAuth()
  const navigate = useNavigate()

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

    return ()=>{

      socket.off("connect")
      socket.off("disconnect")
      socket.off("connect_error")

      socket.disconnect()

    }

  },[])

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

    <div>

      <h1>Dashboard</h1>

      <p>Welcome {user?.name}</p>
      <p>{user?.email}</p>

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