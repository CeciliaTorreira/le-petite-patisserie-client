import { useState } from "react";
import { createCommentService } from "../../services/recipe.services";
import { useNavigate, useParams } from "react-router-dom";
import { ProgressBar } from "react-loader-spinner";
function NewComment() {
  const params = useParams();
  //ERROR
  const [errorMessage, setErrorMessage] = useState("");

  //FORM
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleRatingChange = (e) => setRating(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newComment = {
        description,
        rating,
      };
      await createCommentService(params.recipeId, newComment);
      setIsLoading(false);
      navigate("/profile");
    } catch (error) {
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };
  if (isLoading) {
    return (
      <div>
        <ProgressBar
          height="80"
          width="80"
          ariaLabel="progress-bar-loading"
          wrapperStyle={{}}
          wrapperClass="progress-bar-wrapper"
          borderColor="#51E5FF"
          barColor="lightBlue"
          className="loading-bar"
        />
      </div>
    );
  }
  return (
    <div>
      <h3>Share your opinion</h3>
      <form onSubmit={handleSubmit}>
        <br />
        <label htmlFor="description"></label>
        <br />
        <textarea
          className="comment-input"
          type="text"
          name="ingredients"
          onChange={handleDescriptionChange}
          value={description}
        />
        <br />
        <label htmlFor="rating">Rating:</label>
        <input
          type="number"
          name="rating"
          max={5}
          onChange={handleRatingChange}
          value={rating}
        />
        <br />
        <button className="buttons" type="submit">
          Post
        </button>
        {errorMessage && (
          <p style={{ fontWeight: "bold", color: "darkblue" }}>
            {errorMessage}
          </p>
        )}
      </form>
    </div>
  );
}

export default NewComment;
