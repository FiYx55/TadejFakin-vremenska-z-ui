/**
 * CitySearch Component
 * 
 * A compact search component that allows users to search for cities and locations
 * using the Open-Meteo Geocoding API. Provides autocomplete functionality with
 * a dropdown list of matching cities.
 * 
 * Features:
 * - Real-time city search with autocomplete
 * - Dropdown results with city, region, and country information
 * - Keyboard support (Enter to search)
 * - Loading states and error handling
 * - Clean, compact design suitable for integration in various layouts
 * 
 * @component
 * @author VremenskaPro Team
 */

'use client';

import { useState } from 'react';
import { GeocodingService, GeocodingResult } from '@/lib/geolocation';

/**
 * Props interface for the CitySearch component
 */
interface CitySearchProps {
  /** Callback function called when a location is selected from search results */
  onLocationSelect: (location: { 
    latitude: number; 
    longitude: number; 
    name: string; 
    country?: string; 
    admin1?: string 
  }) => void;
}

/**
 * CitySearch Component
 * 
 * Renders a search input with autocomplete functionality for finding cities worldwide.
 * When a city is selected, it calls the onLocationSelect callback with the location data.
 * 
 * @param props - Component props
 * @param props.onLocationSelect - Function to call when a location is selected
 * @returns JSX element containing the search interface
 */
export default function CitySearch({ onLocationSelect }: CitySearchProps) {
  /** Current search query entered by the user */
  const [query, setQuery] = useState('');
  /** Array of search results from the geocoding API */
  const [results, setResults] = useState<GeocodingResult[]>([]);
  /** Loading state indicator for search operations */
  const [isLoading, setIsLoading] = useState(false);
  /** Controls visibility of the search results dropdown */
  const [showResults, setShowResults] = useState(false);

  /**
   * Handles the search operation when user clicks search button or presses Enter
   * Fetches matching locations from the geocoding service
   */
  const handleSearch = async () => {
    if (!query.trim()) return;

    setIsLoading(true);
    try {
      const searchResults = await GeocodingService.searchLocations(query);
      setResults(searchResults);
      setShowResults(true);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handles keyboard events in the search input
   * Triggers search when Enter key is pressed
   * @param e - React keyboard event
   */
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  /**
   * Handles location selection from the search results dropdown
   * Calls the parent component's callback and resets the search state
   * @param location - The selected location object from search results
   */
  const handleLocationSelect = (location: GeocodingResult) => {
    onLocationSelect({
      latitude: location.latitude,
      longitude: location.longitude,
      name: location.name, // Use just the city name
      country: location.country,
      admin1: location.admin1
    });
    setQuery('');
    setResults([]);
    setShowResults(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 text-center">
      <h2 className="text-xl font-bold text-gray-800 mb-2">
        Išči vreme za poljubno lokacijo
      </h2>
      <p className="text-gray-600 text-sm mb-4">
        Vnesite ime mesta za takojšnje vremenske informacije
      </p>
      
      <div className="max-w-sm mx-auto relative">
        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Vnesite ime mesta..."
            className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button 
            onClick={handleSearch}
            disabled={isLoading || !query.trim()}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 text-sm rounded-md transition-colors duration-200"
          >
            {isLoading ? 'Iščem...' : 'Išči'}
          </button>
        </div>

        {/* Search Results Dropdown */}
        {showResults && results.length > 0 && (
          <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg mt-1 z-10 max-h-48 overflow-y-auto">
            {results.map((location) => (
              <button
                key={location.id}
                onClick={() => handleLocationSelect(location)}
                className="w-full text-left px-3 py-2 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors"
              >
                <div className="font-medium text-gray-900 text-sm">
                  {location.name}
                </div>
                <div className="text-xs text-gray-500">
                  {[location.admin1, location.country].filter(Boolean).join(', ')}
                </div>
              </button>
            ))}
          </div>
        )}

        {/* No Results Message */}
        {showResults && results.length === 0 && !isLoading && (
          <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg mt-1 z-10 p-3 text-gray-500 text-sm">
            Ni najdenih rezultatov za "{query}"
          </div>
        )}
      </div>
    </div>
  );
}
