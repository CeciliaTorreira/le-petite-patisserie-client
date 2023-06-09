import { Link } from "react-router-dom"


function NotFound() {
  return (
    <div className="error"><h1>We couldn't find what you're looking for</h1>
     <p>We're truly sorry, out team is working hard to sort this out!</p>
     <Link to={"/home"}>Go back to Home</Link>
    
    </div>
  )
}

export default NotFound