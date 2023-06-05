import { useContext, useEffect, useState } from "react"
import { getRecipeByIdService } from "../../services/recipe.services"
import { Link, useParams } from "react-router-dom"
import { ProgressBar } from  'react-loader-spinner'
import { AuthContext } from "../../context/auth.context.js";

function RecipeDetails() {
  const {activeUser} = useContext(AuthContext)
 const [recipe, setRecipe] = useState(null)
 const params = useParams()
 const [isLoading, setIsLoading] = useState(true)
 useEffect(()=>{
  getData()
  // eslint-disable-next-line
}, [])

 const getData = async ()=>{
  
  try {
    const oneRecipe = await getRecipeByIdService(params.recipeId)
    console.log(oneRecipe.data)
    setRecipe(oneRecipe.data)
   setIsLoading(false)
  } catch (error) {
    console.log(error)
    setIsLoading(false)
  }
}
  if (isLoading){
    return <div>
         <ProgressBar
      height="80"
      width="80"
      ariaLabel="progress-bar-loading"
      wrapperStyle={{}}
      wrapperClass="progress-bar-wrapper"
      borderColor = '#51E5FF'
      barColor = 'lightBlue'
      className = "loading-bar"
      />
       
    </div>
}

  return (
    <div className="recipe-details">
    <img
        width={190}
        height={190}
        src={recipe.picture}
        alt={recipe.name}
      />
      <br />
      <h3>{recipe.name}</h3>
      <p>Category: {recipe.category}</p>
      <p>Servings: {recipe.servings}</p>
      <p>Ingredients: {recipe.ingredients}</p>
      <p>Instructions: {recipe.instructions}</p>
    
    
    <br />
    <section className="details-buttons">
    {activeUser.id === recipe.creator.id && (<Link to={`/recipes/${recipe._id}/edit` }><button>Edit recipe</button></Link>)}
    {activeUser.role === "admin" && (<button>Delete recipe</button>)} 
    </section>
     {/* IMPLEMENTAR ESTAS FUNCIONES DESPUÉS  */}
    </div>


  )

}
export default RecipeDetails


