import { useEffect, useState } from "react";
import { getRecipeCommentsService } from "../../services/recipe.services";
import { useParams } from "react-router-dom";
// import { ProgressBar } from  'react-loader-spi

function CommentList() {
  const [comments, setComments] = useState([]);
  const params = useParams();
  //  const [isLoading, setIsLoading] =useState(true)

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  const getData = async () => {
    try {
      const allComments = await getRecipeCommentsService(params.recipeId);
      console.log(allComments.data);
      setComments(allComments.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h3>Comments and ratings</h3>
      <section className="comments-list">
        {comments.map((eachComment) => {
          return (
            <div key={eachComment.id}>
            <p>Written by: {eachComment.creator.username}</p>
              <li>Rating: {eachComment.rating}</li>
              <p>{eachComment.description}</p>
               
            </div>
          );
        })}
      </section>
    </div>
  );
}

export default CommentList;
