import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginService } from "../../services/auth.services";
import { ProgressBar } from "react-loader-spinner";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

function Login() {
  const { authenticateUser } = useContext(AuthContext);

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  // ERRORES

  const [errorMessage, setErrorMessage] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await loginService({ email, password }); // userCredentials

      console.log(response); // => De aqui obtendremos response.data.authToken

      //! Guardamos el token en el navegador (localStorage)
      localStorage.setItem("authToken", response.data.authToken);
      //! Validamos el token para comprobar quién es el usuario y si está loggeado.
      await authenticateUser();

      setIsLoading(false);
      navigate("/profile");
    } catch (error) {
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage); // Mensajes de error funcionando según qué validación no se está cumpliendo.
      } else {
        navigate("/error");
      }
    }
  };

  if (isLoading) {
    return (
      <div>
        <ProgressBar
          height="80"
          width="80"
          ariaLabel="progress-bar-loading"
          wrapperStyle={{}}
          wrapperClass="progress-bar-wrapper"
          borderColor="#51E5FF"
          barColor="lightBlue"
          className="loading-bar"
        />
      </div>
    );
  }
  return (
    <div className="auth">
      <section className="auth-form">
        <h2>Login form</h2>
        <form onSubmit={handleLogin}>
          <label>Email:</label>
          <br />
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
          />
          <br />
          <br />

          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
          />

          <br />
          {errorMessage && <p style={{ fontWeight: "bold" }}>{errorMessage}</p>}
          <br />
          <button type="submit">Login</button>
        </form>
      </section>
    </div>
  );
}

export default Login;
