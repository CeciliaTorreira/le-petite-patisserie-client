import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import {
  loadProfileService,
  getFavouriteRecipesService,
  getCreatedRecipesService,
} from "../services/profile.services";
import { Link } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";

function Profile() {
  const { activeUser } = useContext(AuthContext);

  const [favouriteRecipes, setFavouriteRecipes] = useState([]);
  const [createdRecipes, setCreatedRecipes] = useState([]);

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
      const userData = await loadProfileService();
      console.log(userData);
    } catch (error) {
      console.log(error);
    }
  };
  // MOSTRAR RECETAS FAVORITAS DEL USUARIO ACTIVO
  const userFavouriteRecipes = async () => {
    try {
      const foundRecipes = await getFavouriteRecipesService();
      setFavouriteRecipes(foundRecipes.data);
      // console.log(foundRecipes.data.name); // Muestra array vacío
      setShowFavouriteRecipes(true);
      setShowCreatedRecipes(false);
    } catch (error) {
      console.log(error);
    }
  };

  // MOSTRAR RECETAS CREADAS POR USUARIO ACTIVO
  const userCreatedRecipes = async () => {
    try {
      const createdRecipes = await getCreatedRecipesService();
      setCreatedRecipes(createdRecipes.data);
      // console.log(createdRecipes.data.name);
      setShowFavouriteRecipes(false);
      setShowCreatedRecipes(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
    <section className="user-profile">
      <h1>{activeUser.username}'s profile</h1>
      {activeUser.role === "admin" && (
        <p>Testeando renderizaciones de admin/user</p>
      )}

      <button onClick={userFavouriteRecipes}>
        Favourite Recipes
      </button>
      <button onClick={userCreatedRecipes}>
        Created Recipes
      </button>
      </section>
      <hr />
      <div className="profile-recipes">
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
