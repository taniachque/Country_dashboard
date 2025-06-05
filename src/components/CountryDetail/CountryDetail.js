import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCountryByCode } from '../../controllers/countryController';
import './CountryDetail.css';

const CountryDetail = () => {
  const { countryCode } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountryDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getCountryByCode(countryCode);
        setCountry(data);
      } catch (err) {
        setError('Failed to fetch country details. Please try again later.');
        console.error('Error fetching country details:', err);
      } finally {
        setLoading(false);
      }
    };

    if (countryCode) {
      fetchCountryDetails();
    }
  }, [countryCode]);

  const getFlagUrl = (cca2) => {
    return `https://flagsapi.com/${cca2}/flat/64.png`;
  };

  if (loading) {
    return <div className="country-detail-container">Loading country details...</div>;
  }

  if (error) {
    return <div className="country-detail-container error-message">{error}</div>;
  }

  if (!country) {
    return <div className="country-detail-container no-results-message">Country not found.</div>;
  }

  const formatPopulation = (population) => {
    return new Intl.NumberFormat().format(population);
  };

  const getCurrencies = (currencies) => {
    if (!currencies) return 'N/A';
    return Object.values(currencies).map(curr => curr.name).join(', ');
  };

  const getLanguages = (languages) => {
    if (!languages) return 'N/A';
    return Object.values(languages).join(', ');
  };

  return (
    <div className="country-detail-container">
      <button onClick={() => navigate(-1)} className="back-button">← Back</button>
      <div className="detail-card">
        <img src={getFlagUrl(country.cca2)} alt={`Flag of ${country.name.common}`} className="detail-flag" />
        <div className="detail-info">
          <h2>{country.name.common}</h2>
          <p><strong>Official Name:</strong> {country.name.official}</p>
          <p><strong>Region:</strong> {country.region}</p>
          <p><strong>Subregion:</strong> {country.subregion || 'N/A'}</p>
          <p><strong>Capital:</strong> {country.capital ? country.capital.join(', ') : 'N/A'}</p>
          <p><strong>Population:</strong> {formatPopulation(country.population)}</p>
          <p><strong>Currencies:</strong> {getCurrencies(country.currencies)}</p>
          <p><strong>Languages:</strong> {getLanguages(country.languages)}</p>
          <p><strong>Area:</strong> {formatPopulation(country.area)} km²</p>
          {country.borders && country.borders.length > 0 && (
            <p>
              <strong>Border Countries:</strong> {country.borders.join(', ')}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CountryDetail;