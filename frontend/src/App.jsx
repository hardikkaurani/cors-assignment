import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { useAuth } from "./hooks/useAuth"
import Login from "./Login"
import Register from "./Register"
import Dashboard from "./Dashboard"
import Edit from "./Edit"
import ConnectionTest from "./ConnectionTest"

function App(){

  const { isAuthenticated, loading } = useAuth()

  if(loading){
    return <div>Loading...</div>
  }

  return(
    <Router>
      <Routes>
        <Route path="/test" element={<ConnectionTest />} />
        
        {isAuthenticated ? (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/edit" element={<Edit />} />
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        )}
      </Routes>
    </Router>
  )
}

export default App