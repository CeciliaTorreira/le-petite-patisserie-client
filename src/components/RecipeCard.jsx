

function RecipeCard({eachRecipe}) {
  return (
    <div className="recipe-card">
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
  )
}

export default RecipeCard