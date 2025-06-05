// pages/Dashboard.tsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../features/auth/AuthContext';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState<'overview' | 'social'>('overview');
  const [newPost, setNewPost] = useState('');
  
  // Estados para el navbar
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  // Navegación del navbar
  const navigationItems = [
    { name: 'Dashboard', path: '/dashboard', icon: '🏠' },
    { name: 'Mis Viajes', path: '/trips', icon: '✈️' },
    { name: 'Explorar', path: '/destinations', icon: '🌍' },
    { name: 'Amigos', path: '/friends', icon: '👥' },
    { name: 'Mensajes', path: '/messages', icon: '💬' }
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsProfileMenuOpen(false);
  };

  // Actualizar hora 
  React.useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Posts del muro 
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: {
        name: 'María González',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b723-1c21?w=64&h=64&fit=crop&crop=face',
        location: 'Barcelona'
      },
      content: '¡Increíble experiencia en Santorini! 🇬🇷 Los atardeceres son mágicos.',
      image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=400&h=300&fit=crop',
      location: 'Santorini, Grecia',
      timestamp: new Date('2024-06-04T14:30:00Z'),
      likes: 24,
      comments: 5
    },
    {
      id: 2,
      user: {
        name: 'Carlos Ruiz',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face',
        location: 'Madrid'
      },
      content: 'Tip: En Tokio, consigan un JR Pass antes de llegar. Ahorra mucho dinero 🚄',
      location: 'Tokio, Japón',
      timestamp: new Date('2024-06-04T10:15:00Z'),
      likes: 18,
      comments: 3
    }
  ]);

  // Datos de ejemplo - API 
  const stats = {
    totalTrips: 12,
    plannedTrips: 3,
    completedTrips: 9,
    countriesVisited: 8
  };

  const recentTrips = [
    {
      id: 1,
      destination: 'París, Francia',
      date: '2024-07-15',
      status: 'completed',
      image: '/vertical-shot-beautiful-eiffel-tower-captured-paris-france.jpg'
    },
    {
      id: 2,
      destination: 'Nueva York, EE.UU.',
      date: '2024-09-10',
      status: 'ongoing',
      image: '/high-angle-shot-city-buildings-new-york-manhattan.jpg'
    },
    {
      id: 3,
      destination: 'Tokio, Japón',
      date: '2024-12-20',
      status: 'planned',
      image: 'https://via.placeholder.com/300x200/3B82F6/ffffff?text=Tokio'
    }
  ];

  const quickActions = [
    {
      title: 'Planificar Viaje',
      description: 'Crea un nuevo itinerario',
      icon: 'plus',
      color: 'from-blue-500 to-blue-600',
      action: () => navigate('/explore')
    },
    {
      title: 'Explorar Destinos',
      description: 'Descubre nuevos lugares',
      icon: 'compass',
      color: 'from-amber-500 to-yellow-500',
      action: () => navigate('/explore')
    },
    {
      title: 'Mis Viajes',
      description: 'Ver historial completo',
      icon: 'map',
      color: 'from-indigo-500 to-purple-500',
      action: () => navigate('/trips')
    }
  ];

  const getIcon = (iconName: string) => {
    const icons = {
      plus: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      ),
      compass: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9c-5 0-9-4-9-9s4-9 9-9" />
        </svg>
      ),
      map: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 9m0 11V9m0 0L9 7" />
        </svg>
      )
    };
    return icons[iconName as keyof typeof icons] || icons.plus;
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      completed: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      ongoing: 'bg-blue-100 text-blue-700 border-blue-200',
      planned: 'bg-amber-100 text-amber-700 border-amber-200'
    };
    const labels = {
      completed: 'Completado',
      ongoing: 'En curso',
      planned: 'Planificado'
    };
    return { style: styles[status as keyof typeof styles], label: labels[status as keyof typeof labels] };
  };

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Hace menos de 1 hora';
    if (diffInHours < 24) return `Hace ${diffInHours} hora${diffInHours > 1 ? 's' : ''}`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `Hace ${diffInDays} día${diffInDays > 1 ? 's' : ''}`;
  };

  const handleCreatePost = () => {
    if (newPost.trim()) {
      const post = {
        id: posts.length + 1,
        user: {
          name: user?.name || 'Usuario Demo',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face',
          location: 'Madrid'
        },
        content: newPost,
        location: 'Madrid, España',
        timestamp: new Date(),
        likes: 0,
        comments: 0
      };
      setPosts([post, ...posts]);
      setNewPost('');
    }
  };

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1 }
        : post
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-blue-50 relative">
      
      {/* Navbar del Profile*/}
      <div className="bg-white/90 backdrop-blur-lg border-b border-white/20 shadow-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 via-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              </div>
              <h1 className="text-xl font-bold">
                <span className="bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 bg-clip-text text-transparent">Travel</span>
                <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent">Mate</span>
              </h1>
            </div>

            {/* Navegación */}
            <div className="hidden md:flex space-x-4">
              {navigationItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                    location.pathname === item.path
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-white/50 hover:text-blue-600'
                  }`}
                >
                  {item.icon} {item.name}
                </button>
              ))}
            </div>

            {/* Perfil de usuario */}
            <div className="flex items-center space-x-4">
              {/* Notificaciones */}
              <button className="relative p-2 text-gray-700 hover:text-blue-600 hover:bg-white/50 rounded-xl transition-all duration-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5-5V9.09c0-2.33-1.9-4.09-4.24-4.09S6.52 6.76 6.52 9.09V12l-5 5h5m8 0a3 3 0 01-6 0" />
                </svg>
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white font-bold">3</span>
                </span>
              </button>

              {/* Menú de perfil */}
              <div className="relative">
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center space-x-2 p-1 rounded-xl hover:bg-white/50 transition-all duration-300"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
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
                  <div className="absolute right-0 mt-2 w-64 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-white/30 py-2 z-50">
                    <div className="px-4 py-3 border-b border-white/20">
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
                    
                    <div className="border-t border-white/20 py-1">
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
                className="md:hidden p-2 text-gray-700 hover:text-blue-600 hover:bg-white/50 rounded-xl transition-all duration-300"
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
          <div className="md:hidden bg-white/90 backdrop-blur-md border-t border-white/20">
            <div className="px-4 py-4 space-y-2">
              {navigationItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    setIsMenuOpen(false);
                  }}
                  className={`flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                    location.pathname === item.path
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50/80'
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

      {/* Efectos de fondo mejorados */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Orbes luminosos */}
        <div className="absolute top-20 -right-32 w-96 h-96 bg-gradient-to-br from-blue-400/30 to-indigo-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-80 -left-32 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-blue-400/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-gradient-to-br from-indigo-400/25 to-cyan-400/20 rounded-full blur-3xl"></div>
        
        {/* Puntos de luz sutiles */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full" style={{
            backgroundImage: `radial-gradient(circle, #60A5FA 1px, transparent 1px)`,
            backgroundSize: '30px 30px'
          }}></div>
        </div>
        
        {/* Overlay gradiente para suavizar la transición */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-blue-50/50 pointer-events-none"></div>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header con saludo mejorado */}
          <div className="mb-8">
            <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/30 p-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div className="flex items-center space-x-4 mb-4 md:mb-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg border-2 border-white">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold">
                      <span className="text-gray-800">Bienvenido de vuelta, </span>
                      <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        {user?.name || 'Explorador'}
                      </span>
                    </h1>
                    <p className="text-gray-700 mt-1">
                      {currentTime.toLocaleDateString('es-ES', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                </div>
                
                {/* Mini acciones rápidas */}
                <div className="flex space-x-3">
                  <button 
                    onClick={() => navigate('/explore')}
                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg text-sm font-medium"
                  >
                    Explorar
                  </button>
                  <button 
                    onClick={() => navigate('/profile')}
                    className="px-4 py-2 bg-white/90 text-blue-600 rounded-xl hover:bg-white transition-all duration-300 shadow-lg border border-blue-200 text-sm font-medium"
                  >
                    Mi Perfil
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Navegación por pestañas */}
          <div className="mb-8">
            <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/30 p-2">
              <div className="flex space-x-2">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`flex-1 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeTab === 'overview'
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50/50'
                  }`}
                >
                  📊 Resumen
                </button>
                <button
                  onClick={() => setActiveTab('social')}
                  className={`flex-1 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeTab === 'social'
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50/50'
                  }`}
                >
                  🌍 Comunidad
                </button>
              </div>
            </div>
          </div>

          {activeTab === 'overview' ? (
            <>
              {/* Estadísticas */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
                {[
                  { label: 'Total Viajes', value: stats.totalTrips, icon: '✈️', gradient: 'from-blue-500 to-indigo-500' },
                  { label: 'Planificados', value: stats.plannedTrips, icon: '📅', gradient: 'from-amber-500 to-yellow-500' },
                  { label: 'Completados', value: stats.completedTrips, icon: '✅', gradient: 'from-emerald-500 to-teal-500' },
                  { label: 'Países Visitados', value: stats.countriesVisited, icon: '🌍', gradient: 'from-indigo-500 to-purple-500' }
                ].map((stat, index) => (
                  <div key={index} className="bg-white/95 backdrop-blur-md rounded-2xl p-4 md:p-6 shadow-2xl border border-white/30 hover:shadow-3xl transition-all duration-300 group hover:scale-105">
                    <div className="flex items-center justify-between mb-3">
                      <div className={`w-10 h-10 bg-gradient-to-r ${stat.gradient} rounded-xl flex items-center justify-center text-lg group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                        {stat.icon}
                      </div>
                      <div className="text-right">
                        <div className={`text-2xl md:text-3xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                          {stat.value}
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-700 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Panel principal */}
                <div className="lg:col-span-2">
                  <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/30 p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-bold text-gray-900">Viajes Recientes</h2>
                      <button 
                        onClick={() => navigate('/trips')}
                        className="text-blue-600 hover:text-indigo-600 text-sm font-medium transition-colors"
                      >
                        Ver todos →
                      </button>
                    </div>
                    
                    <div className="space-y-4">
                      {recentTrips.map((trip) => {
                        const statusBadge = getStatusBadge(trip.status);
                        return (
                          <div key={trip.id} className="flex items-center space-x-4 p-4 bg-gradient-to-r from-gray-50/80 to-blue-50/80 rounded-xl hover:from-blue-50/80 hover:to-indigo-50/80 transition-all duration-300 group cursor-pointer border border-blue-100/50 backdrop-blur-sm">
                            <div className="w-16 h-16 rounded-xl overflow-hidden shadow-md group-hover:shadow-lg transition-shadow duration-300">
                              <img
                                src={trip.image}
                                alt={trip.destination}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                onError={(e) => {
                                  e.currentTarget.src = 'https://via.placeholder.com/64x64/3B82F6/ffffff?text=📍';
                                }}
                              />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                                {trip.destination}
                              </h3>
                              <p className="text-sm text-gray-600">
                                {new Date(trip.date).toLocaleDateString('es-ES')}
                              </p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusBadge.style}`}>
                              {statusBadge.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Sidebar  */}
                <div className="space-y-6">
                  
                  {/* Acciones  */}
                  <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/30 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Acciones Rápidas</h3>
                    <div className="space-y-3">
                      {quickActions.map((action, index) => (
                        <button
                          key={index}
                          onClick={action.action}
                          className={`w-full p-4 bg-gradient-to-r ${action.color} text-white rounded-xl hover:shadow-lg transition-all duration-300 group transform hover:scale-105`}
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/30 transition-colors">
                              {getIcon(action.icon)}
                            </div>
                            <div className="text-left flex-1">
                              <div className="font-semibold text-sm">{action.title}</div>
                              <div className="text-xs opacity-90">{action.description}</div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Widget del clima */}
                  <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-2xl p-6 text-white backdrop-blur-md">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold">Tu Ubicación</h3>
                      <div className="text-2xl">☀️</div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm opacity-90">Madrid, España</div>
                      <div className="text-2xl font-bold">22°C</div>
                      <div className="text-sm opacity-90">Perfecto para planificar viajes</div>
                    </div>
                  </div>

                  {/* Tip del día */}
                  <div className="bg-gradient-to-br from-amber-500 to-yellow-500 rounded-2xl shadow-2xl p-6 text-white backdrop-blur-md">
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="text-xl">💡</div>
                      <h3 className="font-bold">Tip del Día</h3>
                    </div>
                    <p className="text-sm opacity-90 leading-relaxed">
                      Reserva vuelos los martes y miércoles para obtener mejores precios. ¡Ahorrarás hasta un 20%!
                    </p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* Vista Social */
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              
              {/* Feed principal */}
              <div className="lg:col-span-3 space-y-6">
                
                {/* Panel para posts */}
                <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/30 p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {user?.name?.charAt(0) || 'U'}
                    </div>
                    <div className="flex-1">
                      <textarea 
                        value={newPost}
                        onChange={(e) => setNewPost(e.target.value)}
                        placeholder="¿Qué tal tu último viaje? Comparte tu experiencia..."
                        className="w-full p-4 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none text-gray-700 placeholder-gray-500"
                        rows={3}
                      />
                      <div className="flex justify-between items-center mt-4">
                        <div className="flex space-x-3">
                          <button className="flex items-center space-x-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm">
                            <span>📷</span>
                            <span>Foto</span>
                          </button>
                          <button className="flex items-center space-x-2 px-3 py-2 bg-amber-50 text-amber-600 rounded-lg hover:bg-amber-100 transition-colors text-sm">
                            <span>⭐</span>
                            <span>Reseña</span>
                          </button>
                        </div>
                        <button 
                          onClick={handleCreatePost}
                          disabled={!newPost.trim()}
                          className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Compartir
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Posts del feed */}
                {posts.map((post) => (
                  <div key={post.id} className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/30 p-6 hover:shadow-3xl transition-all duration-300">
                    
                    {/* Header del post */}
                    <div className="flex items-center space-x-3 mb-4">
                      <img 
                        src={post.user.avatar} 
                        alt={post.user.name}
                        className="w-12 h-12 rounded-full object-cover shadow-md"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{post.user.name}</h3>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <span>📍 {post.location}</span>
                          <span>•</span>
                          <span>{formatTimeAgo(post.timestamp)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Contenido del post */}
                    <p className="text-gray-700 mb-4 leading-relaxed">{post.content}</p>

                    {/* Para subir arcivos del post*/}
                    {post.image && (
                      <div className="mb-4 rounded-xl overflow-hidden shadow-lg">
                        <img 
                          src={post.image} 
                          alt="Post"
                          className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}

                    {/* Acciones del post */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="flex space-x-6">
                        <button 
                          onClick={() => handleLike(post.id)}
                          className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors"
                        >
                          <span>❤️</span>
                          <span className="text-sm">{post.likes}</span>
                        </button>
                        <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors">
                          <span>💬</span>
                          <span className="text-sm">{post.comments}</span>
                        </button>
                        <button className="flex items-center space-x-2 text-gray-600 hover:text-green-500 transition-colors">
                          <span>🔗</span>
                          <span className="text-sm">Compartir</span>
                        </button>
                      </div>
                      <button className="text-blue-600 hover:text-indigo-600 text-sm font-medium">
                        Conectar
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                
                {/* Sidebar */}
                <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/30 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">🌟 Viajeros Activos</h3>
                  <div className="space-y-3">
                    {[
                      { name: 'Laura P.', location: 'Sevilla', status: 'En Roma' },
                      { name: 'Diego L.', location: 'Barcelona', status: 'Planificando viaje' },
                      { name: 'Sofia C.', location: 'Valencia', status: 'Buscando compañía' }
                    ].map((user, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50/80 to-blue-50/80 rounded-lg hover:from-blue-50/80 hover:to-indigo-50/80 transition-all duration-300">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{user.name}</p>
                          <p className="text-xs text-gray-600">{user.status}</p>
                        </div>
                        <button className="px-3 py-1 bg-blue-500 text-white text-xs rounded-lg hover:bg-blue-600 transition-colors">
                          Seguir
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dest Sidebar */}
                <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/30 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">🔥 Trending</h3>
                  <div className="space-y-3">
                    {[
                      { destination: 'Canarias', posts: 45 },
                      { destination: 'Baleares', posts: 32 },
                      { destination: 'Costa Brava', posts: 28 }
                    ].map((trend, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50/80 to-amber-50/80 rounded-lg cursor-pointer hover:from-amber-50/80 hover:to-yellow-50/80 transition-all duration-300">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{trend.destination}</p>
                          <p className="text-xs text-gray-600">{trend.posts} publicaciones</p>
                        </div>
                        <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
                          +{Math.floor(Math.random() * 20) + 5}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Eventos */}
                <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl shadow-2xl p-6 text-white">
                  <h3 className="font-bold mb-4">📅 Próximos Eventos</h3>
                  <div className="space-y-3">
                    <div className="bg-white/20 rounded-lg p-3 backdrop-blur-sm">
                      <p className="text-sm font-medium">Meetup Viajeros Madrid</p>
                      <p className="text-xs opacity-90">8 Jun • 19:00h</p>
                    </div>
                    <div className="bg-white/20 rounded-lg p-3 backdrop-blur-sm">
                      <p className="text-sm font-medium">Intercambio de Culturas</p>
                      <p className="text-xs opacity-90">15 Jun • 18:30h</p>
                    </div>
                  </div>
                  <button className="w-full mt-4 bg-white/20 hover:bg-white/30 text-white py-2 rounded-lg transition-colors text-sm font-medium">
                    Ver todos
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
