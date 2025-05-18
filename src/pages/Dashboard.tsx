import React, { useState } from 'react';
import Navbar from '../components/navbar';


const Dashboard: React.FC = () => {

  const countries = [
    { geonameId: 1, countryName: 'España' },
    { geonameId: 2, countryName: 'México' },
    { geonameId: 3, countryName: 'Argentina' },
  ];

  return (
    

    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 text-gray-800 font-sans">
      {/* Navbar */}
      <Navbar />
      
 
      {/* Contenedor principal */}
      <div className="max-w-7xl mx-auto flex gap-6 p-6">
        
        {/* Feed principal */}
        <main className="flex-1 max-w-4xl space-y-8">

          {/* Buscador */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <input
              type="text"
              placeholder="Buscar destinos, grupos o experiencias..."
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </section>

          {/* Publicar Review/Foto */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-3">Publicar una experiencia</h2>
            <textarea
              rows={4}
              placeholder="Escribe tu review o comparte una foto de tu viaje..."
              className="w-full border border-gray-300 rounded p-3 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <div className="flex justify-between items-center mt-3">
              <input type="file" accept="image/*" className="text-sm text-gray-500" />
              <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition">
                Publicar
              </button>
            </div>
          </section>

          {/* Lista de países / Inspiración */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">¡Es hora de explorar!</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {countries.map(country => (
                <li key={country.geonameId}>{country.countryName}</li>
              ))}
            </ul>
          </section>
        </main>

        {/* Sugerencias */}
        <aside className="w-72 bg-white rounded-lg shadow-md p-5 sticky top-16 h-[calc(100vh-80px)] overflow-auto">
          <h2 className="text-xl font-bold mb-4 border-b pb-2">Sugerencias para ti</h2>
          <ul className="space-y-4 text-gray-700">
            <li className="flex items-center gap-3 hover:bg-indigo-50 rounded px-3 py-2 cursor-pointer transition">
              <span className="bg-indigo-200 text-indigo-700 rounded-full p-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM12 14v7" />
                </svg>
              </span>
              <span>Conectar con grupos de viajeros</span>
            </li>
            <li className="flex items-center gap-3 hover:bg-indigo-50 rounded px-3 py-2 cursor-pointer transition">
              <span className="bg-indigo-200 text-indigo-700 rounded-full p-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
                </svg>
              </span>
              <span>Compartir intereses y experiencias</span>
            </li>
            <li className="flex items-center gap-3 hover:bg-indigo-50 rounded px-3 py-2 cursor-pointer transition">
              <span className="bg-indigo-200 text-indigo-700 rounded-full p-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 17l4-4 4 4m0-4v6a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-6" />
                </svg>
              </span>
              <span>Buscar destinos según tus gustos</span>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  );
};


export default Dashboard;