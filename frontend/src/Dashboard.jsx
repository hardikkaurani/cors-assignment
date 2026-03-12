function Dashboard(){

  const a = JSON.parse(localStorage.getItem("user"))

  const b = ()=>{
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    window.location="/"
  }

  const c = async ()=>{

    const d = confirm("Are you sure you want to delete your account?")

    if(!d){
      return
    }

    const e = await fetch("/api/users/delete/"+a._id,{
      method:"DELETE",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        email:a.email
      })
    })

    const f = await e.json()

    alert(f.msg)

    localStorage.removeItem("token")
    localStorage.removeItem("user")

    window.location="/"
  }

  return(

    <div>

      <h1>Dashboard</h1>

      <p>Welcome {a?.name}</p>
      <p>{a?.email}</p>

      <button onClick={b}>
        Logout
      </button>

      <br/><br/>

      <button onClick={()=>window.location="/edit"}>
        Edit Profile
      </button>

      <br/><br/>

      <button onClick={c}>
        Delete Account
      </button>

    </div>

  )
}

export default Dashboard