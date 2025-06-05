// pages/Profile.tsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../features/auth/AuthContext';

const Profile: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('general');
  const [isEditing, setIsEditing] = useState(false);
  
  // Estados para el navbar
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  
  // para la edición del perfil
  const [profileData, setProfileData] = useState({
    name: user?.name || 'Usuario Demo',
    email: user?.email || 'demo@travelmate.com',
    phone: '+34 6XXXXXXX',
    location: 'Madrid, España',
    bio: 'Apasionado por los viajes y descubrir nuevas culturas. Siempre en busca de la próxima aventura.',
    birthDate: '1995-06-15',
    travelStyle: 'Aventurero',
    languages: ['Español', 'Inglés', 'Francés']
  });

  // Estadísticas del usuario
  const userStats = {
    totalTrips: 12,
    countriesVisited: 8,
    citiesExplored: 25,
    photosShared: 156,
    friendsConnected: 34,
    reviewsWritten: 18
  };

  // Configs
  const [preferences, setPreferences] = useState({
    notifications: {
      email: true,
      push: false,
      sms: false,
      marketing: true
    },
    privacy: {
      profilePublic: true,
      showEmail: false,
      showPhone: false,
      allowMessages: true
    },
    language: 'es',
    currency: 'EUR',
    timezone: 'Europe/Madrid'
  });

  // Navegación del navbar
  const navigationItems = [
    { name: 'Dashboard', path: '/dashboard', icon: '🏠' },
    { name: 'Mis Viajes', path: '/trips', icon: '✈️' },
    { name: 'Explorar', path: '/explore', icon: '🌍' },
    { name: 'Amigos', path: '/friends', icon: '👥' },
    { name: 'Mensajes', path: '/messages', icon: '💬' }
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsProfileMenuOpen(false);
  };

  const handleSaveProfile = () => {
    // Aquí  la llamada a la API para guardar
    console.log('Guardando perfil:', profileData);
    setIsEditing(false);
  };

  const handleDeleteAccount = () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.')) {
      // Aquíla llamada a la API para eliminar
      console.log('Eliminando cuenta...');
      logout();
      navigate('/');
    }
  };

  const tabs = [
    { id: 'general', name: 'Información General', icon: '👤' },
    { id: 'stats', name: 'Estadísticas', icon: '📊' },
    { id: 'preferences', name: 'Preferencias', icon: '⚙️' },
    { id: 'privacy', name: 'Privacidad', icon: '🔒' },
    { id: 'security', name: 'Seguridad', icon: '🛡️' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="space-y-6">
            {/* Foto de perfil y datos básicos */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-blue-100/50 p-6">
              <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
                <div className="relative">
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white text-4xl font-bold">
                      {(profileData.name || 'U')[0].toUpperCase()}
                    </span>
                  </div>
                  <button className="absolute bottom-2 right-2 w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center shadow-md hover:bg-amber-600 transition-colors">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </button>
                </div>
                
                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">{profileData.name}</h1>
                  <p className="text-gray-600 mb-1">{profileData.email}</p>
                  <p className="text-gray-500 text-sm mb-3">{profileData.location}</p>
                  <div className="flex flex-wrap justify-center md:justify-start gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                      {profileData.travelStyle}
                    </span>
                    {profileData.languages.map((lang, index) => (
                      <span key={index} className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 shadow-md hover:shadow-lg text-sm font-medium"
                >
                  {isEditing ? 'Cancelar' : 'Editar Perfil'}
                </button>
              </div>
            </div>

            {/* Formulario de edición */}
            {isEditing && (
              <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-blue-100/50 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Editar Información</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                      className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Ubicación</label>
                    <input
                      type="text"
                      value={profileData.location}
                      onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                      className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Fecha de Nacimiento</label>
                    <input
                      type="date"
                      value={profileData.birthDate}
                      onChange={(e) => setProfileData({...profileData, birthDate: e.target.value})}
                      className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Biografía</label>
                    <textarea
                      rows={3}
                      value={profileData.bio}
                      onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                      className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleSaveProfile}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 shadow-md"
                  >
                    Guardar Cambios
                  </button>
                </div>
              </div>
            )}

            {/* BIO */}
            {!isEditing && (
              <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-blue-100/50 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Sobre mí</h3>
                <p className="text-gray-600 leading-relaxed">{profileData.bio}</p>
              </div>
            )}
          </div>
        );

      case 'stats':
        return (
          <div className="space-y-6">
            {/* Estadísticas principales */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { label: 'Viajes Realizados', value: userStats.totalTrips, icon: '✈️', gradient: 'from-blue-500 to-indigo-500' },
                { label: 'Países Visitados', value: userStats.countriesVisited, icon: '🌍', gradient: 'from-emerald-500 to-teal-500' },
                { label: 'Ciudades Exploradas', value: userStats.citiesExplored, icon: '🏙️', gradient: 'from-amber-500 to-yellow-500' },
                { label: 'Fotos Compartidas', value: userStats.photosShared, icon: '📸', gradient: 'from-purple-500 to-pink-500' },
                { label: 'Amigos Conectados', value: userStats.friendsConnected, icon: '👥', gradient: 'from-indigo-500 to-purple-500' },
                { label: 'Reseñas Escritas', value: userStats.reviewsWritten, icon: '⭐', gradient: 'from-orange-500 to-red-500' }
              ].map((stat, index) => (
                <div key={index} className="bg-white/80 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-blue-100/50 hover:shadow-2xl transition-all duration-300 group hover:scale-105">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 bg-gradient-to-r ${stat.gradient} rounded-xl flex items-center justify-center text-lg group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                      {stat.icon}
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                        {stat.value}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Logros */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-blue-100/50 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Logros Desbloqueados</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { name: 'Primer Viaje', description: 'Completaste tu primer viaje', icon: '🎯', unlocked: true },
                  { name: 'Explorador', description: 'Visitaste 5 países diferentes', icon: '🗺️', unlocked: true },
                  { name: 'Fotógrafo', description: 'Compartiste 100 fotos', icon: '📷', unlocked: true },
                  { name: 'Aventurero', description: 'Realizaste 10 viajes', icon: '🏔️', unlocked: true },
                  { name: 'Globetrotter', description: 'Visitaste 3 continentes', icon: '🌎', unlocked: false },
                  { name: 'Influencer', description: 'Conseguiste 50 seguidores', icon: '⭐', unlocked: false }
                ].map((achievement, index) => (
                  <div key={index} className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                    achievement.unlocked 
                      ? 'bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200 shadow-md'
                      : 'bg-gray-50 border-gray-200 opacity-60'
                  }`}>
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                        achievement.unlocked ? 'bg-amber-100' : 'bg-gray-200'
                      }`}>
                        {achievement.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{achievement.name}</h4>
                        <p className="text-xs text-gray-600">{achievement.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'preferences':
        return (
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-blue-100/50 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Preferencias de la Aplicación</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Idioma</label>
                  <select 
                    value={preferences.language}
                    onChange={(e) => setPreferences({...preferences, language: e.target.value})}
                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="es">Español</option>
                    <option value="en">English</option>
                    <option value="fr">Français</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Moneda</label>
                  <select 
                    value={preferences.currency}
                    onChange={(e) => setPreferences({...preferences, currency: e.target.value})}
                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="EUR">Euro (€)</option>
                    <option value="USD">Dólar ($)</option>
                    <option value="GBP">Libra (£)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Zona Horaria</label>
                  <select 
                    value={preferences.timezone}
                    onChange={(e) => setPreferences({...preferences, timezone: e.target.value})}
                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Europe/Madrid">Madrid (UTC+1)</option>
                    <option value="Europe/London">Londres (UTC+0)</option>
                    <option value="America/New_York">Nueva York (UTC-5)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Notificaciones */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-blue-100/50 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Notificaciones</h3>
              <div className="space-y-4">
                {Object.entries(preferences.notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                    <button
                      onClick={() => setPreferences({
                        ...preferences,
                        notifications: {...preferences.notifications, [key]: !value}
                      })}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        value ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        value ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'privacy':
        return (
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-blue-100/50 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Configuración de Privacidad</h3>
              <div className="space-y-4">
                {Object.entries(preferences.privacy).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div>
                      <span className="text-gray-700 font-medium capitalize">
                        {key.replace(/([A-Z])/g, ' $1')}
                      </span>
                      <p className="text-sm text-gray-500">
                        {key === 'profilePublic' && 'Permite que otros usuarios vean tu perfil'}
                        {key === 'showEmail' && 'Muestra tu email en tu perfil público'}
                        {key === 'showPhone' && 'Muestra tu teléfono en tu perfil público'}
                        {key === 'allowMessages' && 'Permite que otros usuarios te envíen mensajes'}
                      </p>
                    </div>
                    <button
                      onClick={() => setPreferences({
                        ...preferences,
                        privacy: {...preferences.privacy, [key]: !value}
                      })}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        value ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        value ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-blue-100/50 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Cambiar Contraseña</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contraseña Actual</label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nueva Contraseña</label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Confirmar Nueva Contraseña</label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 shadow-md">
                  Actualizar Contraseña
                </button>
              </div>
            </div>

            {/* Zona peligrosa */}
            <div className="bg-red-50/80 backdrop-blur-md rounded-2xl shadow-xl border border-red-200 p-6">
              <h3 className="text-lg font-bold text-red-900 mb-4">¡Cuidado!</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-red-800 mb-2">Eliminar Cuenta</h4>
                  <p className="text-sm text-red-600 mb-4">
                    Esta acción eliminará permanentemente tu cuenta y todos tus datos. No se puede deshacer.
                  </p>
                  <button
                    onClick={handleDeleteAccount}
                    className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all duration-300 shadow-md"
                  >
                    Eliminar Cuenta
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-blue-50 relative">
      
      {/*  Navbar */}
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

            {/* Perfil */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white text-sm font-bold">
                  {(user?.name || 'U')[0].toUpperCase()}
                </span>
              </div>
              <span className="hidden sm:block text-sm text-gray-700 font-medium">{user?.name || 'Usuario'}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Efectos */}
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
        
        {/*Overlay gradiente para suavizar la transición */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-blue-50/50 pointer-events-none"></div>
      </div>

      <div className="relative z-10 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="mb-8">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-blue-100/50 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Mi Perfil
                  </h1>
                  <p className="text-gray-600 mt-1">
                    Gestiona tu información personal y preferencias
                  </p>
                </div>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 shadow-md hover:shadow-lg text-sm font-medium"
                >
                  Volver al Dashboard
                </button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-8">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-blue-100/50 p-2">
              <div className="flex flex-wrap gap-2">
                {tabs.map((tab) => (
                  <button
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md'
                        : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    <span>{tab.icon}</span>
                    <span className="hidden sm:inline">{tab.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Contenido de las tabs */}
          <div>
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
