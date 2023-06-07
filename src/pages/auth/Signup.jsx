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
      navigate("/auth/login"); //* El usuario se crea y nos redirige a Login (funciona)
    } catch (error) {
      // console.log(error.response.status)
      // console.log(error.response.date.errorMessage);
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
        <form onSubmit={handleSignup}>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleUsernameChange}
          />

          <br />

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

          <br /><br />
          {errorMessage && <p style={{ fontWeight: "bold" }}>{errorMessage}</p>}
          <button type="submit">Create your account</button>
        </form>
      </section>
    </div>
  );
}

export default Signup;
