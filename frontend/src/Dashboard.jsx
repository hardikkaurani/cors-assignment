function Dashboard(){

  const a = JSON.parse(localStorage.getItem("user"))

  const b = ()=>{
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

    </div>
  )
}

export default Dashboard