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
    <section className="navbar-links">
    <Link to="/search"><img src="/pictures/search.png" alt="Search" /></Link>
      <Link to="/"><img src="/pictures/home.png" alt="Home" /></Link>
      {isLoggedIn && <Link to="/profile"><img src="/pictures/user.png" alt="User Profile" /></Link>}
      {isLoggedIn &&  <Link to="/" onClick={handleLogout}><img src="/pictures/logout.png" alt="Logout" /></Link>}
      {!isLoggedIn && <Link to="/auth/signup"><img src="/pictures/add-user.png" alt="Sign Up" /></Link>}
      {!isLoggedIn && <Link to="/auth/login"><img src="/pictures/enter.png" alt="Login" /></Link>}
      </section>
    </nav>
  );
}
//! Actualizar botones
export default Navbar;

