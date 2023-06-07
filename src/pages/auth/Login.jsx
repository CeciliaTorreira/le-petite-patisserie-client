import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginService } from "../../services/auth.services";

import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

function Login() {


   
  const {authenticateUser} = useContext(AuthContext)

  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // ERRORES

  const [errorMessage, setErrorMessage] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = async (e) => {
    e.preventDefault();
    

    try {

      const response = await loginService({email, password})  // userCredentials

      console.log(response); // => De aqui obtendremos response.data.authToken

      //! Guardamos el token en el navegador (localStorage)
      localStorage.setItem("authToken", response.data.authToken)   
      //! Validamos el token para comprobar quién es el usuario y si está loggeado.
     await authenticateUser()


       navigate("/profile") 
    } catch (error) {
      console.log(error);
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);  // Mensajes de error funcionando según qué validación no se está cumpliendo.
      } else {
        navigate("/error");
      }
    }
}


  return (
    <div className="auth">
 
 <section className="auth-form">
 <h2>Login form</h2>
 <form onSubmit={handleLogin}>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />

        <br />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />
           
        <br />
        {errorMessage && <p style={{fontWeight: "bold"}}>{errorMessage}</p>}
        <br />
        <button type="submit">Login</button>
      </form>
      </section>
    </div>
  )
}

export default Login