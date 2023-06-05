import { useEffect, useState } from "react";
import { getAllRecipesService } from "../../services/recipe.services.js"
import { Link } from "react-router-dom";

function RecipesList() {
  const [allRecipes, setAllRecipes] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const recipes = await getAllRecipesService();
      setAllRecipes(recipes.data);
      console.log(recipes.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Check out our recipes!</h2>
       
       <Link to={'/recipes/add'}><button>Fancy uploading your own recipes?</button></Link>
      <hr />
      <section className="user-recipes">
        {allRecipes.map((eachRecipe) => {
          return (
            <div key={eachRecipe._id}>
              <h3>{eachRecipe.name}</h3>
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
  );
}

export default RecipesList;
