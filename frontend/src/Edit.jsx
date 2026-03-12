import {useState,useEffect} from "react"

function Edit(){

  const [a,b] = useState("")
  const c = JSON.parse(localStorage.getItem("user"))

  useEffect(()=>{

    fetch("/api/users/"+c._id)
    .then(d=>d.json())
    .then(e=>b(e.name))

  },[])

  const f = async(g)=>{

    g.preventDefault()

    const h = await fetch("/api/users/update/"+c._id,{
      method:"PUT",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name:a,
        email:c.email
      })
    })

    const i = await h.json()

    alert(i.msg)
  }

  return(

    <div>

      <h2>Edit Profile</h2>

      <form onSubmit={f}>

        <input value={a} onChange={(x)=>b(x.target.value)} />

        <button>Update</button>

      </form>

    </div>

  )

}

export default Edit