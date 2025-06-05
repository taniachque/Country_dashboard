import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { getAllCountries, getCountriesByName, getCountriesByRegion } from './controllers/countryController';
import CountryCard from './components/CountryCard/CountryCard';
import SearchBar from './components/SearchBar/SearchBar';
import RegionFilter from './components/RegionFilter/RegionFilter';
import Pagination from './components/Pagination/Pagination';
import CountryDetail from './components/CountryDetail/CountryDetail';
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage] = useState(12);

  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true);
      setError(null);
      setCurrentPage(1);

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

  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = countries.slice(indexOfFirstCountry, indexOfLastCountry);

  const totalPages = Math.ceil(countries.length / countriesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <BrowserRouter>
      <div className="app-container">
        <header className="app-header">
          <h1>Country Dashboard</h1>
        </header>

        <Routes>
          <Route path="/" element={
            <>
              <div className="filters-container">
                <SearchBar onSearch={handleSearch} />
                <RegionFilter onSelectRegion={handleSelectRegion} currentRegion={selectedRegion} />
              </div>
              <main className="country-list-container">
                {loading ? (
                  <div>Loading countries...</div>
                ) : error && countries.length === 0 ? (
                  <div className="error-message">{error}</div>
                ) : currentCountries.length > 0 ? (
                  currentCountries.map((country) => (
                    <CountryCard key={country.cca3} country={country} />
                  ))
                ) : (
                  <p className="no-results-message">{error || "No countries to display."}</p>
                )}
              </main>
              {countries.length > countriesPerPage && (
                <Pagination
                  countriesPerPage={countriesPerPage}
                  totalCountries={countries.length}
                  paginate={paginate}
                  currentPage={currentPage}
                  totalPages={totalPages}
                />
              )}
            </>
          } />
          <Route path="/country/:countryCode" element={<CountryDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;