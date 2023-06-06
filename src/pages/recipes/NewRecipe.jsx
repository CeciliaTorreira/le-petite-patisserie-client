import { useState } from "react";
import { createRecipeService } from "../../services/recipe.services";
import { useNavigate } from "react-router-dom";
import { uploadImageService } from "../../services/upload.services.js"

function NewRecipe(props) {


  //ERROR
  const [errorMessage, setErrorMessage] =useState("")

  // FORM
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [category, setCategory] = useState([]);
  const [instructions, setInstructions] = useState("");
  const [servings, setServings] = useState(0);

  //PICTURE
  const [picture, setPicture] = useState("");
  const [isUploading, setIsUploading] = useState(false); 

  const navigate = useNavigate();
 
  const handleFileUpload = async (e) => {
    // console.log("The file to be uploaded is: ", e.target.files[0]);

    if (!e.target.files[0]) {
      // to prevent accidentally clicking the choose file button and not selecting a file
      return;
    }
    setIsUploading(true);

    const uploadData = new FormData(); // images and other files need to be sent to the backend in a FormData
    uploadData.append("picture", e.target.files[0]);
    //                   |
    //     this name needs to match the name used in the middleware => uploader.single("image")

    try {
      const response = await uploadImageService(uploadData);
      // or below line if not using services
      // const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/upload`, uploadData)

      setPicture(response.data.picture);
      //                          |
      //     this is how the backend sends the image to the frontend => res.json({ imageUrl: req.file.path });

      setIsUploading(false); // to stop the loading animation
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

    try {
      const newRecipe = {
        name,
        ingredients,
        category,
        instructions,
        servings,
        picture,
      };

      await createRecipeService(newRecipe);

      
      navigate("/profile");
    } catch (error) {
      if (error.response.status === 400){
       setErrorMessage(error.response.data.errorMessage)
      }
      else{
      navigate("/error")
    }
    }
  };

  return (
    <div className="form">
      <h2>Add your own recipe</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label htmlFor="name">Recipe title:</label>
        <input
          type="text"
          name="name"
          onChange={handleNameChange}
          value={name}
        />
        <br />
        <label htmlFor="ingredients">List your ingredients:</label>
        <br />
        <textarea className="ingredients-input"
          type="text"
          name="ingredients"
          onChange={handleIngredientsChange}
          value={ingredients}
        />
        <br />
        
        <label htmlFor="instructions" >Instructions:</label>
        <br />
        <textarea className="instructions-input"
          type="text"
          name="instructions"
          onChange={handleInstructionsChange}
          value={instructions}
        />
        <br />
        <label htmlFor="category">Category:</label>
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
        <label htmlFor="servings">Servings:</label>
        <input
          type="number"
          name="servings"
          onChange={handleServingsChange}
          value={servings}
        />
        <br />
        <label htmlFor="picture">Picture</label>
        <input
          type="file"
          name="picture"
          onChange={handleFileUpload}
          disabled={isUploading}
        />
<br />
        <button className="buttons" type="submit">
          Add your recipe
        </button>
        {errorMessage && <p style={{fontWeight: "bold", color: "darkblue"}}>{errorMessage}</p>}
      </form>
    </div>
  );
}

export default NewRecipe;

//   enctype="multipart/form-data" para cloudinary quiza??? (Modulo 2)
