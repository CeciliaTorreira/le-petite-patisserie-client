import { useContext, useEffect, useState } from "react";
import { getRecipeCommentsService } from "../../services/recipe.services";
import { Link, useParams } from "react-router-dom";
import { ProgressBar } from "react-loader-spinner";
import { AuthContext } from "../../context/auth.context.js";
import CommentCard from "../../components/CommentCard";

function CommentList() {
  const [comments, setComments] = useState([]);
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const { activeUser } = useContext(AuthContext);

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  const getData = async () => {
    try {
      const allComments = await getRecipeCommentsService(params.recipeId);
      
      setComments(allComments.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="spinner">
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
    <div className="comments">
     <section className="comments-header"> 
      <h3>Comments and ratings</h3>
      {activeUser && (
        <Link to={`/recipes/${params.recipeId}/comments/add`}>
          <button className="buttons">Rate and comment this recipe</button>
        </Link>
      )}
      </section> 
      <hr />
      <section className="comments-list">
        {comments.map((eachComment) => {
          return (
            <div key={eachComment._id}>
              <CommentCard 
                eachComment={eachComment}
                recipeId={params.recipeId}
              />
            </div>
          );
        })}
      </section>
    </div>
  );
}

export default CommentList;
