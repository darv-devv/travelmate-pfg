import axios from 'axios';

const GEO_NAMES_USERNAME = 'darvdevv'; // Reemplazar con usuario de GeoNames

// Instancia de Axios con la URL base
const geoNamesApi = axios.create({
  baseURL: 'http://api.geonames.org',
});

export const getCountries = async () => {
  try {
    const response = await geoNamesApi.get('/countryInfoJSON', {
      params: {
        formatted: true,
        lang: 'es',
        username: GEO_NAMES_USERNAME,
      },
    });
    return response.data.geonames; // Devuelve la lista de países
  } catch (error) {
    console.error('Error al obtener países:', error);
    throw error;
  }
};

export const getCities = async (countryCode: string) => {
  try {
    const response = await geoNamesApi.get('/searchJSON', {
      params: {
        country: countryCode,
        maxRows: 10,
        username: GEO_NAMES_USERNAME,
      },
    });
    return response.data.geonames; 
  } catch (error) {
    console.error('Error al obtener ciudades:', error);
    throw error;
  }
};