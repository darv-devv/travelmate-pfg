import React from 'react';
import { useAuth } from '../features/auth/AuthContext';
import LogoutButton from '../components/LogoutButton';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const storedName = localStorage.getItem('name');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center justify-center px-4 animate-fadeIn">
      <div className="bg-white shadow-xl rounded-lg p-10 w-full max-w-xl text-center">
        <h1 className="text-4xl font-bold text-blue-700 mb-4">¡Bienvenido, {storedName || user}!</h1>
        <p className="text-gray-700 text-lg mb-8">
          Has iniciado sesión correctamente. Esta es tu página de inicio.
        </p>
        <LogoutButton />
      </div>
    </div>
  );
};

export default Dashboard;