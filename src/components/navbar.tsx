import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../features/auth/AuthContext';
import LogoutButton from './LogoutButton';

const Navbar: React.FC = () => {
  const { user } = useAuth();

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-700">
          TravelMate
        </Link>

        <div className="space-x-4">
          {!user ? (
            <>
              <Link
                to="/login"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Iniciar sesión
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700 transition"
              >
                Registrarse
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/dashboard"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Dashboard
              </Link>
              <LogoutButton />
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;