import service from "./config.services"

const loadProfileService = () => {
return service.get("/profile")  // Servicio para cargar el perfil de usuario que obtiene los datos del usuario activo
}

const getFavouriteRecipesService = () => {
return service.get("/profile/favourite");  //Servicio para que se reciba la información de las rutas favoritas del usuario activo
}
export { loadProfileService, getFavouriteRecipesService}





