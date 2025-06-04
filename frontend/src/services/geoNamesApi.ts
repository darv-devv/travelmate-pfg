// src/services/geoNamesApi.ts
interface GeoNamesCity {
  geonameId: number;
  name: string;
  countryName: string;
  countryCode: string;
  adminName1: string; // Estado/Provincia
  population: number;
  lat: string;
  lng: string;
  fcodeName: string; // Tipo de lugar
}

interface GeoNamesResponse {
  geonames: GeoNamesCity[];
}

interface Destination {
  id: string;
  name: string;
  country: string;
  description: string;
  imageUrl: string;
  latitude: number;
  longitude: number;
  category: string;
  population?: number;
}

// Configuración de GeoNames
const GEONAMES_USERNAME = 'tu_usuario_geonames'; // ¡CAMBIA ESTO!
const GEONAMES_BASE_URL = 'http://api.geonames.org';

class GeoNamesService {
  
  // Buscar ciudades por nombre
  async searchCities(query: string, maxRows: number = 10): Promise<GeoNamesCity[]> {
    try {
      const url = `${GEONAMES_BASE_URL}/searchJSON?q=${encodeURIComponent(query)}&maxRows=${maxRows}&username=${GEONAMES_USERNAME}&featureClass=P&orderby=population`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Error en la API de GeoNames');
      }
      
      const data: GeoNamesResponse = await response.json();
      
      // Filtrar solo ciudades principales
      return data.geonames.filter(city => 
        city.fcodeName.includes('capital') || 
        city.population > 100000 ||
        city.fcodeName.includes('city')
      );
      
    } catch (error) {
      console.error('Error buscando ciudades:', error);
      return [];
    }
  }

  // Obtener ciudades populares por país
  async getCitiesByCountry(countryCode: string, maxRows: number = 5): Promise<GeoNamesCity[]> {
    try {
      const url = `${GEONAMES_BASE_URL}/searchJSON?country=${countryCode}&maxRows=${maxRows}&username=${GEONAMES_USERNAME}&featureClass=P&orderby=population`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Error en la API de GeoNames');
      }
      
      const data: GeoNamesResponse = await response.json();
      return data.geonames;
      
    } catch (error) {
      console.error('Error obteniendo ciudades por país:', error);
      return [];
    }
  }

  // Convertir ciudad de GeoNames a formato Destination
  cityToDestination(city: GeoNamesCity): Destination {
    // Generar imagen placeholder o usar servicio de imágenes
    const imageUrl = `https://source.unsplash.com/800x600/?${encodeURIComponent(city.name)},${encodeURIComponent(city.countryName)},city`;
    
    return {
      id: city.geonameId.toString(),
      name: `${city.name}, ${city.countryName}`,
      country: city.countryName,
      description: `${city.name} es una ciudad en ${city.adminName1 || city.countryName} con una población de ${city.population?.toLocaleString() || 'datos no disponibles'} habitantes.`,
      imageUrl,
      latitude: parseFloat(city.lat),
      longitude: parseFloat(city.lng),
      category: city.fcodeName.toLowerCase().includes('capital') ? 'capital' : 'city',
      population: city.population
    };
  }

  // Obtener destinos populares (predefinidos + API)
  async getPopularDestinations(): Promise<Destination[]> {
    // Destinos hardcodeados para garantizar que siempre haya contenido
    const fallbackDestinations: Destination[] = [
      {
        id: 'paris-fr',
        name: 'París, Francia',
        country: 'Francia',
        description: 'La ciudad del amor y la luz, famosa por la Torre Eiffel, el Louvre y su increíble gastronomía.',
        imageUrl: '/vertical-shot-beautiful-eiffel-tower-captured-paris-france.jpg',
        latitude: 48.8566,
        longitude: 2.3522,
        category: 'capital',
        population: 2161000
      },
      {
        id: 'newyork-us',
        name: 'Nueva York, Estados Unidos',
        country: 'Estados Unidos',
        description: 'La ciudad que nunca duerme, centro financiero mundial con rascacielos icónicos.',
        imageUrl: '/high-angle-shot-city-buildings-new-york-manhattan.jpg',
        latitude: 40.7128,
        longitude: -74.0060,
        category: 'city',
        population: 8336817
      },
      {
        id: 'tokyo-jp',
        name: 'Tokio, Japón',
        country: 'Japón',
        description: 'Metrópolis moderna que combina perfectamente tradición japonesa con tecnología de vanguardia.',
        imageUrl: 'https://source.unsplash.com/800x600/?tokyo,japan,city',
        latitude: 35.6762,
        longitude: 139.6503,
        category: 'capital',
        population: 13960000
      },
      {
        id: 'barcelona-es',
        name: 'Barcelona, España',
        country: 'España',
        description: 'Ciudad mediterránea rica en arte, arquitectura de Gaudí y vida nocturna vibrante.',
        imageUrl: 'https://source.unsplash.com/800x600/?barcelona,spain,sagrada',
        latitude: 41.3851,
        longitude: 2.1734,
        category: 'city',
        population: 1620343
      }
    ];

    try {
      // Intentar obtener más destinos de la API
      const popularSearches = ['london', 'rome', 'berlin', 'amsterdam'];
      const apiDestinations: Destination[] = [];

      for (const search of popularSearches) {
        const cities = await this.searchCities(search, 1);
        if (cities.length > 0) {
          apiDestinations.push(this.cityToDestination(cities[0]));
        }
      }

      // Combinar destinos fallback con los de la API
      return [...fallbackDestinations, ...apiDestinations];
      
    } catch (error) {
      console.error('Error obteniendo destinos populares:', error);
      // Si falla la API, devolver solo los destinos fallback
      return fallbackDestinations;
    }
  }
}

// Instancia singleton
const geoNamesService = new GeoNamesService();
export default geoNamesService;

// Exports individuales para facilitar el uso
export const searchCities = (query: string, maxRows?: number) => 
  geoNamesService.searchCities(query, maxRows);

export const getCitiesByCountry = (countryCode: string, maxRows?: number) => 
  geoNamesService.getCitiesByCountry(countryCode, maxRows);

export const getPopularDestinations = () => 
  geoNamesService.getPopularDestinations();