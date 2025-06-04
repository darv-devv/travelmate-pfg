// components/Navbar.tsx
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../features/auth/AuthContext';

const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate('/', { replace: true });
  };

  const closeMenus = () => {
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    closeMenus();
  };

  // Función para verificar si la ruta está activa
  const isActiveRoute = (path: string): boolean => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  // Detectar si estamos en área logueada (usando rutas españolas)
  const isInAuthenticatedArea = ['/dashboard', '/explorar', '/perfil', '/trips', '/settings'].some(
    path => location.pathname.startsWith(path)
  );

  // Navegación dinámica según contexto
  const getNavigationItems = () => {
    if (!isAuthenticated) {
      // Usuario no logueado - navbar público
      return [
        { name: 'Inicio', path: '/', icon: 'home' },
        { name: 'Explorar', path: '#explorar', icon: 'globe' },
        { name: 'Destinos', path: '#destinos', icon: 'map' },
      ];
    } else if (isInAuthenticatedArea) {
      // Usuario logueado en área privada - navbar de aplicación
      return [
        { name: 'Mi Panel', path: '/dashboard', icon: 'dashboard' },
        { name: 'Explorar Destinos', path: '/explorar', icon: 'compass' },
        { name: 'Mis Viajes', path: '/trips', icon: 'suitcase' },
      ];
    } else {
      // Usuario logueado en área pública - navbar híbrido
      return [
        { name: 'Inicio', path: '/', icon: 'home' },
        { name: 'Mi Panel', path: '/dashboard', icon: 'dashboard' },
        { name: 'Destinos', path: '/explorar', icon: 'compass' },
      ];
    }
  };

  const navigationItems = getNavigationItems();

  const getIcon = (iconName: string) => {
    const icons = {
      home: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      dashboard: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      ),
      compass: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9c-5 0-9-4-9-9s4-9 9-9" />
        </svg>
      ),
      globe: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      map: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      suitcase: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    };
    return icons[iconName as keyof typeof icons] || icons.home;
  };

  return (
    <nav className="bg-gradient-to-r from-white via-amber-50 to-white shadow-lg border-b-2 border-gradient-to-r from-amber-200 to-blue-200 sticky top-0 z-50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo y marca con toque dorado */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => handleNavigation(isAuthenticated ? '/dashboard' : '/')}
              className="flex items-center space-x-2 hover:scale-105 transition-all duration-300 group"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 via-yellow-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 border-2 border-white">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-amber-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                  TravelMate
                </span>
                <span className="text-xs text-amber-600 font-medium -mt-1">
                  Tu compañero de viajes
                </span>
              </div>
            </button>
          </div>

          {/* Navegación desktop */}
          <div className="hidden md:flex items-center space-x-6">
            {navigationItems.map((item) => {
              const isActive = isActiveRoute(item.path);
              const isHashLink = item.path.startsWith('#');
              
              return (
                <button
                  key={item.name}
                  onClick={() => !isHashLink ? handleNavigation(item.path) : undefined}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-100 to-blue-100 text-amber-700 border-2 border-amber-300 shadow-md'
                      : isHashLink
                      ? 'text-gray-500 hover:text-amber-600 hover:bg-amber-50 cursor-default'
                      : 'text-gray-600 hover:text-amber-600 hover:bg-gradient-to-r hover:from-amber-50 hover:to-blue-50 hover:border hover:border-amber-200'
                  }`}
                >
                  {getIcon(item.icon)}
                  <span>{item.name}</span>
                  {isHashLink && <span className="text-xs text-amber-500">(Próximamente)</span>}
                </button>
              );
            })}
          </div>

          {/* Botones de usuario desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-3 px-4 py-2 rounded-xl hover:bg-gradient-to-r hover:from-amber-50 hover:to-blue-50 transition-all duration-300 border-2 border-amber-200 bg-white shadow-sm"
                >
                  <div className="w-9 h-9 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-md border-2 border-white">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-gray-800">
                      {user?.name || 'Usuario'}
                    </p>
                    <p className="text-xs text-amber-600">
                      Explorador
                    </p>
                  </div>
                  <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown del usuario mejorado */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-xl border-2 border-amber-100 py-2 z-50 backdrop-blur-sm">
                    <div className="px-4 py-3 border-b border-amber-100">
                      <p className="text-sm font-semibold text-gray-800">{user?.name || 'Usuario'}</p>
                      <p className="text-xs text-amber-600">{user?.email || 'usuario@ejemplo.com'}</p>
                    </div>
                    
                    <button
                      onClick={() => {
                        handleNavigation('/perfil');
                        setIsUserMenuOpen(false);
                      }}
                      className="flex items-center space-x-3 w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gradient-to-r hover:from-amber-50 hover:to-blue-50 transition-all duration-200"
                    >
                      <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span>Mi Perfil</span>
                    </button>
                    
                    <button
                      onClick={() => {
                        handleNavigation('/settings');
                        setIsUserMenuOpen(false);
                      }}
                      className="flex items-center space-x-3 w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gradient-to-r hover:from-amber-50 hover:to-blue-50 transition-all duration-200"
                    >
                      <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>Configuración</span>
                    </button>
                    
                    <hr className="my-2 border-amber-100" />
                    
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-3 w-full px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50 transition-all duration-200"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      <span>Cerrar Sesión</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handleNavigation('/login')}
                  className="px-5 py-2 text-sm font-medium text-gray-600 hover:text-amber-600 transition-colors rounded-lg hover:bg-amber-50"
                >
                  Iniciar Sesión
                </button>
                <button
                  onClick={() => handleNavigation('/register')}
                  className="px-5 py-2 bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 text-white text-sm font-medium rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl border border-amber-300"
                >
                  Registrarse
                </button>
              </div>
            )}
          </div>

          {/* Botón menú mobile mejorado */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl text-amber-600 hover:text-amber-700 hover:bg-amber-50 transition-all duration-300 border border-amber-200"
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Menú mobile mejorado */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t-2 border-amber-100 py-4 bg-gradient-to-b from-amber-50 to-white">
            <div className="space-y-2">
              {navigationItems.map((item) => {
                const isActive = isActiveRoute(item.path);
                const isHashLink = item.path.startsWith('#');
                
                return (
                  <button
                    key={item.name}
                    onClick={() => !isHashLink ? handleNavigation(item.path) : undefined}
                    className={`flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-left transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-r from-amber-100 to-blue-100 text-amber-700 border-2 border-amber-300'
                        : isHashLink
                        ? 'text-gray-500 cursor-default'
                        : 'text-gray-600 hover:text-amber-600 hover:bg-gradient-to-r hover:from-amber-50 hover:to-blue-50'
                    }`}
                  >
                    {getIcon(item.icon)}
                    <span className="font-medium">{item.name}</span>
                    {isHashLink && <span className="text-xs text-amber-500">(Próximamente)</span>}
                  </button>
                );
              })}
              
              {isAuthenticated ? (
                <div className="border-t-2 border-amber-100 pt-4 mt-4">
                  <button
                    onClick={() => {
                      handleNavigation('/perfil');
                      closeMenus();
                    }}
                    className="flex items-center space-x-3 w-full px-4 py-3 text-left text-gray-600 hover:text-amber-600 hover:bg-gradient-to-r hover:from-amber-50 hover:to-blue-50 rounded-xl transition-all duration-300"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="font-medium">Mi Perfil</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-3 w-full px-4 py-3 text-left text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300 mt-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span className="font-medium">Cerrar Sesión</span>
                  </button>
                </div>
              ) : (
                <div className="border-t-2 border-amber-100 pt-4 mt-4 space-y-3">
                  <button
                    onClick={() => handleNavigation('/login')}
                    className="w-full px-4 py-3 text-center text-gray-600 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all duration-300 font-medium border border-amber-200"
                  >
                    Iniciar Sesión
                  </button>
                  <button
                    onClick={() => handleNavigation('/register')}
                    className="w-full px-4 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-md font-medium"
                  >
                    Registrarse
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Overlay mejorado */}
      {(isMobileMenuOpen || isUserMenuOpen) && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40 backdrop-blur-sm"
          onClick={closeMenus}
        />
      )}
    </nav>
  );
};

export default Navbar;