//! Envoltorio para renderizar ciertos componentes si el usuario está loggeado
//! Usar otro para admin??
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { Navigate } from "react-router-dom";

function IsPrivate(props) {
  const { isLoggedIn } = useContext(AuthContext);
  //Si el usuario está loggeado podrá ver el contenido
  if (isLoggedIn) {
    return props.children;
  } else {
    return <Navigate to="/" />;
  }
}

export default IsPrivate;
