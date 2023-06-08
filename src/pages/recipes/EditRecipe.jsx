import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getRecipeByIdService } from "../../services/recipe.services";
import { updateRecipeService } from "../../services/recipe.services";
import { uploadImageService } from "../../services/upload.services.js";

function EditRecipe() {
  const params = useParams();
  const navigate = useNavigate();

  //ERROR
  const [errorMessage, setErrorMessage] = useState("");

  // FORM
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [category, setCategory] = useState([]);
  const [instructions, setInstructions] = useState("");
  const [servings, setServings] = useState(0);

  //PICTURE
  const [picture, setPicture] = useState(null);

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  const getData = async () => {
    try {
      const oneRecipe = await getRecipeByIdService(params.recipeId);
      
      setName(oneRecipe.data.name);
      setIngredients(oneRecipe.data.ingredients);
      setCategory(oneRecipe.data.category);
      setInstructions(oneRecipe.data.instructions);
      setServings(oneRecipe.data.servings);
      setPicture(oneRecipe.data.picture);
    } catch (error) {
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

  const handleFileUpload = async (e) => {
    if (!e.target.files[0]) {
      return;
    }

    const uploadData = new FormData();
    uploadData.append("picture", e.target.files[0]);

    try {
      const response = await uploadImageService(uploadData);

      setPicture(response.data.picture);
    } catch (error) {
      navigate("/error");
    }
  };

  const handleNameChange = (e) => setName(e.target.value);
  const handleIngredientsChange = (e) => setIngredients(e.target.value);
  const handleCategoryChange = (e) => setCategory(e.target.value);
  const handleInstructionsChange = (e) => setInstructions(e.target.value);
  const handleServingsChange = (e) => setServings(e.target.value);
  // const handlePictureChange = (e) => setPicture(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedRecipe = {
      name,
      ingredients,
      category,
      instructions,
      servings,
      picture,
    };

    await updateRecipeService(params.recipeId, updatedRecipe);
    navigate(`/recipes/${params.recipeId}`);
  };

  return (
    <div className="form">
      <h2>Add your own recipe</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label htmlFor="name">Recipe title: </label>
        <input
          type="text"
          name="name"
          onChange={handleNameChange}
          value={name}
        />
        <br />
        <br />
        <label htmlFor="ingredients">List your ingredients:</label>
        <br />
        <textarea
          className="ingredients-input"
          type="text"
          name="ingredients"
          onChange={handleIngredientsChange}
          value={ingredients}
        />
        <br />
        <br />
        <label htmlFor="instructions">Instructions:</label>
        <br />
        <textarea
          className="instructions-input"
          type="text"
          name="instructions"
          onChange={handleInstructionsChange}
          value={instructions}
        />
        <br />
        <label htmlFor="category">Category: </label>
        <select
          name="category"
          onChange={handleCategoryChange}
          value={category}
        >
          <option value="general">Regular</option>
          <option value="vegan">Vegan</option>
          <option value="vegetarian">Vegetarian</option>
          <option value="gluten free">Gluten free</option>
          <option value="dairy free">Dairy free</option>
        </select>
        <br />
        <br />
        <label htmlFor="servings">Servings: </label>
        <input
          type="number"
          name="servings"
          onChange={handleServingsChange}
          value={servings}
        />
        <br />
        <br />
        <label htmlFor="picture">Picture: </label>
        <input type="file" name="picture" onChange={handleFileUpload} />
        <br />
        <br />
        <button className="buttons" type="submit">
          Update your recipe
        </button>
        {errorMessage && (
          <p style={{ fontWeight: "bold", color: "darkblue" }}>
            {errorMessage}
          </p>
        )}
      </form>
    </div>
  );
}

export default EditRecipe;
