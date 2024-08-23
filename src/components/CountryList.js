// src/components/CountryList.js
import React, { useState, useEffect, useCallback } from 'react';
import { fetchCountries } from '../services/api';
import CountryCard from './CountryCard';
import SearchBar from './SearchBar';
import LoadingScreen from './LoadingScreen';
import '../styles/CountryList.css';

const CountryList = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortCriteria, setSortCriteria] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  const loadCountries = useCallback(async () => {
    try {
      setLoading(true);
      const result = await fetchCountries();
      setCountries(result);
      setFilteredCountries(result);
      setError(null);
    } catch (err) {
      setError('An error occurred while fetching countries. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []);

  const sortCountries = useCallback((countriesToSort) => {
    return countriesToSort.sort((a, b) => {
      let valueA, valueB;
      
      switch (sortCriteria) {
        case 'name':
          valueA = a.name.common.toLowerCase();
          valueB = b.name.common.toLowerCase();
          break;
        case 'population':
          valueA = a.population;
          valueB = b.population;
          break;
        case 'area':
          valueA = a.area || 0;
          valueB = b.area || 0;
          break;
        default:
          return 0;
      }

      if (valueA < valueB) return sortOrder === 'asc' ? -1 : 1;
      if (valueA > valueB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }, [sortCriteria, sortOrder]);

  useEffect(() => {
    loadCountries();
  }, [loadCountries]);

  useEffect(() => {
    const filtered = countries.filter(country =>
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCountries(sortCountries(filtered));
  }, [countries, searchTerm, sortCountries]);

  const handleSort = (criteria) => {
    if (criteria === sortCriteria) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortCriteria(criteria);
      setSortOrder('asc');
    }
  };

  if (loading) return <LoadingScreen />;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="country-list-container">
      <h1>Explore Countries</h1>
      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <div className="sort-controls">
        <button onClick={() => handleSort('name')}>
          Sort by Name {sortCriteria === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
        </button>
        <button onClick={() => handleSort('population')}>
          Sort by Population {sortCriteria === 'population' && (sortOrder === 'asc' ? '↑' : '↓')}
        </button>
        <button onClick={() => handleSort('area')}>
          Sort by Area {sortCriteria === 'area' && (sortOrder === 'asc' ? '↑' : '↓')}
        </button>
      </div>
      <div className="country-list">
        {filteredCountries.map(country => (
          <CountryCard key={country.cca3} country={country} />
        ))}
      </div>
    </div>
  );
};

export default CountryList;