import axios from 'axios';

const BASE_URL = 'https://restcountries.com/v3.1';

const FIELDS_TO_FETCH = 'name,population,region,capital,currencies,languages,cca2,cca3';

export const getAllCountries = async () => {
    try{
        const response = await axios.get(`${BASE_URL}/all?fields=${FIELDS_TO_FETCH}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching all countries:`, error);
        throw error;
    }
}

export const getCountriesByName = async (name) => {
    try{
        const response = await axios.get(`${BASE_URL}/name/${name}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching countries by name ${name}:`, error);
        throw error;
    }
}

export const getCountriesByRegion = async (region) => {
    try{
        const response = await axios.get(`${BASE_URL}/region/${region}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching countries by region ${region}:`, error);
        throw error;
    }
}

export const getCountryByCode = async (code) => {
  try {
    const response = await axios.get(`${BASE_URL}/alpha/${code}`);
    return response.data[0];
  } catch (error) {
    console.error(`Error fetching country by code (${code}):`, error);
    throw error;
  }
};