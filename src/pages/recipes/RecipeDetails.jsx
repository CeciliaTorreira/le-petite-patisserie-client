import { useEffect, useState } from "react"
import { getRecipeByIdService } from "../../services/recipe.services"
import { useParams } from "react-router-dom"

function RecipeDetails() {
 const [recipe, setRecipe] = useState()
 const params = useParams()
 useEffect(()=>{
  getData()
  // eslint-disable-next-line
}, [])

 const getData = async ()=>{
  
  try {
    const oneRecipe = await getRecipeByIdService(params.recipeId)
    console.log(oneRecipe)
    setRecipe(oneRecipe.data)
  } catch (error) {
    console.log(error);
  }
}

  return (
    <div><h3>{recipe.name}</h3>
    <p></p></div>
  )
}

export default RecipeDetails


//AñADIR IS LOADING y algun spinner/similares