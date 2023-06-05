import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import {
  loadProfileService,
  getFavouriteRecipesService,
  getCreatedRecipesService,
} from "../services/profile.services";

function Profile() {
  const { activeUser, authenticateUser } = useContext(AuthContext);

  const [favouriteRecipes, setFavouriteRecipes] = useState([]);
  const [createdRecipes, setCreatedRecipes] = useState([]);

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);
  //CONSEGUIR INFORMACIÓN DE USUARIO
  const getData = async () => {
    try {
      const userData = await loadProfileService();
      authenticateUser();
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
      console.log(foundRecipes.data.name); // Muestra array vacío
    } catch (error) {
      console.log(error);
    }
  };
   
  // MOSTRAR RECETAS CREADAS POR USUARIO ACTIVO
  const userCreatedRecipes = async () => {
    try {
      const createdRecipes = await getCreatedRecipesService();
      setCreatedRecipes(createdRecipes.data)
      console.log(createdRecipes.data.name)
    } catch (error) {
      console.log(error);
    }
  };

  // BORRAR RECETAS
  // const handleRemoveFavourite = async (recipeId) =>{
  //  try {
  //   await removeFromFavourites(recipeId)
  //  } catch (error) {
  //   console.log(error);
  //  }
  
  // }

  return (
    <div>
      <h1>{activeUser.username}'s profile</h1>
      {activeUser.role === "user" && (
        <p>Testeando renderizaciones de admin/user</p>
      )}

      <button className="buttons" onClick={userFavouriteRecipes}>Favourite Recipes</button>
        <button className="buttons" onClick={userCreatedRecipes}>Created Recipes</button>
      <hr />
      <div className="profile-recipes">
        


        <section className="user-recipes">
        
          {/* <h4>Favourite recipes</h4> */}

          {favouriteRecipes.map((eachRecipe) => {
            return (
              <div key={eachRecipe._id}>
                <h4>{eachRecipe.name}</h4>
                <p>
                  <img
                    width={170}
                    height={180}
                    src={eachRecipe.picture}
                    alt={eachRecipe.name}
                  />
                </p>
                {/* <button className="buttons" onClick={() => handleRemoveFavourite(eachRecipe._id)}>Remove</button> */}
              </div>
            );
          })}
        </section>

        <section className="user-recipes">
          {/* <h4>Created Recipes</h4> */}
          {createdRecipes.map((eachRecipe) => {
            return (
              <div key={eachRecipe._id}>
                <h4>{eachRecipe.name}</h4>
                <p>
                  <img
                    width={170}
                    height={180}
                    src={eachRecipe.picture}
                    alt={eachRecipe.name}
                  />
                </p>
              </div>
            );
          })}
        </section>
      </div>
    </div>
  );
}

export default Profile;
