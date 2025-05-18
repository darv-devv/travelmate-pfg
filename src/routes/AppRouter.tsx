import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Registetr';
import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import Destinos from '../pages/Destinations';

const AppRouter: React.FC = () => {
  return (
    
      <Routes>
        {/* Rutas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Home />} />


        {/* Rutas privadas directamente accesibles mientras se desrrolla el frontend, por problemas con validacion y token */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/destinations" element={<Destinos />} />
      </Routes>
    
  );
};


//Se reusleve problema de error "Uncaught error: you cannot render a react-router-dom inside another <Router"
export default AppRouter;



