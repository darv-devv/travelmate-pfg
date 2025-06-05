import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../features/auth/AuthContext';

// Datos de ejemplo para los destinos turísticos
const destinosDemo = [
  {
    id: 1,
    name: 'París',
    country: 'Francia',
    population: '2.1 millones',
    language: 'Francés',
    currency: 'Euro (€)',
    timezone: 'CET (UTC+1)',
    image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=400&h=300&fit=crop',
    description: 'Capital europea. Famosa por ser cuna de la artes bohemias.',
    climate: 'Templado, con inviernos fríos y veranos cálidos.',
    bestTime: 'Mayo-Septiembre',
    budget: '€80-150/día',
    attractions: ['Torre Eiffel', 'Museo del Louvre', 'Campos Elíseos', 'Catedral de Notre-Dame'],
    tips: 'Compra el Paris Museum Pass para evitar colas.',
    gallery: [
      'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=300&h=200&fit=crop',
      'https://images.unsplash.com/photo-1549144511-f099e773c147?w=300&h=200&fit=crop',
      'https://images.unsplash.com/photo-1431274172761-fca41d930114?w=300&h=200&fit=crop'
    ]
  },
  {
    id: 2,
    name: 'Tokio',
    country: 'Japón',
    population: '13.9 millones',
    language: 'Japonés',
    currency: 'Yen (¥)',
    timezone: 'JST (UTC+9)',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop',
    description: 'Una ciudad ultramoderna que combina una rica tradición cultural con las puntera tecnología.',
    climate: 'Húmedo subtropical, veranos calurosos e inviernos frescos.',
    bestTime: 'Marzo-Mayo, Octubre-Noviembre',
    budget: '¥8,000-15,000/día',
    attractions: ['Templo Senso-ji', 'Shibuya Crossing', 'Palacio Imperial', 'Distrito de Harajuku'],
    tips: 'Consigue un JR Pass para transporte ilimitado.',
    gallery: [
      'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=300&h=200&fit=crop',
      'https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=300&h=200&fit=crop',
      'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=300&h=200&fit=crop'
    ]
  },
  {
    id: 3,
    name: 'Nueva York',
    country: 'EE.UU.',
    population: '8.4 millones',
    language: 'Inglés',
    currency: 'Dólar ($)',
    timezone: 'EST (UTC-5)',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=300&fit=crop',
    description: 'Conocida como la Gran Manzana, se convierte en un océano de cristaleras.',
    climate: 'Continental húmedo, con inviernos fríos y veranos calurosos.',
    bestTime: 'Abril-Junio, Septiembre-Noviembre',
    budget: '$100-200/día',
    attractions: ['Estatua de la Libertad', 'Central Park', 'Times Square', 'Museo Met'],
    tips: 'Usa el metro con MetroCard para moverte fácilmente.',
    gallery: [
      'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=300&h=200&fit=crop',
      'https://images.unsplash.com/photo-1485871981521-5b1fd3805b6d?w=300&h=200&fit=crop',
      'https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=300&h=200&fit=crop'
    ]
  },
];

const Destinations: React.FC = () => {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const navigationItems = [
    { name: 'Dashboard', path: '/dashboard', icon: '🏠' },
    { name: 'Mis Viajes', path: '/trips', icon: '✈️' },
    { name: 'Explorar', path: '/destination', icon: '🌍' },
    { name: 'Amigos', path: '/friends', icon: '👥' },
    { name: 'Mensajes', path: '/messages', icon: '💬' }
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsProfileMenuOpen(false);
  };

  const toggleExpand = (id: number) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    // se traslada el fondo del Dashboard
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-blue-50 relative">
      {/* Navbar */}
      <div className="bg-white/90 backdrop-blur-lg border-b border-white/20 shadow-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
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
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-700 hover:text-blue-600 hover:bg-white/50 rounded-xl transition-all duration-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5-5V9.09c0-2.33-1.9-4.09-4.24-4.09S6.52 6.76 6.52 9.09V12l-5 5h5m8 0a3 3 0 01-6 0" />
                </svg>
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white font-bold">3</span>
                </span>
              </button>
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
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-white/30 py-2 z-50">
                    <div className="px-4 py-3 border-b border-white/20">
                      <p className="text-sm font-medium text-gray-900">{user?.name || 'Usuario Demo'}</p>
                      <p className="text-sm text-gray-500">{user?.email || 'demo@travelmate.com'}</p>
                    </div>
                    <div className="py-1">
                      <button onClick={() => { navigate('/profile'); setIsProfileMenuOpen(false); }} className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-blue-50/80 hover:text-blue-600 transition-all duration-300"> <span className="mr-3">👤</span> Ver Perfil </button>
                      <button onClick={() => { navigate('/settings'); setIsProfileMenuOpen(false); }} className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-blue-50/80 hover:text-blue-600 transition-all duration-300"> <span className="mr-3">⚙️</span> Configuración </button>
                      <button onClick={() => { navigate('/help'); setIsProfileMenuOpen(false); }} className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-blue-50/80 hover:text-blue-600 transition-all duration-300"> <span className="mr-3">❓</span> Ayuda </button>
                    </div>
                    <div className="border-t border-white/20 py-1">
                      <button onClick={handleLogout} className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50/80 transition-all duration-300"> <span className="mr-3">🚪</span> Cerrar Sesión </button>
                    </div>
                  </div>
                )}
              </div>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-gray-700 hover:text-blue-600 hover:bg-white/50 rounded-xl transition-all duration-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-white/90 backdrop-blur-md border-t border-white/20">
            <div className="px-4 py-4 space-y-2">
              {navigationItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => { navigate(item.path); setIsMenuOpen(false); }}
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
      {(isMenuOpen || isProfileMenuOpen) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => { setIsMenuOpen(false); setIsProfileMenuOpen(false); }}
        />
      )}

      {/* ---  se trasladan efectos de fondo del Dashboard --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Orbes luminosos */}
        <div className="absolute top-20 -right-32 w-96 h-96 bg-gradient-to-br from-blue-400/30 to-indigo-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-80 -left-32 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-blue-400/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-gradient-to-br from-indigo-400/25 to-cyan-400/20 rounded-full blur-3xl"></div>
        
        {/* Puntos sutiles */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full" style={{
            backgroundImage: `radial-gradient(circle, #60A5FA 1px, transparent 1px)`,
            backgroundSize: '30px 30px'
          }}></div>
        </div>
        
        {/* Overlay gradiente */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-blue-50/50 pointer-events-none"></div>
      </div>
      {/* --- Fin de los efectos de fondo --- */}


      {/* Contenido de la página Destinations */}
      {/* El padding se mantiene aquí para el contenid */}
      <div className="relative z-10 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            {/* Los elementos internos como este header de la página Destinations siguen usando sus fondos blancos/claros para contrastar */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-blue-100/50 p-6">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent text-center mb-4">
                🌍 Destinos Turísticos Populares
              </h2>
              <p className="text-gray-600 text-center mb-6">
                Descubre lugares increíbles para tu próxima aventura
              </p>
              <div className="max-w-md mx-auto">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Buscar destinos..."
                    className="w-full px-4 py-3 pl-12 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/90"
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400">
                    🔍
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Grid de destinos */}
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {destinosDemo.map((destino) => (
              <div
                key={destino.id}
                // Para el contraste 
                className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-blue-100/50 overflow-hidden hover:shadow-2xl transition-all duration-300 group hover:scale-105"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={destino.image}
                    alt={destino.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/400x300/3B82F6/ffffff?text=' + destino.name;
                    }}
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                    <span className="text-sm font-medium text-blue-600">{destino.country}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {destino.name}
                  </h3>
                  <p className="text-gray-600 italic mb-4 leading-relaxed">
                    {destino.description}
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-blue-50 rounded-lg p-2">
                        <div className="text-xs text-blue-600 font-medium">Población</div>
                        <div className="text-gray-700">{destino.population}</div>
                      </div>
                      <div className="bg-green-50 rounded-lg p-2">
                        <div className="text-xs text-green-600 font-medium">Idioma</div>
                        <div className="text-gray-700">{destino.language}</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-amber-50 rounded-lg p-2">
                        <div className="text-xs text-amber-600 font-medium">Moneda</div>
                        <div className="text-gray-700">{destino.currency}</div>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-2">
                        <div className="text-xs text-purple-600 font-medium">Mejor época</div>
                        <div className="text-gray-700">{destino.bestTime}</div>
                      </div>
                    </div>
                    <div className="bg-indigo-50 rounded-lg p-3 mt-3">
                      <div className="text-xs text-indigo-600 font-medium mb-1">Presupuesto estimado</div>
                      <div className="text-gray-700 text-sm font-bold">{destino.budget}</div>
                    </div>
                  </div>
                  <div className="flex space-x-2 mt-4">
                    <button
                      onClick={() => toggleExpand(destino.id)}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-2 rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 shadow-md hover:shadow-lg font-medium"
                    >
                      {expandedCard === destino.id ? 'Ocultar detalles' : 'Ver detalles'}
                    </button>
                    <button className="px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors font-medium">
                      Planificar
                    </button>
                  </div>
                  {expandedCard === destino.id && (
                    <div className="mt-4 p-4 bg-gradient-to-r from-blue-50/80 to-indigo-50/80 rounded-xl border border-blue-200/50 backdrop-blur-sm">
                      <div className="mb-4">
                        <h4 className="text-sm font-bold text-blue-700 mb-2">🎯 Atracciones principales</h4>
                        <div className="grid grid-cols-2 gap-1 text-xs">
                          {destino.attractions.map((attraction, index) => (
                            <div key={index} className="bg-white/70 rounded px-2 py-1 text-gray-700">
                              • {attraction}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="mb-4">
                        <h4 className="text-sm font-bold text-green-700 mb-2">💡 Tip de viajero</h4>
                        <p className="text-xs text-gray-700 bg-white/70 rounded p-2">
                          {destino.tips}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-purple-700 mb-2">📸 Galería</h4>
                        <div className="grid grid-cols-3 gap-2">
                          {destino.gallery.map((img, index) => (
                            <img
                              key={index}
                              src={img}
                              alt={`${destino.name} ${index + 1}`}
                              className="w-full h-16 object-cover rounded-lg hover:scale-105 transition-transform duration-200 cursor-pointer"
                            />
                          ))}
                        </div>
                      </div>
                      <div className="mt-4 pt-3 border-t border-blue-200/50">
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <span className="text-blue-600 font-medium">Zona horaria:</span>
                            <span className="text-gray-700 ml-1">{destino.timezone}</span>
                          </div>
                          <div>
                            <span className="text-blue-600 font-medium">Clima:</span>
                            <span className="text-gray-700 ml-1">{destino.climate}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Destinations;
