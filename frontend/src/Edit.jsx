import {useState} from "react"
import { useAuth } from "./hooks/useAuth"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

function Edit(){

  const [editName, setEditName] = useState("")
  const { user, updateProfile } = useAuth()
  const navigate = useNavigate()

  // Use editName if provided, otherwise use user.name from context
  const currentName = editName || user?.name || ""

  const handleSubmit = async(e)=>{

    e.preventDefault()

    if(!currentName.trim()){
      toast.error("Name is required")
      return
    }

    const result = await updateProfile(user._id, editName || user?.name, user.email)

    if(result.success){
      toast.success(result.message)
      navigate("/dashboard")
    } else {
      toast.error(result.message)
    }
  }

  if(!user){
    return <div>Loading...</div>
  }

  return(

    <div>

      <h2>Edit Profile</h2>

      <form onSubmit={handleSubmit} key={user?._id}>

        <input
        value={editName || user?.name || ""}
        onChange={(e)=>setEditName(e.target.value)}
        placeholder="Name"
        />

        <button>Update</button>

      </form>

    </div>

  )

}

export default Edit