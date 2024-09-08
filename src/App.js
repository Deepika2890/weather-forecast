import React, { useState } from 'react';
import { CiSearch } from "react-icons/ci";
import './App.css'
import axios from 'axios';

const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const apiKey = 'ae55d65cc46bd7d4bb624c58d16547e4';

  const handleSearch = async () => {
    if (!city) {
      setError('Please enter a city name.');
      return;
    }
    
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );
      setWeather(response.data);
      setError('');
      setCity('')

    } catch (err) {
      setError('City not found. Please try again.');
      setWeather(null);
    }
  };

  return (
    <div className="app">
      <h1 className='main-heading'>Weather Forecast</h1>
      <div className="search-bar">
        <input 
          type="text" 
          className='user-input'
          value={city} 
          onChange={(e) => setCity(e.target.value)} 
          placeholder="Enter city name" 
        />
      <button className='button' onClick={handleSearch}><CiSearch/></button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {weather && (
        <div className="weather-info">
          <h2 className='heading'>Weather in {weather.name}</h2>
          <p className='weather'>Temperature: {weather.main.temp}°C</p>
          <p className='weather'>Weather: {weather.weather[0].description}</p>
          <p className='weather'>Humidity: {weather.main.humidity}%</p>
          <p className='weather'>Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default App;
