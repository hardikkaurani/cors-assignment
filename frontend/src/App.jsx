import Login from "./Login"
import Dashboard from "./Dashboard"

function App(){

  const a = localStorage.getItem("token")

  if(a){
    return <Dashboard/>
  }

  return <Login/>
}

export default App