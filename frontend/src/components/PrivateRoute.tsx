import React from 'react';
import { Navigate } from 'react-router-dom';
//RouteProps eliminado

// Componente de ruta privada
interface PrivateRouteProps {
  isAuthenticated: boolean; // Prop para verificar autenticación
  children: React.ReactNode; // Componente protegido
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ isAuthenticated, children }) => {
  // Si el usuario no está autenticado, redirigimos al login
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Si el usuario está autenticado, mostrar el componente protegido
  return <>{children}</>;
};

export default PrivateRoute;
