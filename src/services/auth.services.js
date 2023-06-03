import service from "./config.services";



//! UN SERVICE POR CADA RUTA QUE TENGAMOS EN EL BACKEND??

const signupService = (user) => {
    //user => username, email, pass
  return service.post("/auth/signup", user);
};

const loginService = (userCredentials) => {
  //userCredentials => email, pass
  return service.post("/auth/login", userCredentials);
};

const verifyService = () => {
  return service.get("/auth/verify");
};

export { signupService, loginService, verifyService };


