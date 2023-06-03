import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import {
  loadProfileService,
  getFavouriteRecipesService,
} from "../services/profile.services";

function Profile() {
  const { activeUser, authenticateUser } = useContext(AuthContext);

  const [favouriteRecipes, setFavouriteRecipes] = useState([]);

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  const getData = async () => {
    try {
      const userData = await loadProfileService();
      authenticateUser(userData);
      console.log(userData);
    } catch (error) {
      console.log(error);
    }
  };

  const userFavouriteRecipes = async () => {
    try {
      const foundRecipes = await getFavouriteRecipesService();
      setFavouriteRecipes(foundRecipes.data);
      console.log(foundRecipes.data.name); // Muestra array vacío
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1>{activeUser.username}'s profile</h1>
      {activeUser.role === "user" && (
        <p>Testeando renderizaciones de admin/user</p>
      )}
      <hr />
      <div className="profile-recipes">
        <button onClick={userFavouriteRecipes}>Favourite Recipes</button>
        <section>
          <h4>Favourite recipes</h4>

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
              </div>
            );
          })}
        </section>
      </div>
    </div>
  );
}

export default Profile;
