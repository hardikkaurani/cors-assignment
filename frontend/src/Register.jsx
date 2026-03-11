import {useState} from "react"

function Register(){

  const [a,b] = useState("")
  const [c,d] = useState("")
  const [e,f] = useState("")
  const [g,h] = useState("")
  const [i,j] = useState("")

  const k = async (l)=>{
    l.preventDefault()

    if(e!==g){
      j("Passwords not match")
      return
    }

    const m = await fetch("/api/users/register",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name:a,
        email:c,
        password:e
      })
    })

    const n = await m.json()

    j(n.msg)
  }

  return(
    <div>
      <h2>Register</h2>

      <form onSubmit={k}>

        <input
        placeholder="Name"
        onChange={(x)=>b(x.target.value)}
        />

        <input
        placeholder="Email"
        onChange={(x)=>d(x.target.value)}
        />

        <input
        placeholder="Password"
        type="password"
        onChange={(x)=>f(x.target.value)}
        />

        <input
        placeholder="Confirm Password"
        type="password"
        onChange={(x)=>h(x.target.value)}
        />

        <button>Register</button>

      </form>

      <p>{i}</p>

    </div>
  )
}

export default Register