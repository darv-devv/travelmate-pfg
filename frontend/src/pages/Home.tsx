// pages/Home.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../features/auth/AuthContext';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/register');
    }
  };

  const handleExplore = () => {
    if (isAuthenticated) {
      navigate('/explorar');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative pt-16 pb-32 overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-amber-100/20 to-blue-100/20"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-amber-200/30 to-orange-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Logo Hero */}
            <div className="flex justify-center mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-amber-400 via-yellow-500 to-orange-500 rounded-3xl flex items-center justify-center shadow-2xl border-4 border-white backdrop-blur-sm">
                <svg className="w-14 h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>

            {/* Hero Title */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent">
                Travel
              </span>
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Mate
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Tu compañero perfecto para descubrir el mundo. 
              <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent font-semibold">
                {" "}Planifica, explora y comparte
              </span>
              {" "}tus aventuras como nunca antes.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <button
                onClick={handleGetStarted}
                className="px-8 py-4 bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 text-white text-lg font-semibold rounded-2xl hover:from-amber-600 hover:via-yellow-600 hover:to-orange-600 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 border border-amber-300"
              >
                {isAuthenticated ? 'Ir al Panel' : 'Comenzar Aventura'}
              </button>
              
              <button
                onClick={handleExplore}
                className="px-8 py-4 bg-white text-amber-600 text-lg font-semibold rounded-2xl hover:bg-amber-50 transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-amber-200 hover:border-amber-300"
              >
                Explorar Destinos
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-amber-100">
                <div className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-2">
                  10K+
                </div>
                <div className="text-gray-600 font-medium">Destinos Disponibles</div>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-amber-100">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  50K+
                </div>
                <div className="text-gray-600 font-medium">Viajeros Activos</div>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-amber-100">
                <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent mb-2">
                  100K+
                </div>
                <div className="text-gray-600 font-medium">Experiencias Compartidas</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-r from-white via-amber-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-4">
              ¿Por qué elegir TravelMate?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Descubre las funcionalidades que harán de tus viajes una experiencia inolvidable
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-amber-100 hover:border-amber-200 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 9m0 11V9m0 0L9 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Planificación Inteligente</h3>
              <p className="text-gray-600 leading-relaxed">
                Crea itinerarios personalizados con nuestra IA que se adapta a tus preferencias y presupuesto.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-amber-100 hover:border-amber-200 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Comunidad Global</h3>
              <p className="text-gray-600 leading-relaxed">
                Conecta con viajeros de todo el mundo, comparte experiencias y descubre lugares únicos.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-amber-100 hover:border-amber-200 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-teal-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Viajes Seguros</h3>
              <p className="text-gray-600 leading-relaxed">
                Información actualizada sobre seguridad, clima y recomendaciones locales en tiempo real.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Destinations Preview */}
      <section className="py-20 bg-gradient-to-b from-amber-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-4">
              Destinos Populares
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Descubre los lugares más increíbles del mundo con TravelMate
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: 'París, Francia',
                image: '/vertical-shot-beautiful-eiffel-tower-captured-paris-france.jpg',
                description: 'La ciudad del amor y la luz'
              },
              {
                name: 'Nueva York, EE.UU.',
                image: '/high-angle-shot-city-buildings-new-york-manhattan.jpg',
                description: 'La ciudad que nunca duerme'
              },
              {
                name: 'Tokio, Japón',
                image: 'https://via.placeholder.com/400x300/f59e0b/ffffff?text=Tokio',
                description: 'Tradición y modernidad en perfecta armonía'
              }
            ].map((destination, index) => (
              <div key={index} className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative h-64">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/400x300/f59e0b/ffffff?text=Destino';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-bold mb-2">{destination.name}</h3>
                    <p className="text-sm opacity-90">{destination.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            ¿Listo para tu próxima aventura?
          </h2>
          <p className="text-xl text-amber-100 mb-8 max-w-2xl mx-auto">
            Únete a miles de viajeros que ya están descubriendo el mundo con TravelMate
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={handleGetStarted}
              className="px-8 py-4 bg-white text-amber-600 text-lg font-semibold rounded-2xl hover:bg-amber-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              {isAuthenticated ? 'Ir al Panel' : 'Crear Cuenta Gratis'}
            </button>
            {!isAuthenticated && (
              <button
                onClick={() => navigate('/login')}
                className="px-8 py-4 border-2 border-white text-white text-lg font-semibold rounded-2xl hover:bg-white hover:text-amber-600 transition-all duration-300"
              >
                Iniciar Sesión
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <span className="text-xl font-bold">TravelMate</span>
            </div>
            <div className="text-gray-400 text-sm">
              © 2024 TravelMate. Proyecto Final DAW - Tu compañero de viajes.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;