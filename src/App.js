import React, { useState, useEffect } from 'react';
import { getAllCountries } from './controllers/countryController';
import CountryCard from './components/CountryCard/CountryCard';
import './App.css';

function App() {
  const[countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const[error, setError] = useState(null);

  useEffect(() => {
    const fetchInitialCountries = async () =>{
      try {
        const data = await getAllCountries();
        setCountries(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch countries. Please try again later.');
        setLoading(false);
      }
    };

    fetchInitialCountries();
  }, []);

  if (loading) {
    return <div className='app-container'>Loading countries...</div>
  }

  if (error) {
    return <div className='app-container error-message'>{error}</div>
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Country dashboard</h1>
      </header>
      <main className='country-list-container'>
        {countries.map((country) => (
          <CountryCard key={country.cca3} country={country} />
        ))}

      </main>
    </div>
  );
}

export default App;
