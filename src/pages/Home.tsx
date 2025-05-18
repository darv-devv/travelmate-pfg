import { Link } from 'react-router-dom';



const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-lg p-10 max-w-md w-full text-center">
        <div className="flex justify-center mb-4">
          <img src="/favicon-32x32.png" alt="Logo" className="w-20" />
        </div>

        <h1 className="text-4xl font-extrabold text-blue-700 mb-3">
          Bienvenido a TravelMate
        </h1>
        <p className="text-gray-600 mb-6">
          Planifica tus viajes, descubre nuevos destinos y conecta con otros viajeros.
        </p>

        <div className="text-gray-600 mb-6">

        <div className="flex flex-col space-y-3">
          <Link
            to="/login"
            className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
          >
            Iniciar Sesión
          </Link>
          <Link
            to="/register"
            className="w-full px-4 py-2 border border-blue-600 text-blue-600 font-semibold rounded hover:bg-blue-50 transition"
          >
            Registrarse
          </Link>
        </div>
        </div>
        
      </div>
    </div>
  );
};

export default Home;