
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Registetr'; // Ruta corregida
import { AuthProvider } from '../features/auth/AuthContext';
import PrivateRoute from '../components/PrivateRoute';
import Dashboard from '../pages/Dashboard';
import Home from '../pages/Home';

const AppRouter: React.FC = () => {
  const { user } = useAuth();
  const isAuthenticated = !!user; // Chequea si se ha autenticado
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Home />} />
          {/*Aquí podriamos añadir mas rutas*//* por ejemplo una ruta de contacto o de ayuda*/}

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}; 

export default AppRouter;

function useAuth(): { user: any } {
  // Mock implementation of useAuth
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  return { user };
}
