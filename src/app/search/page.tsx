"use client";

import { useState } from 'react';
import Link from 'next/link';
import { GeocodingService, GeocodingResult } from '@/lib/geolocation';
import { WeatherAPI, WeatherResponse } from '@/lib/weather-api';
import CurrentWeather from '@/components/weather/CurrentWeather';
import HourlyWeather from '@/components/weather/HourlyWeather';
import DailyWeather from '@/components/weather/DailyWeather';
import CitySearch from '@/components/CitySearch';

export default function SearchPage() {
  const [location, setLocation] = useState<Partial<GeocodingResult> | null>(null);
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLocationSelect = async (selectedLocation: { latitude: number; longitude: number; name: string; country?: string; admin1?: string }) => {
    setLoading(true);
    setError(null);
    try {
      // Set the location info with the provided data
      setLocation({
        name: selectedLocation.name,
        latitude: selectedLocation.latitude,
        longitude: selectedLocation.longitude,
        country: selectedLocation.country || '',
        admin1: selectedLocation.admin1 || ''
      });

      // Get weather data for the selected location
      const weatherData = await WeatherAPI.getCurrentWeatherAndForecast(
        selectedLocation.latitude, 
        selectedLocation.longitude
      );
      setWeather(weatherData);
    } catch (err: any) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Title */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Iskanje vremena</h1>
        <p className="text-gray-600">Pregled vremenskih podatkov za poljubno lokacijo</p>
      </div>

      {/* Search Section - Now at the top */}
      <div className="mb-8">
        <CitySearch onLocationSelect={handleLocationSelect} />
      </div>

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
        <div className="space-y-6">
          <CurrentWeather weather={weather} location={location} />
          <HourlyWeather weather={weather} />
          <DailyWeather weather={weather} />
        </div>
      )}

      {/* Instructions when no search results */}
      {!weather && !loading && !error && (
        <div className="text-center py-12">
          <div className="text-lg text-gray-600 mb-4">
            Poiščite vreme za poljubno mesto
          </div>
          <p className="text-gray-500">
            Vnesite ime mesta v iskalno polje zgoraj za prikaz vremenskih podatkov
          </p>
        </div>
      )}
    </div>
  );
}
