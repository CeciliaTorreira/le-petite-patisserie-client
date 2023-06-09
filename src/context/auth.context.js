import { createContext, useEffect, useState } from "react";
import { verifyService } from "../services/auth.services";
import { ProgressBar } from "react-loader-spinner";

const AuthContext = createContext();

function AuthWrapper(props) {
  //1.Estados o funciones a exportar.
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeUser, setActiveUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    authenticateUser();
  }, []);

  // Validamos el token y recibimos el payload
  const authenticateUser = async () => {
    try {
      const response = await verifyService(); //! Función que contacta al backend
      setIsLoggedIn(true);
      setActiveUser(response.data.payload); //!
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoggedIn(false);
      setActiveUser(null);
      setIsLoading(false);
    }
  };
  //2. Objeto de contexto que pasamos.
  const passedContext = {
    isLoggedIn,
    activeUser,
    authenticateUser,
  };

  if (isLoading) {
    return (
      <div className="App">
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

  //3. Renderizacion o contexto.
  return (
    <AuthContext.Provider value={passedContext}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthWrapper };
