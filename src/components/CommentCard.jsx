import { useContext } from "react";
import { AuthContext } from "../context/auth.context.js"
import { useNavigate } from "react-router-dom";
import {deleteCommentService} from "../services/recipe.services.js"

function CommentCard({eachComment, recipeId}) {
const navigate = useNavigate()
const {activeUser}= useContext(AuthContext)

 const handleDelete = async () =>{

try {
  await deleteCommentService(recipeId, eachComment._id)
  navigate(`/recipes/${recipeId}/`)
} catch (error) {
  navigate("/error")
}

}
  return (
    <div className="comment-card">
    <p>Rating: {eachComment.rating}</p>
    <p>{eachComment.description}</p>
     <p style={{fontWeight: "bold"}}>Written by: {eachComment.creator.username}</p>
     {activeUser.role === "admin" && (<button onClick={handleDelete}>Delete comment</button>)} 
    </div>
  )
}

export default CommentCard