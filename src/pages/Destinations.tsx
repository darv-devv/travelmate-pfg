import Navbar from '../components/navbar'; 

// Datos de ejemplo para los destinos turísticos hasta implementación de API GeoNames
const destinosDemo = [
  {
    id: 1,
    name: 'París',
    country: 'Francia',
    population: '2.1 millones',
    language: 'Francés',
    currency: 'Euro (€)',
    timezone: 'CET (UTC+1)',
    image: 'public/vertical-shot-beautiful-eiffel-tower-captured-paris-france.jpg',
    description: 'Capital europea. Famosa por ser cuna de la artes bohemias.',
    climate: 'Templado, con inviernos fríos y veranos cálidos.',
  },
  {
    id: 2,
    name: 'Tokio',
    country: 'Japón',
    population: '13.9 millones',
    language: 'Japonés',
    currency: 'Yen (¥)',
    timezone: 'JST (UTC+9)',
    image: 'public/aerial-view-tokyo-cityscape-with-fuji-mountain-japan.jpg',
    description: 'Una ciudad ultramoderna que combina una rica tradición cultural con las puntera tecnología.',
    climate: 'Húmedo subtropical, veranos calurosos e inviernos frescos.',
  },
  {
    id: 3,
    name: 'Nueva York',
    country: 'EE.UU.',
    population: '8.4 millones',
    language: 'Inglés',
    currency: 'Dólar ($)',
    timezone: 'EST (UTC-5)',
    image: 'public/high-angle-shot-city-buildings-new-york-manhattan.jpg',
    description: 'Conocida como la Gran Manzana, se convierte en un océano de cristaleras.',
    climate: 'Continental húmedo, con inviernos fríos y veranos calurosos.',
  },
];

const Destinations = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-8">
        <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
          Destinos Turísticos Populares
        </h2>

        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {destinosDemo.map((destino) => (
            <div
              key={destino.id}
              className="bg-white shadow-md rounded-lg overflow-hidden border border-blue-100"
            >
              <img
                src={destino.image}
                alt={destino.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-blue-600 mb-2">{destino.name}</h3>
                <p className="text-gray-600 italic mb-2">{destino.description}</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li><strong>País:</strong> {destino.country}</li>
                  <li><strong>Población:</strong> {destino.population}</li>
                  <li><strong>Idioma:</strong> {destino.language}</li>
                  <li><strong>Moneda:</strong> {destino.currency}</li>
                  <li><strong>Zona Horaria:</strong> {destino.timezone}</li>
                  <li><strong>Clima:</strong> {destino.climate}</li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Destinations;