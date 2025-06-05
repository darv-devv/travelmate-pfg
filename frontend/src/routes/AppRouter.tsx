import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../features/auth/AuthContext';

import Login from '../pages/Login';
import Register from '../pages/Registetr';
import Home from '../pages/Home';
// PROBANDO DASHBOARD 
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import Destinations from '../pages/Destinations';
import Messages from '../pages/messages';

const AppRouter: React.FC = () => {
  const { isAuthenticated } = useAuth();
  return (
    <Routes>
      {/* Rutas que funcionan */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      

      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/perfil" element={<Profile />} />
      <Route path="/explorar" element={<Destinations />} />
      <Route path="/messages" element={<Messages />} />
      
      {/* Redirecciones */}
      <Route path="/profile" element={<Navigate to="/perfil" replace />} />
      <Route path="/destinations" element={<Navigate to="/explorar" replace />} />
      
      {/* Ruta 404 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
export default AppRouter;
