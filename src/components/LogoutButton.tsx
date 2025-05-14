import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../features/auth/AuthContext';

const LogoutButton: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-4 py-1.5 rounded hover:bg-red-600 transition"
    >
      Cerrar sesión
    </button>
  );
};

export default LogoutButton;