import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function Navbar() {
  const { isLoggedIn, authenticateUser } = useContext(AuthContext);
  const navigate = useNavigate()
  const handleLogout = () =>{
    //! Borraremos el token
    localStorage.removeItem("authToken")

    //! Validamos que el token ha sido borrado
    authenticateUser()
    navigate("/")
}
  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      {isLoggedIn && <Link to="/profile">Profile</Link>}
      {isLoggedIn &&  <Link to="/" onClick={handleLogout}>Logout</Link>}
      {!isLoggedIn && <Link to="/auth/signup">Signup</Link>}
      {!isLoggedIn && <Link to="/auth/login">Login</Link>}
    </nav>
  );
}
//! Actualizar botones
export default Navbar;
