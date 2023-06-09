function RecipeCard({ eachRecipe }) {
  return (
    <div className="recipe-card">
      <img
        className="img-card"
        width={170}
        height={180}
        src={eachRecipe.picture}
        alt={eachRecipe.name}
      />
      <p style={{ fontWeight: "bold" }}>{eachRecipe.name}</p>
    </div>
  );
}

export default RecipeCard;
