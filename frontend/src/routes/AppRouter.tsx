import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../features/auth/AuthContext';
import PrivateRoute from '../components/PrivateRoute';

// Páginas existentes
import Login from '../pages/Login';
import Register from '../pages/Registetr'; // ✅ AQUÍ está el cambio
import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import Destinations from '../pages/Destinations';

// Páginas nuevas - crear solo si las necesitas
// import Trips from '../pages/Trips';
// import Settings from '../pages/Settings';

const AppRouter: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Navigate to="/" replace />} />
      
      {/* Rutas de autenticación */}
      <Route 
        path="/login" 
        element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />
        } 
      />
      <Route 
        path="/register" 
        element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <Register />
        } 
      />

      {/* Rutas privadas */}
      <Route 
        path="/dashboard" 
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } 
      />
      
      <Route 
        path="/perfil" 
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/explorar" 
        element={
          <PrivateRoute>
            <Destinations />
          </PrivateRoute>
        } 
      />

      {/* Redirecciones de compatibilidad */}
      <Route path="/profile" element={<Navigate to="/perfil" replace />} />
      <Route path="/destinations" element={<Navigate to="/explorar" replace />} />

      {/* Ruta 404 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRouter;