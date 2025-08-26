"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { GeolocationService, GeocodingService, GeocodingResult } from '@/lib/geolocation';
import { WeatherAPI, HistoricalWeatherResponse } from '@/lib/weather-api';
import WeatherHistory from '@/components/weather/WeatherHistory';
import CitySearch from '@/components/CitySearch';

export default function HistoryPage() {
  const [location, setLocation] = useState<Partial<GeocodingResult> | null>(null);
  const [weatherHistory, setWeatherHistory] = useState<HistoricalWeatherResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDays, setSelectedDays] = useState(14); // Default to 2 weeks

  // Load current location weather history on page load
  useEffect(() => {
    const fetchLocationAndHistory = async () => {
      setLoading(true);
      setError(null);
      try {
        // 1. Get current position
        const position = await GeolocationService.getCurrentPosition();
        
        // 2. Get location name
        const locationData = await GeocodingService.reverseGeocode(position.latitude, position.longitude);
        setLocation(locationData);

        // 3. Get weather history
        if (position.latitude && position.longitude) {
          const historyData = await WeatherAPI.getWeatherHistory(position.latitude, position.longitude, selectedDays);
          setWeatherHistory(historyData);
        }
      } catch (err: any) {
        setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLocationAndHistory();
  }, [selectedDays]);

  const handleLocationSelect = async (selectedLocation: { latitude: number; longitude: number; name: string; country?: string; admin1?: string }) => {
    setLoading(true);
    setError(null);
    try {
      // Set the location info
      setLocation({
        name: selectedLocation.name,
        latitude: selectedLocation.latitude,
        longitude: selectedLocation.longitude,
        country: selectedLocation.country || '',
        admin1: selectedLocation.admin1 || ''
      });

      // Get weather history for the selected location
      const historyData = await WeatherAPI.getWeatherHistory(
        selectedLocation.latitude, 
        selectedLocation.longitude, 
        selectedDays
      );
      setWeatherHistory(historyData);
    } catch (err: any) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDaysChange = async (days: number) => {
    if (!location?.latitude || !location?.longitude) return;
    
    setSelectedDays(days);
    setLoading(true);
    setError(null);
    
    try {
      const historyData = await WeatherAPI.getWeatherHistory(
        location.latitude, 
        location.longitude, 
        days
      );
      setWeatherHistory(historyData);
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
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Zgodovina vremena</h1>
        <p className="text-gray-600">Pregled vremenskih podatkov za pretekla obdobja</p>
      </div>

      {/* Search Section */}
      <div className="mb-8">
        <CitySearch onLocationSelect={handleLocationSelect} />
      </div>

      {/* Time Period Selector */}
      {location && (
        <div className="mb-6">
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Izberi obdobje</h3>
            <div className="flex flex-wrap gap-2">
              {[7, 14, 21, 30].map((days) => (
                <button
                  key={days}
                  onClick={() => handleDaysChange(days)}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    selectedDays === days
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {days === 7 ? 'Zadnji teden' : 
                   days === 14 ? 'Zadnja 2 tedna' :
                   days === 21 ? 'Zadnje 3 tedne' :
                   'Zadnji mesec'}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <div className="text-xl text-gray-600">Nalagam zgodovino vremena...</div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-center mb-8">
          Napaka: {error}
        </div>
      )}

      {/* Weather History Data */}
      {weatherHistory && location && !loading && (
        <WeatherHistory 
          weatherHistory={weatherHistory} 
          location={location} 
          days={selectedDays}
        />
      )}

      {/* Instructions when no data */}
      {!weatherHistory && !loading && !error && (
        <div className="text-center py-12">
          <div className="text-lg text-gray-600 mb-4">
            Poiščite lokacijo za ogled zgodovine vremena
          </div>
          <p className="text-gray-500">
            Uporabite iskalno polje zgoraj ali počakajte, da se naloži vaša trenutna lokacija
          </p>
        </div>
      )}
    </div>
  );
}
