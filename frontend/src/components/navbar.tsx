// components/Navbar.tsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../features/auth/AuthContext';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsProfileMenuOpen(false);
  };

  const navigationItems = [
    { name: 'Dashboard', path: '/dashboard', icon: '🏠' },
    { name: 'Mis Viajes', path: '/trips', icon: '✈️' },
    { name: 'Explorar', path: '/explore', icon: '🌍' },
    { name: 'Amigos', path: '/friends', icon: '👥' },
    { name: 'Mensajes', path: '/messages', icon: '💬' }
  ];

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="relative z-50">
      {/* Navbar principal */}
      <div className="bg-white/80 backdrop-blur-md border-b border-blue-100/50 shadow-lg sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo y marca */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-lg">T</span>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  TravelMate
                </h1>
                <p className="text-xs text-gray-500 hidden sm:block">Tu compañero de viajes</p>
              </div>
            </div>

            {/* Navegación desktop */}
            <div className="hidden md:flex items-center space-x-2">
              {navigationItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    isActivePath(item.path)
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50/80'
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.name}</span>
                </button>
              ))}
            </div>

            {/* Perfil de usuario */}
            <div className="flex items-center space-x-4">
              {/* Notificaciones */}
              <button className="relative p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50/80 rounded-xl transition-all duration-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5-5V9.09c0-2.33-1.9-4.09-4.24-4.09S6.52 6.76 6.52 9.09V12l-5 5h5m8 0a3 3 0 01-6 0" />
                </svg>
                {/* Badge de notificación */}
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white font-bold">3</span>
                </span>
              </button>

              {/* Menú de perfil */}
              <div className="relative">
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center space-x-2 p-1 rounded-xl hover:bg-blue-50/80 transition-all duration-300"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center shadow-md">
                    <span className="text-white text-sm font-bold">
                      {(user?.name || 'U')[0].toUpperCase()}
                    </span>
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-medium text-gray-700">{user?.name || 'Usuario'}</p>
                    <p className="text-xs text-gray-500">{user?.email || 'email@example.com'}</p>
                  </div>
                  <svg className="w-4 h-4 text-gray-600 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown del perfil */}
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-blue-100/50 py-2 z-50">
                    <div className="px-4 py-3 border-b border-blue-100/50">
                      <p className="text-sm font-medium text-gray-900">{user?.name || 'Usuario Demo'}</p>
                      <p className="text-sm text-gray-500">{user?.email || 'demo@travelmate.com'}</p>
                    </div>
                    
                    <div className="py-1">
                      <button
                        onClick={() => {
                          navigate('/profile');
                          setIsProfileMenuOpen(false);
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-blue-50/80 hover:text-blue-600 transition-all duration-300"
                      >
                        <span className="mr-3">👤</span>
                        Ver Perfil
                      </button>
                      <button
                        onClick={() => {
                          navigate('/settings');
                          setIsProfileMenuOpen(false);
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-blue-50/80 hover:text-blue-600 transition-all duration-300"
                      >
                        <span className="mr-3">⚙️</span>
                        Configuración
                      </button>
                      <button
                        onClick={() => {
                          navigate('/help');
                          setIsProfileMenuOpen(false);
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-blue-50/80 hover:text-blue-600 transition-all duration-300"
                      >
                        <span className="mr-3">❓</span>
                        Ayuda
                      </button>
                    </div>
                    
                    <div className="border-t border-blue-100/50 py-1">
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50/80 transition-all duration-300"
                      >
                        <span className="mr-3">🚪</span>
                        Cerrar Sesión
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Botón hamburguesa para móvil */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50/80 rounded-xl transition-all duration-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Menú móvil */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/90 backdrop-blur-md border-t border-blue-100/50">
            <div className="px-4 py-4 space-y-2">
              {navigationItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    setIsMenuOpen(false);
                  }}
                  className={`flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                    isActivePath(item.path)
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50/80'
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Overlay para cerrar menús */}
      {(isMenuOpen || isProfileMenuOpen) && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => {
            setIsMenuOpen(false);
            setIsProfileMenuOpen(false);
          }}
        />
      )}
    </nav>
  );
};

export default Navbar;
