//ESTILOS
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import AccountCircle from "@mui/icons-material/AccountCircle";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupService } from "../../services/auth.services";

function Signup() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //! MENSAJE DE ERROR

  const [errorMessage, setErrorMessage] = useState("");

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const user = {
        username,
        email,
        password,
      };

      await signupService(user);

      navigate("/auth/login");
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
        <h2>Signup form</h2>
        <Box sx={{ "& > :not(style)": { m: 1 } }}>
          <FormControl variant="standard">
            <InputLabel htmlFor="username-input">Username:</InputLabel>
            <Input
              id="username-input"
              startAdornment={
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              }
              value={username}
              onChange={handleUsernameChange}
            />
          </FormControl>
          <FormControl variant="standard">
            <InputLabel htmlFor="email-input">Email:</InputLabel>
            <Input
              id="email-input"
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
          <button type="submit" onClick={handleSignup}>
            Create your account
          </button>
        </Box>
      </section>
    </div>
  );
}

export default Signup;
