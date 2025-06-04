// pages/Trips.tsx
import React, { useState } from 'react';

interface Trip {
  id: string;
  destination: string;
  startDate: string;
  endDate: string;
  status: 'planned' | 'ongoing' | 'completed';
  image: string;
  description: string;
}

const Trips: React.FC = () => {
  // Datos de ejemplo - reemplazar con datos reales de tu API/contexto
  const [trips] = useState<Trip[]>([
    {
      id: '1',
      destination: 'París, Francia',
      startDate: '2024-07-15',
      endDate: '2024-07-22',
      status: 'completed',
      image: '/vertical-shot-beautiful-eiffel-tower-captured-paris-france.jpg',
      description: 'Una semana increíble explorando la ciudad del amor'
    },
    {
      id: '2',
      destination: 'Nueva York, EE.UU.',
      startDate: '2024-09-10',
      endDate: '2024-09-17',
      status: 'ongoing',
      image: '/high-angle-shot-city-buildings-new-york-manhattan.jpg',
      description: 'Aventura urbana en la Gran Manzana'
    },
    {
      id: '3',
      destination: 'Tokio, Japón',
      startDate: '2024-12-20',
      endDate: '2025-01-05',
      status: 'planned',
      image: '/tokyo-placeholder.jpg',
      description: 'Experiencia cultural en el país del sol naciente'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'ongoing':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'planned':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completado';
      case 'ongoing':
        return 'En curso';
      case 'planned':
        return 'Planificado';
      default:
        return 'Desconocido';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                Mis Viajes
              </h1>
              <p className="text-gray-600 mt-2">
                Gestiona y revive tus aventuras de viaje
              </p>
            </div>
            <button className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl font-medium flex items-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Nuevo Viaje</span>
            </button>
          </div>
        </div>

        {/* Estadísticas rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border border-amber-100">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-500 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">
                  {trips.filter(trip => trip.status === 'completed').length}
                </p>
                <p className="text-gray-600">Viajes Completados</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border border-amber-100">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">
                  {trips.filter(trip => trip.status === 'ongoing').length}
                </p>
                <p className="text-gray-600">En Curso</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border border-amber-100">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">
                  {trips.filter(trip => trip.status === 'planned').length}
                </p>
                <p className="text-gray-600">Planificados</p>
              </div>
            </div>
          </div>
        </div>

        {/* Lista de viajes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.map((trip) => (
            <div key={trip.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-amber-100">
              <div className="relative h-48">
                <img
                  src={trip.image}
                  alt={trip.destination}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/400x200/f59e0b/ffffff?text=Destino';
                  }}
                />
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(trip.status)}`}>
                    {getStatusText(trip.status)}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {trip.destination}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {trip.description}
                </p>
                
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>
                    {new Date(trip.startDate).toLocaleDateString('es-ES')} - {new Date(trip.endDate).toLocaleDateString('es-ES')}
                  </span>
                </div>
                
                <div className="flex space-x-3">
                  <button className="flex-1 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-300 text-sm font-medium">
                    Ver Detalles
                  </button>
                  <button className="px-4 py-2 border border-amber-300 text-amber-600 rounded-lg hover:bg-amber-50 transition-all duration-300 text-sm font-medium">
                    Editar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Estado vacío si no hay viajes */}
        {trips.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              ¡Comienza tu aventura!
            </h3>
            <p className="text-gray-600 mb-6">
              Aún no tienes viajes registrados. Crea tu primer viaje y comienza a planificar.
            </p>
            <button className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-lg font-medium">
              Planificar Mi Primer Viaje
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Trips;