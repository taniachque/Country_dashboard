import React from 'react';
import './CountryCard.css';

const CountryCard = ({ country }) => {
  const getFlagUrl = (countryCode) => {
    return `https://flagsapi.com/${countryCode}/flat/64.png`;
  };

  return (
    <div className="country-card">
      <img
        src={getFlagUrl(country.cca2)}
        alt={`Flag of ${country.name.common}`}
        className="country-card__flag"
        loading="lazy"
      />
      <div className="country-card__content">
        <h3 className="country-card__name">{country.name.common}</h3>
        <h3 className="country-card__arrow">→</h3>
      </div>
    </div>
  );
};

export default CountryCard;