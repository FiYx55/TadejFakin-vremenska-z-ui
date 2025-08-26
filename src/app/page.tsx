"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { GeolocationService, GeocodingService, GeocodingResult } from '@/lib/geolocation';
import { WeatherAPI, WeatherResponse } from '@/lib/weather-api';
import LocationInfo from '@/components/LocationInfo';
import CurrentWeather from '@/components/weather/CurrentWeather';
import HourlyWeather from '@/components/weather/HourlyWeather';
import DailyWeather from '@/components/weather/DailyWeather';

export default function Home() {
  const [location, setLocation] = useState<Partial<GeocodingResult> | null>(null);
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocationAndWeather = async () => {
      setLoading(true);
      setError(null);
      try {
        // 1. Get current position
        const position = await GeolocationService.getCurrentPosition();
        
        // 2. Get location name
        const locationData = await GeocodingService.reverseGeocode(position.latitude, position.longitude);
        setLocation(locationData);
        console.log('Location:', locationData);

        // 3. Get weather data
        if (position.latitude && position.longitude) {
          const weatherData = await WeatherAPI.getCurrentWeatherAndForecast(position.latitude, position.longitude);
          setWeather(weatherData);
          console.log('Weather data:', weatherData);
        }
      } catch (err: any) {
        setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLocationAndWeather();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <div className="text-xl text-gray-600">Nalagam vremenske podatke...</div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-center mb-8">
          Napaka: {error}
        </div>
      )}

      {/* Weather Data */}
      {weather && location && !loading && (
        <div className="mt-8 space-y-6">
          <CurrentWeather weather={weather} location={location} />
          <HourlyWeather weather={weather} />
          <DailyWeather weather={weather} />
        </div>
      )}

      {/* Link to Search Page */}
      <div className="mt-8 text-center">
        <div className="bg-white/50 backdrop-blur-sm rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Poiščite vreme za poljubno lokacijo
          </h2>
          <p className="text-gray-600 text-sm mb-4">
            Preverite vremenske razmere v kateremkoli mestu po svetu
          </p>
          <Link 
            href="/search"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors duration-200"
          >
            Odpri iskanje mest
          </Link>
        </div>
      </div>
    </div>
  );
}
