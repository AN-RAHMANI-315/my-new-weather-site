import React, { useState, useEffect } from 'react';
import './App.css';
import WeatherCard from './components/WeatherCard';
import LocationButton from './components/LocationButton';
import useGeolocation from './hooks/useGeolocation';
import { mockWeatherData, getRandomWeatherData, simulateApiDelay } from './data/mockWeather';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherError, setWeatherError] = useState(null);
  
  const { loading: locationLoading, error: locationError, position, requestLocation } = useGeolocation();

  // Simulate fetching weather data
  const fetchWeatherData = async (latitude, longitude) => {
    setWeatherLoading(true);
    setWeatherError(null);
    
    try {
      // Simulate API delay
      await simulateApiDelay(1500);
      
      // For now, use mock data regardless of coordinates
      // In production, this would make an API call with lat/lon
      const mockData = getRandomWeatherData();
      setWeatherData(mockData);
    } catch (error) {
      setWeatherError('Failed to fetch weather data');
    } finally {
      setWeatherLoading(false);
    }
  };

  // Effect to fetch weather when position changes
  useEffect(() => {
    if (position) {
      fetchWeatherData(position.coords.latitude, position.coords.longitude);
    }
  }, [position]);

  // Load default weather data on mount
  useEffect(() => {
    const loadDefaultWeather = async () => {
      setWeatherLoading(true);
      await simulateApiDelay(1000);
      setWeatherData(mockWeatherData);
      setWeatherLoading(false);
    };
    
    loadDefaultWeather();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-lg mx-auto pt-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-light text-gray-800 mb-2">Weather</h1>
          <p className="text-gray-600">Current conditions at your location</p>
        </div>
        
        <div className="text-center mb-8">
          <LocationButton
            onLocationRequest={requestLocation}
            loading={locationLoading}
            hasLocation={!!position}
          />
          {locationError && (
            <p className="text-sm text-red-600 mt-2">{locationError}</p>
          )}
        </div>

        <WeatherCard
          weatherData={weatherData}
          loading={weatherLoading}
          error={weatherError}
        />

        <div className="text-center mt-8">
          <p className="text-xs text-gray-500">
            Currently showing mock weather data
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;