import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";

function Home() {
  const { isLoggedIn } = useContext(AuthContext);
 
  return (
    <div className="home">
      <section className="logo">
        <img src="/pictures/logo.png" alt="logo" />
      </section>
      <section className="intro">
        <p>
          It doesn't matter if you're a pastry connoisseur, an aficionado or
          just want to learn and have a good time cooking. La Petite Pâtisserie
          is a place where you can find an amazing variety of recipes of all
          kind: cakes, pastries, biscuits, desserts, puddings...
          
        </p>
      </section>
      <section>
      
        {!isLoggedIn && (
          <Link to={"/auth/signup"}>
            <button className="buttons">Create an account</button>
          </Link>
        )}
        <br />
        {!isLoggedIn && (
          <Link to={"/auth/login"}>
            <button className="buttons">Login</button>
          </Link>
        )}
        <br />
        <Link to={"/recipes"}>
          <button className="buttons">Check our recipe library</button>
        </Link>
      </section>
    </div>
  );
}

export default Home;
