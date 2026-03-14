import { useState } from "react"
import { useAuth } from "./hooks/useAuth"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

function Login(){

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e)=>{
    e.preventDefault()

    const result = await login(email, password)

    if(result.success){
      toast.success(result.message)
      navigate("/dashboard")
    } else {
      toast.error(result.message)
    }
  }

  return(
    <div>

      <h2>Login</h2>

      <form onSubmit={handleSubmit}>

        <input
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        />

        <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        />

        <button>Login</button>

      </form>

    </div>
  )
}

export default Login