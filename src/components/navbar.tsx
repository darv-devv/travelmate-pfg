import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../features/auth/AuthContext';
import LogoutButton from './LogoutButton';

const Navbar: React.FC = () => {
  const { user } = useAuth();

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <img src="/favicon-32x32.png" alt="Logo" className="w-10" />

        <div className="space-x-4 flex items-center">
          <Link
            to="/"
            className="text-orange-300 hover:text-orange-800 font-medium"
          >
            Inicio
          </Link>
          <Link
            to="/explorar"
            className="text-orange-300 hover:text-orange-800 font-medium"
          >
            Explorar
          </Link>
          {user ? (
            <>
              <Link
                to="/perfil"
                className="text-orange-300 hover:text-orange-800 font-medium"
              >
                Perfil
              </Link>
              <LogoutButton />
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-orange-300 hover:text-orange-800 font-medium"
              >
                Perfil
              </Link>
              <Link
                to="/register"
                className="bg-red-600 text-white px-4 py-1.5 rounded hover:bg-red-700 transition"
              >
                Cerrar sesión 
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;