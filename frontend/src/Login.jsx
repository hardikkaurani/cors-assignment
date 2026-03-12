import { useState } from "react"
import { toast } from "react-toastify"

function Login(){

  const [a,b] = useState("")
  const [c,d] = useState("")

  const g = async (h)=>{
    h.preventDefault()

    try{

      const i = await fetch("/api/users/login",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          email:a,
          password:c
        })
      })

      const j = await i.json()

      if(!i.ok){
        throw new Error(j.message)
      }

      localStorage.setItem("token",j.token)
      localStorage.setItem("user",JSON.stringify(j.user))

      toast.success("Login successful")

      window.location="/dashboard"

    }catch(k){

      toast.error(k.message)

    }
  }

  return(
    <div>

      <h2>Login</h2>

      <form onSubmit={g}>

        <input
        placeholder="Email"
        onChange={(x)=>b(x.target.value)}
        />

        <input
        type="password"
        placeholder="Password"
        onChange={(x)=>d(x.target.value)}
        />

        <button>Login</button>

      </form>

    </div>
  )
}

export default Login