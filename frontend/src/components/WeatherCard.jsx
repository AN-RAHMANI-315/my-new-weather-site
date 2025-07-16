import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Cloud, 
  Droplets, 
  Wind, 
  Eye, 
  Thermometer, 
  Gauge,
  Sun,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudDrizzle
} from 'lucide-react';

const WeatherCard = ({ weatherData, loading, error }) => {
  if (loading) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="p-6">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-4 h-4 bg-primary rounded-full animate-pulse"></div>
            <div className="w-4 h-4 bg-primary rounded-full animate-pulse delay-100"></div>
            <div className="w-4 h-4 bg-primary rounded-full animate-pulse delay-200"></div>
          </div>
          <p className="text-center mt-2 text-muted-foreground">Getting weather data...</p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full max-w-md mx-auto border-destructive">
        <CardContent className="p-6">
          <div className="text-center">
            <Cloud className="w-12 h-12 mx-auto mb-2 text-destructive" />
            <p className="text-destructive font-medium">Weather data unavailable</p>
            <p className="text-sm text-muted-foreground mt-1">{error}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!weatherData) {
    return null;
  }

  const getWeatherIcon = (condition) => {
    switch (condition?.toLowerCase()) {
      case 'clear':
        return <Sun className="w-16 h-16 text-yellow-500" />;
      case 'rain':
        return <CloudRain className="w-16 h-16 text-blue-500" />;
      case 'drizzle':
        return <CloudDrizzle className="w-16 h-16 text-blue-400" />;
      case 'thunderstorm':
        return <CloudLightning className="w-16 h-16 text-purple-500" />;
      case 'snow':
        return <CloudSnow className="w-16 h-16 text-gray-300" />;
      default:
        return <Cloud className="w-16 h-16 text-gray-500" />;
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="text-center text-xl font-light">
          {weatherData.location}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        {/* Main weather display */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            {getWeatherIcon(weatherData.condition)}
          </div>
          <div className="text-4xl font-light mb-2">
            {Math.round(weatherData.temperature)}°C
          </div>
          <Badge variant="secondary" className="mb-2">
            {weatherData.condition}
          </Badge>
          <p className="text-sm text-muted-foreground">
            Feels like {Math.round(weatherData.feelsLike)}°C
          </p>
        </div>

        {/* Weather details grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Droplets className="w-5 h-5 text-blue-500" />
            <div>
              <p className="text-sm font-medium">Humidity</p>
              <p className="text-sm text-muted-foreground">{weatherData.humidity}%</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Wind className="w-5 h-5 text-green-500" />
            <div>
              <p className="text-sm font-medium">Wind</p>
              <p className="text-sm text-muted-foreground">{weatherData.windSpeed} m/s</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Gauge className="w-5 h-5 text-orange-500" />
            <div>
              <p className="text-sm font-medium">Pressure</p>
              <p className="text-sm text-muted-foreground">{weatherData.pressure} hPa</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Eye className="w-5 h-5 text-purple-500" />
            <div>
              <p className="text-sm font-medium">Visibility</p>
              <p className="text-sm text-muted-foreground">{weatherData.visibility} km</p>
            </div>
          </div>
        </div>

        {/* Additional info */}
        <div className="mt-6 pt-4 border-t">
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">UV Index</span>
            <Badge variant={weatherData.uvIndex > 7 ? 'destructive' : weatherData.uvIndex > 3 ? 'default' : 'secondary'}>
              {weatherData.uvIndex}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;