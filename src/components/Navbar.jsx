import { Link } from "react-router-dom"


function Navbar() {
  return (
    <nav className="navbar">
    <Link to="/"></Link>
    <Link to="/auth/signup">Signup</Link>
    <Link to="/auth/login">Login</Link>
    </nav>
  )
}

export default Navbar