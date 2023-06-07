import { useContext, useEffect, useState } from "react";
import {
  addToFavoritesService,
  deleteRecipeService,
  getRecipeByIdService,
  removeFromFavouriteService,
} from "../../services/recipe.services";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ProgressBar } from "react-loader-spinner";
import { AuthContext } from "../../context/auth.context.js";
// import { loadProfileService } from "../../services/profile.services";

function RecipeDetails() {
  const navigate = useNavigate();
  const params = useParams();

  const [errorMessage, setErrorMessage] = useState("");

  const { isLoggedIn, activeUser, authenticateUser } = useContext(AuthContext);

  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavourite, setIsFavourite] = useState(); // Estados para mostrar un botón u otro dependiendo de si la receta está ya en favoritos o no

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  const getData = async () => {
    try {
      const oneRecipe = await getRecipeByIdService(params.recipeId);
      // console.log(oneRecipe.data._id);
      setRecipe(oneRecipe.data);
      console.log(activeUser);
      authenticateUser();
      // Comprobamos si el usuario tiene ya la receta agregada a favoritos
      if (
        activeUser &&
        activeUser.favouriteRecipes.includes(oneRecipe.data._id)
      ) {
        setIsFavourite(true);
      } else {
        setIsFavourite(false);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteRecipeService(params.recipeId);
      navigate("/recipes");
    } catch (error) {
      navigate("/error");
    }
  };

  // AÑADIR RECETAS A LA LISTA DE FAVOURITOS
  const handleAddFavourite = async () => {
    try {
      await addToFavoritesService(params.recipeId);
      await getData()
      setIsFavourite(true);
      
          } catch (error) {
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

  // BORRAR RECETAS DE LA LISTA DE FAVORITOS
  const handleRemoveFavourite = async () => {
    try {
      await removeFromFavouriteService(params.recipeId);
      await getData()
      setIsFavourite(false);
      
      
    } catch (error) {
      console.log(error);

      navigate("/error");
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
    <div className="recipe-details">
      <img width={190} height={190} src={recipe.picture} alt={recipe.name} />
      <br />
      <h3>{recipe.name}</h3>
      <section className="details">
        <p>Category: {recipe.category}</p>
        <p>Servings: {recipe.servings}</p>
        <p>Ingredients: {recipe.ingredients}</p>
        <p>Instructions: {recipe.instructions}</p>
      </section>
      <br />
      <section className="details-buttons">
        {activeUser.id === recipe.creator.id && (
          <Link to={`/recipes/${recipe._id}/edit`}>
            <button>Edit recipe</button>
          </Link>
        )}
        {activeUser.role === "admin" && (
          <button onClick={handleDelete}>Delete recipe</button>
        )}
      </section>
      <br />
      <section className="favourite-buttons">
        {isLoggedIn && !isFavourite && (
          <button onClick={handleAddFavourite}>Add to favourites</button>
        )}
        {isLoggedIn && isFavourite && (
          <button onClick={handleRemoveFavourite}>
            Remove from favourites
          </button>
        )}
        {errorMessage && <p style={{ fontWeight: "bold" }}>{errorMessage}</p>}
      </section>
      <hr style={{ width: 250 }} />

      <Link to={`/recipes/${recipe._id}/comments`}>
        <button>
          <h5>Comments and reviews</h5>
        </button>
      </Link>
    </div>
  );
}
export default RecipeDetails;
