import {useState} from "react"
import { useAuth } from "./hooks/useAuth"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

function Register(){

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e)=>{
    e.preventDefault()

    if(password !== confirmPassword){
      toast.error("Passwords do not match")
      return
    }

    const result = await register(name, email, password)

    if(result.success){
      toast.success(result.message)
      navigate("/login")
    } else {
      toast.error(result.message)
    }
  }

  return(
    <div>
      <h2>Register</h2>

      <form onSubmit={handleSubmit}>

        <input
        placeholder="Name"
        value={name}
        onChange={(e)=>setName(e.target.value)}
        />

        <input
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        />

        <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        />

        <input
        placeholder="Confirm Password"
        type="password"
        value={confirmPassword}
        onChange={(e)=>setConfirmPassword(e.target.value)}
        />

        <button>Register</button>

      </form>

    </div>
  )
}

export default Register