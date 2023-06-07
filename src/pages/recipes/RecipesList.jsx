import { useContext, useEffect, useState } from "react";
import { getAllRecipesService } from "../../services/recipe.services.js"
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context.js";
import RecipeCard from "../../components/RecipeCard.jsx";
import { ProgressBar } from "react-loader-spinner";


function RecipesList() {

 const navigate = useNavigate()
   const {isLoggedIn} =useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(true);
  const [allRecipes, setAllRecipes] = useState([]);

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  const getData = async () => {
    try {
      const recipes = await getAllRecipesService();
      setAllRecipes(recipes.data);
      setIsLoading(false);
    } catch (error) {
      navigate("/error")
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
    <div className="recipe-list">
      <h2>Check out our recipes!</h2>

       {isLoggedIn && <Link to={'/recipes/add'}><button>Fancy uploading your own recipes?</button></Link>}
       {!isLoggedIn &&(<section className="logged-out-recipes">
      <p>If you want to upload your own recipes please click<Link to={"/auth/login"}>here</Link>to login</p>
      <p>If you don't have an account click<Link to={"/auth/signup"}>here</Link>to create one.</p>
      </section>)}
       
      <hr />
      
      <section className="user-recipes">
        {allRecipes.map((eachRecipe) => {
          return (
          <div key={eachRecipe._id}>
            <Link to={`/recipes/${eachRecipe._id}`}>
            <RecipeCard eachRecipe={eachRecipe}/>
            </Link>
            </div>
          );
        })}
      </section>
    </div>
  );
}

export default RecipesList;
