import service from "./config.services";

const getAllRecipesService = () => {
  return service.get("/recipes");
};

const createRecipeService = (newRecipe) => {
  return service.post("/recipes/create", newRecipe);
};

const getRecipeByIdService = (recipeId) => {
  return service.get(`/recipes/${recipeId}`);
};

const updateRecipeService = (recipeId, updatedRecipe) => {
  return service.put(`/recipes/${recipeId}`, updatedRecipe);
};

const deleteRecipeService = (recipeId) => {
  return service.delete(`/recipes/${recipeId}`);
};

// FAVORITOS
const addToFavoritesService = (recipeId) => {
  return service.post(`/recipes/${recipeId}/favourite`);
};

const removeFromFavouriteService = (recipeId) => {
  return service.post(`/recipes/${recipeId}/favourite/remove`);
};

// COMENTARIOS

const getRecipeCommentsService = (recipeId) => {
  return service.get(`/recipes/${recipeId}/comments`);
};

const createCommentService = (recipeId, newComment) => {
  return service.post(`/recipes/${recipeId}/comments`, newComment);
};

const getCommentByIdService = (recipeId, commentId) =>{
return service.get(`/recipes/${recipeId}/comments/${commentId}`)
}

const deleteCommentService = (recipeId, commentId) => {
  return service.delete(`/recipes/${recipeId}/comments/${commentId}`);
};
export {
  getAllRecipesService,
  createRecipeService,
  getRecipeByIdService,
  updateRecipeService,
  deleteRecipeService,
  addToFavoritesService,
  removeFromFavouriteService,
  getRecipeCommentsService,
  createCommentService,
  deleteCommentService,
  getCommentByIdService,
};
