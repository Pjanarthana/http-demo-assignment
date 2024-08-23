import React from 'react';
import '../styles/CountryCard.css';

const CountryCard = ({ country }) => {
  return (
    <div className="country-card">
      <div className="country-flag">
        <img src={country.flags.svg} alt={`Flag of ${country.name.common}`} />
      </div>
      <div className="country-info">
        <h2>{country.name.common}</h2>
        <p><strong>Capital:</strong> {country.capital?.[0] || 'N/A'}</p>
        <p><strong>Region:</strong> {country.region}</p>
        <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
        <p><strong>Area:</strong> {country.area ? `${country.area.toLocaleString()} km²` : 'N/A'}</p>
      </div>
    </div>
  );
};

export default CountryCard;