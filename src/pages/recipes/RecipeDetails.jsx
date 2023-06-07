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
import { loadProfileService } from "../../services/profile.services";

function RecipeDetails() {
  const navigate = useNavigate();
  const params = useParams();

  const [errorMessage, setErrorMessage] = useState("");

  const { isLoggedIn, activeUser } = useContext(AuthContext);

  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavourite, setIsFavourite] = useState(false);
  const [isCreator, setIsCreator] = useState(false);
  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  const getData = async () => {
    try {
      const oneRecipe = await getRecipeByIdService(params.recipeId);
      // console.log(oneRecipe.data);
      setRecipe(oneRecipe.data);
      const userData = await loadProfileService();
      console.log(oneRecipe.data.creator);
      console.log(params.recipeId);
      // Comprobamos si el usuario tiene ya la receta agregada a favoritos
      if (
        activeUser &&
        userData.data.favouriteRecipes.includes(oneRecipe.data._id)
      ) {
        setIsFavourite(true);
      } else {
        setIsFavourite(false);
      }
      //Comprobamos si es el creador de la receta
      if (activeUser._id === oneRecipe.data.creator) {
        setIsCreator(true);
      } else {
        setIsCreator(false);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  //BORRAR RECETA  (admin)
  const handleDelete = async () => {
    try {
      await deleteRecipeService(params.recipeId);
      navigate("/recipes");
    } catch (error) {
      navigate("/error");
    }
  };

  //AÑADIR RECETA A FAVORITOS
  const handleAddFavourite = async () => {
    try {
      await addToFavoritesService(params.recipeId);
      await getData();
      setIsFavourite(true);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

  // QUITAR RECETA DE FAVORITOS
  const handleRemoveFavourite = async () => {
    try {
      await removeFromFavouriteService(params.recipeId);
      await getData();
      setIsFavourite(false);
    } catch (error) {
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
        {isCreator && (
          <Link to={`/recipes/${recipe._id}/edit`}>
            <button>Edit recipe</button>
          </Link>
        )}
        {activeUser && activeUser.role === "admin" && (
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
