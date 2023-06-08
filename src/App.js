import { Route, Routes } from "react-router-dom";
import "./App.css";

//PÁGINAS IMPORTADAS
import Home from "./pages/Home.jsx";
import Signup from "./pages/auth/Signup.jsx";
import Login from "./pages/auth/Login";
import NotFound from "./pages/errors/NotFound";
import Error from "./pages/errors/Error";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import RecipesList from "./pages/recipes/RecipesList";
import NewRecipe from "./pages/recipes/NewRecipe";
import RecipeDetails from "./pages/recipes/RecipeDetails";
import EditRecipe from "./pages/recipes/EditRecipe";
import CommentList from "./pages/comments/CommentList";

// COMPONENTES
import Navbar from "./components/Navbar";
import IsPrivate from "./components/auth/IsPrivate";
import NewComment from "./pages/comments/NewComment";


function App() {
  return (
    <div className="App">
    
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        {/* AUTH */}
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/auth/login" element={<Login />} />
        <Route
          path="/profile"
          element={
            <IsPrivate>
              <Profile />
            </IsPrivate>
          }
        />
        {/* RECETAS */}
        <Route path="/recipes" element={<RecipesList />} />
        <Route path="/recipes/add" element={<NewRecipe />} />
        <Route path="/recipes/:recipeId" element={<RecipeDetails />} />
        <Route path="/recipes/:recipeId/edit" element={<EditRecipe />} />
        {/* COMENTARIOS */}
        <Route path="/recipes/:recipeId/comments" element={<CommentList />} />

        <Route
          path="/recipes/:recipeId/comments/add"
          element={<NewComment />}
        />
        {/* ERRORS */}
        <Route path="*" element={<NotFound />} />
        <Route path="/error" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
