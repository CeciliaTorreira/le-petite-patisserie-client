import { useContext } from "react";
import { AuthContext } from "../context/auth.context.js";
import { useNavigate } from "react-router-dom";
import { deleteCommentService } from "../services/recipe.services.js";

function CommentCard({ eachComment, recipeId }) {
  const navigate = useNavigate();
  const { activeUser } = useContext(AuthContext);

  const handleDelete = async () => {
    try {
      await deleteCommentService(recipeId, eachComment._id);
      navigate(`/recipes/${recipeId}/`);
    } catch (error) {
      navigate("/error");
    }
  };
  return (
    <div className="comment-card">
      <p>
        Written by:{" "}
        <span style={{ fontWeight: "bold" }}>
          {eachComment.creator.username}{" "}
        </span>
        || Rating: {eachComment.rating}
        <br />
        <br />
        <span className="comment-text">{eachComment.description}</span>
      </p>
      {activeUser && activeUser.role === "admin" && (
        <button onClick={handleDelete}>Delete comment</button>
      )}
    </div>
  );
}

export default CommentCard;
