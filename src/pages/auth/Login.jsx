//ESTILOS
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginService } from "../../services/auth.services";

import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

function Login() {
  const { authenticateUser } = useContext(AuthContext);

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

      navigate("/profile");
    } catch (error) {
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

  return (
    <div className="auth">
      <section className="auth-form">
        <h2>Login form</h2>
        <Box sx={{ "& > :not(style)": { m: 1 } }}>
          <FormControl variant="standard">
            <InputLabel htmlFor="email-input">Email:</InputLabel>
            <Input
              id="email-input"
              type="email"
              value={email}
              onChange={handleEmailChange}
            />
          </FormControl>
          <FormControl variant="standard">
            <InputLabel htmlFor="password-input">Password:</InputLabel>
            <Input
              id="password-input"
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </FormControl>
          {errorMessage && <p style={{ fontWeight: "bold" }}>{errorMessage}</p>}
          <button type="submit" onClick={handleLogin}>
            Login
          </button>
        </Box>
      </section>
    </div>
  );
}

export default Login;
