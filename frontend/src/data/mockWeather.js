// Mock weather data for development
export const mockWeatherData = {
  location: 'Berlin, Germany',
  temperature: 18.5,
  feelsLike: 19.2,
  condition: 'Clear',
  humidity: 65,
  windSpeed: 3.2,
  pressure: 1013,
  visibility: 10,
  uvIndex: 4
};

export const mockWeatherVariations = [
  {
    location: 'London, UK',
    temperature: 15.3,
    feelsLike: 14.8,
    condition: 'Rain',
    humidity: 82,
    windSpeed: 4.1,
    pressure: 1008,
    visibility: 8,
    uvIndex: 1
  },
  {
    location: 'New York, USA',
    temperature: 22.1,
    feelsLike: 24.3,
    condition: 'Clear',
    humidity: 58,
    windSpeed: 2.8,
    pressure: 1015,
    visibility: 12,
    uvIndex: 6
  },
  {
    location: 'Tokyo, Japan',
    temperature: 26.7,
    feelsLike: 28.1,
    condition: 'Thunderstorm',
    humidity: 78,
    windSpeed: 1.5,
    pressure: 1004,
    visibility: 6,
    uvIndex: 3
  },
  {
    location: 'Sydney, Australia',
    temperature: 19.8,
    feelsLike: 20.5,
    condition: 'Drizzle',
    humidity: 71,
    windSpeed: 5.2,
    pressure: 1011,
    visibility: 9,
    uvIndex: 2
  }
];

// Simulate API delay
export const simulateApiDelay = (ms = 1500) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Mock geolocation success
export const mockGeolocationSuccess = async () => {
  await simulateApiDelay();
  return {
    coords: {
      latitude: 52.5200,
      longitude: 13.4050
    }
  };
};

// Get random weather data
export const getRandomWeatherData = () => {
  const allData = [mockWeatherData, ...mockWeatherVariations];
  return allData[Math.floor(Math.random() * allData.length)];
};