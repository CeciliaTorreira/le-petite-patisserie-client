
import { Route, Routes } from 'react-router-dom';
import './App.css';

//PÁGINAS IMPORTADAS 
import Home from "./pages/Home.jsx"
import Signup from './pages/auth/Signup.jsx';
import Login from './pages/auth/Login';
import NotFound from './pages/errors/NotFound';
import Error from './pages/errors/Error';

// COMPONENTES
import Navbar from './components/Navbar';
import Profile from './pages/Profile';





function App() {
  return (
    <div className="App">
     
     <IsPrivate></IsPrivate>

     <Routes>
     <Route path="/" element={ <Home />} />
     <Route path='/auth/signup' element={ <Signup/> } />
     <Route path="/auth/login" element={ <Login /> } /> 
     <Route path='/profile' element={<Profile/>}/>
   
   
     {/* ERRORS */}
     <Route path="*" element={ <NotFound/>  }/>
     <Route path="/error" element={<Error/> } />


     </Routes>

     <Navbar />

    </div>
  );
}

export default App;
