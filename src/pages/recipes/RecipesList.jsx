import { useContext, useEffect, useState } from "react";
import { getAllRecipesService } from "../../services/recipe.services.js"
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth.context.js";
import RecipeCard from "../../components/RecipeCard.jsx";


function RecipesList() {


   const {isLoggedIn} =useContext(AuthContext)

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
        
       {isLoggedIn && <Link to={'/recipes/add'}><button>Fancy uploading your own recipes?</button></Link>}
       {!isLoggedIn && <p>If you want to upload your own recipes please click<Link to={"/auth/login"}>here</Link>to login</p>}
       {!isLoggedIn && <p>If you don't have an account click<Link to={"/auth/signup"}>here</Link>to create an account.</p>}
      <hr />
      <section className="user-recipes">
        {allRecipes.map((eachRecipe) => {
          return (
            <Link to={`/recipes/${eachRecipe._id}`}>
            <RecipeCard key={eachRecipe._id} eachRecipe={eachRecipe}/>
            </Link>
          );
        })}
      </section>
    </div>
  );
}

export default RecipesList;
