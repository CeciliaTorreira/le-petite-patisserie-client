
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from "./pages/Home.jsx"
import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';
import NotFound from './pages/errors/NotFound';
import Error from './pages/errors/Error';
function App() {
  return (
    <div className="App">
     
     <Navbar />

     <Routes>
     <Route path="/" element={ <Home />} />
     <Route path='/auth/signup' element={ <Signup/> } />
     <Route path="/auth/login" element={ <Login /> } /> 
    
     

     {/* ERROS */}
     <Route path="*" element={ <NotFound/>  }/>
     <Route path="/error" element={<Error/> } />


     </Routes>



    </div>
  );
}

export default App;
