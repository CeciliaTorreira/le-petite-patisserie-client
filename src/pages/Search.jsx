import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllRecipesService } from "../services/recipe.services";
import RecipeCard from "../components/RecipeCard";

function Search() {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const [allRecipes, setAllRecipes] = useState([]);
  const [foundRecipes, setFoundRecipes] = useState([]); // Estado para almacenar los resultados de búsqueda y poder renderizarlos después
  useEffect(() => {
    getRecipeData();
    // eslint-disable-next-line
  }, []);

  const getRecipeData = async () => {
    try {
      const recipes = await getAllRecipesService(); // Quiero hacer búsqueda sobre todas las recetas que se encuentren en la DB
      console.log(recipes.data);
      setAllRecipes(recipes.data);
    } catch (error) {
      navigate("/error");
    }
  };

  const searchRecipe = (searchInput) => {
    const foundRecipes = allRecipes.filter((eachRecipe) => {
      return eachRecipe.name.toLowerCase().includes(searchInput.toLowerCase());
    });
    console.log(foundRecipes);
    setFoundRecipes(foundRecipes);
  };

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
    searchRecipe(e.target.value);
  };

  return (
    <div >
      <section className="search-bar">
        <h3>Find a recipe</h3>

        <input
          type="text"
          name="search"
          value={searchInput}
          onChange={handleSearchChange}
        />
        <br />
      </section>

      <hr />
      {/* Tenemos en la consola los elementos que obtenemos tras realizar una búsqueda  */}
      <section className="search-results">
        {foundRecipes.map((eachRecipe) => {
          return (
            <div key={eachRecipe._id}>
              <Link to={`/recipes/${eachRecipe._id}`}>
                <RecipeCard eachRecipe={eachRecipe} />
              </Link>
            </div>
          );
        })}
      </section>
    </div>
  );
}

export default Search;
