import React, { useState, useEffect } from 'react';
import { getAllCountries, getCountriesByName, getCountriesByRegion } from './controllers/countryController';
import CountryCard from './components/CountryCard/CountryCard';
import SearchBar from './components/SearchBar/SearchBar';
import RegionFilter from './components/RegionFilter/RegionFilter';
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');

  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true);
      setError(null);

      try {
        let data;
        if (searchTerm) {
          data = await getCountriesByName(searchTerm);
        } else if (selectedRegion) {
          data = await getCountriesByRegion(selectedRegion);
        } else {
          data = await getAllCountries();
        }
        setCountries(data);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setCountries([]);
          setError('No countries found matching your criteria.');
        } else {
          setError('Failed to fetch countries. Please try again later.');
          console.error('Error fetching countries:', err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, [searchTerm, selectedRegion]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    setSelectedRegion('');
  };

  const handleSelectRegion = (region) => {
    setSelectedRegion(region);
    setSearchTerm('');
  };

  if (loading) {
    return <div className="app-container">Loading countries...</div>;
  }

  if (error && countries.length === 0) {
    return <div className="app-container error-message">{error}</div>;
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Country Dashboard</h1>
        <div className="filters-container">
          <SearchBar onSearch={handleSearch} />
          <RegionFilter onSelectRegion={handleSelectRegion} currentRegion={selectedRegion} />
        </div>
      </header>
      <main className="country-list-container">
        {countries.length > 0 ? (
          countries.map((country) => (
            <CountryCard key={country.cca3} country={country} />
          ))
        ) : (
          !loading && <p className="no-results-message">{error || "No countries to display."}</p>
        )}
      </main>
    </div>
  );
}

export default App;