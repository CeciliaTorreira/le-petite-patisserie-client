import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import {
  loadProfileService,
  getFavouriteRecipesService,
  getCreatedRecipesService,
} from "../services/profile.services";
import { Link, useNavigate } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";
import { ProgressBar } from "react-loader-spinner";

function Profile() {
  const { activeUser } = useContext(AuthContext);

  const [favouriteRecipes, setFavouriteRecipes] = useState([]);
  const [createdRecipes, setCreatedRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  //Mostrar una lista u otra

  const [showFavouriteRecipes, setShowFavouriteRecipes] = useState(false);

  const [showCreatedRecipes, setShowCreatedRecipes] = useState(false);
  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);
  //CONSEGUIR INFORMACIÓN DE USUARIO
  const getData = async () => {
    try {
      await loadProfileService();
      setIsLoading(false);
    } catch (error) {
      navigate("/error");
    }
  };
  // MOSTRAR RECETAS FAVORITAS DEL USUARIO ACTIVO
  const userFavouriteRecipes = async () => {
    try {
      const foundRecipes = await getFavouriteRecipesService();
      setFavouriteRecipes(foundRecipes.data);
      setShowFavouriteRecipes(true);
      setShowCreatedRecipes(false);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  // MOSTRAR RECETAS CREADAS POR USUARIO ACTIVO
  const userCreatedRecipes = async () => {
    try {
      const createdRecipes = await getCreatedRecipesService();
      setCreatedRecipes(createdRecipes.data);

      setShowFavouriteRecipes(false);
      setShowCreatedRecipes(true);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
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
    <div className="home">
      <section className="user-profile">
        <h1>{activeUser.username}'s profile</h1>
        {activeUser.role === "admin" && (
          <p>Testeando renderizaciones de admin/user</p>
        )}

        <button onClick={userFavouriteRecipes}>Favourite Recipes</button>
        <button onClick={userCreatedRecipes}>Created Recipes</button>
      </section>
      <hr />
      <div>
        {showFavouriteRecipes && (
          <section className="user-recipes">
            {favouriteRecipes.map((eachRecipe) => {
              return (
                <div key={eachRecipe._id}>
                  <Link to={`/recipes/${eachRecipe._id}`}>
                    <RecipeCard eachRecipe={eachRecipe} />
                  </Link>
                </div>
              );
            })}
          </section>
        )}
        {showCreatedRecipes && (
          <section className="user-recipes">
            {createdRecipes.map((eachRecipe) => {
              return (
                <div key={eachRecipe._id}>
                  <Link to={`/recipes/${eachRecipe._id}`}>
                    <RecipeCard eachRecipe={eachRecipe} />
                  </Link>
                </div>
              );
            })}
          </section>
        )}
      </div>
    </div>
  );
}

export default Profile;
