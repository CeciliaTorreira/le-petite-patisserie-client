
import { Route, Routes } from 'react-router-dom';
import './App.css';

//PÁGINAS IMPORTADAS 
import Home from "./pages/Home.jsx"
import Signup from './pages/auth/Signup.jsx';
import Login from './pages/auth/Login';
import NotFound from './pages/errors/NotFound';
import Error from './pages/errors/Error';
import Profile from './pages/Profile';
import Search from './pages/Search'

// COMPONENTES
import Navbar from './components/Navbar';
import IsPrivate from './components/auth/IsPrivate';
import RecipesList from './pages/recipes/RecipesList';
import NewRecipe from './pages/recipes/NewRecipe';
import RecipeDetails from './pages/recipes/RecipeDetails';





function App() {
  return (
    <div className="App">
     
     <Navbar />

     <Routes>
     <Route path="/" element={ <Home />} />
     <Route path='/auth/signup' element={ <Signup/> } />
     <Route path="/auth/login" element={ <Login /> } /> 
     <Route path='/profile' element={<IsPrivate><Profile/></IsPrivate>}/>
     <Route path='/search' element={<Search />} />
     <Route path='/recipes' element={<RecipesList/>}/> 
     <Route path='/recipes/add' element={<NewRecipe/>}/>
     <Route path='/recipes/:recipeId' element={<RecipeDetails/>}/>
     {/* ERRORS */}
     <Route path="*" element={ <NotFound/>  }/>
     <Route path="/error" element={<Error/> } />


     </Routes>

    

    </div>
  );
}

export default App;
