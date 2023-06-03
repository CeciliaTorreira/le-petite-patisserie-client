import service from "./config.services"

const loadProfileService = () => {
return service.get("/profile")  // Servicio para cargar el perfil de usuario que obtiene los datos del usuario activo
}



export { loadProfileService} 