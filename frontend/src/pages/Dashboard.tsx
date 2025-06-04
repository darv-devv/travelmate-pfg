// pages/Dashboard.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../features/auth/AuthContext';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

  // Actualizar hora cada minuto
  React.useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Datos de ejemplo - en una app real vendrían de la API
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
      image: 'https://via.placeholder.com/300x200/f59e0b/ffffff?text=Tokio'
    }
  ];

  const quickActions = [
    {
      title: 'Planificar Viaje',
      description: 'Crea un nuevo itinerario',
      icon: 'plus',
      color: 'from-amber-500 to-orange-500',
      action: () => navigate('/explorar')
    },
    {
      title: 'Explorar Destinos',
      description: 'Descubre nuevos lugares',
      icon: 'compass',
      color: 'from-blue-500 to-purple-500',
      action: () => navigate('/explorar')
    },
    {
      title: 'Mis Viajes',
      description: 'Ver historial completo',
      icon: 'map',
      color: 'from-green-500 to-teal-500',
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
      completed: 'bg-green-100 text-green-700 border-green-200',
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-blue-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Premium con saludo personalizado */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-white via-amber-50 to-white rounded-2xl shadow-lg border border-amber-100 p-6 backdrop-blur-sm">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div className="flex items-center space-x-4 mb-4 md:mb-0">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-400 via-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg border-2 border-white">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold">
                    <span className="text-gray-700">Bienvenido de vuelta, </span>
                    <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                      {user?.name || 'Explorador'}
                    </span>
                  </h1>
                  <p className="text-gray-600 mt-1">
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
                  onClick={() => navigate('/explorar')}
                  className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-md hover:shadow-lg text-sm font-medium"
                >
                  Explorar
                </button>
                <button 
                  onClick={() => navigate('/perfil')}
                  className="px-4 py-2 bg-white text-amber-600 rounded-xl hover:bg-amber-50 transition-all duration-300 shadow-md border border-amber-200 text-sm font-medium"
                >
                  Mi Perfil
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Estadísticas con estilo premium */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          {[
            { label: 'Total Viajes', value: stats.totalTrips, icon: '✈️', gradient: 'from-amber-500 to-orange-500' },
            { label: 'Planificados', value: stats.plannedTrips, icon: '📅', gradient: 'from-blue-500 to-purple-500' },
            { label: 'Completados', value: stats.completedTrips, icon: '✅', gradient: 'from-green-500 to-teal-500' },
            { label: 'Países Visitados', value: stats.countriesVisited, icon: '🌍', gradient: 'from-purple-500 to-pink-500' }
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-4 md:p-6 shadow-lg border border-amber-100 hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 bg-gradient-to-r ${stat.gradient} rounded-xl flex items-center justify-center text-lg group-hover:scale-110 transition-transform duration-300`}>
                  {stat.icon}
                </div>
                <div className="text-right">
                  <div className={`text-2xl md:text-3xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                    {stat.value}
                  </div>
                </div>
              </div>
              <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Panel principal - Viajes recientes */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-amber-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Viajes Recientes</h2>
                <button 
                  onClick={() => navigate('/trips')}
                  className="text-amber-600 hover:text-orange-600 text-sm font-medium transition-colors"
                >
                  Ver todos →
                </button>
              </div>
              
              <div className="space-y-4">
                {recentTrips.map((trip) => {
                  const statusBadge = getStatusBadge(trip.status);
                  return (
                    <div key={trip.id} className="flex items-center space-x-4 p-4 bg-gradient-to-r from-gray-50 to-amber-50 rounded-xl hover:from-amber-50 hover:to-orange-50 transition-all duration-300 group cursor-pointer">
                      <div className="w-16 h-16 rounded-xl overflow-hidden shadow-md group-hover:shadow-lg transition-shadow duration-300">
                        <img
                          src={trip.image}
                          alt={trip.destination}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          onError={(e) => {
                            e.currentTarget.src = 'https://via.placeholder.com/64x64/f59e0b/ffffff?text=📍';
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 group-hover:text-amber-700 transition-colors">
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

          {/* Sidebar - Acciones rápidas */}
          <div className="space-y-6">
            
            {/* Acciones rápidas con estilo premium */}
            <div className="bg-white rounded-2xl shadow-lg border border-amber-100 p-6">
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

            {/* Widget del clima (opcional) */}
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white">
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
            <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl shadow-lg p-6 text-white">
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
      </div>
    </div>
  );
};

export default Dashboard;