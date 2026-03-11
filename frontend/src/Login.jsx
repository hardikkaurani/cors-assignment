import {useState} from "react"

function Login(){

  const [a,b] = useState("")
  const [c,d] = useState("")
  const [e,f] = useState("")

  const g = async (h)=>{
    h.preventDefault()

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

    if(j.token){
      localStorage.setItem("token",j.token)
      localStorage.setItem("user",JSON.stringify(j.user))
      window.location="/dashboard"
    }else{
      f(j.msg)
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

      <p>{e}</p>

    </div>
  )
}

export default Login