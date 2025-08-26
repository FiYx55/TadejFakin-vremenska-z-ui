/**
 * Geolocation Services for VremenskaPro
 * 
 * Provides comprehensive location services including device geolocation,
 * reverse geocoding, and city search functionality using multiple APIs.
 * 
 * Services:
 * - Browser geolocation for current position
 * - Reverse geocoding (coordinates to location names)
 * - City search with autocomplete
 * - Location data formatting and validation
 * 
 * APIs Used:
 * - Browser Geolocation API
 * - BigDataCloud Reverse Geocoding API
 * - Open-Meteo Geocoding API
 * 
 * @author VremenskaPro Team
 * @version 1.0.0
 */

// Geolocation utilities

/**
 * Interface for geographical position with coordinates
 */
export interface GeolocationPosition {
  /** Latitude coordinate */
  latitude: number;
  /** Longitude coordinate */
  longitude: number;
  /** Position accuracy in meters (optional) */
  accuracy?: number;
}

/**
 * Interface for geolocation errors
 */
export interface GeolocationError {
  /** Error code number */
  code: number;
  /** Human-readable error message */
  message: string;
}

/**
 * Geolocation service for getting the user's current position
 * Uses the browser's Geolocation API to fetch the current position
 */
export class GeolocationService {
  /**
   * Gets the user's current geographical position using browser geolocation
   * @returns Promise resolving to the current position coordinates
   * @throws GeolocationError if geolocation fails or is not supported
   */
  static async getCurrentPosition(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject({
          code: 4,
          message: 'Geolocation is not supported by this browser'
        });
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy
          });
        },
        (error) => {
          let message = 'An unknown error occurred';
          switch (error.code) {
            case error.PERMISSION_DENIED:
              message = 'Location access denied by user';
              break;
            case error.POSITION_UNAVAILABLE:
              message = 'Location information is unavailable';
              break;
            case error.TIMEOUT:
              message = 'Location request timed out';
              break;
          }
          reject({
            code: error.code,
            message
          });
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 300000 // 5 minutes
        }
      );
    });
  }
}

// Geocoding service for converting place names to coordinates
export interface GeocodingResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  elevation: number;
  feature_code: string;
  country_code: string;
  admin1_id?: number;
  admin2_id?: number;
  admin3_id?: number;
  admin4_id?: number;
  timezone: string;
  population?: number;
  country_id: number;
  country: string;
  admin1?: string;
  admin2?: string;
  admin3?: string;
  admin4?: string;
}

export interface GeocodingResponse {
  results?: GeocodingResult[];
  generationtime_ms: number;
}

// Geocoding service for searching locations by name
// Uses Open-Meteo's geocoding API to fetch location data based on a search query
export class GeocodingService {
  private static readonly BASE_URL = 'https://geocoding-api.open-meteo.com/v1';

  static async searchLocations(query: string, count: number = 10): Promise<GeocodingResult[]> {
    if (!query.trim()) {
      return [];
    }

    const params = new URLSearchParams({
      name: query.trim(),
      count: count.toString(),
      language: 'en',
      format: 'json'
    });

    try {
      const response = await fetch(`${this.BASE_URL}/search?${params}`);
      
      if (!response.ok) {
        throw new Error(`Geocoding API error: ${response.statusText}`);
      }

      const data: GeocodingResponse = await response.json();
      return data.results || [];
    } catch (error) {
      console.error('Geocoding error:', error);
      throw error;
    }
  }

    /**
     * Formats a location name with optional admin and country information
     * @param location - GeocodingResult object containing location details
     * @returns Formatted location name string
     */
  static formatLocationName(location: GeocodingResult): string {
    const parts = [location.name];
    
    if (location.admin1) {
      parts.push(location.admin1);
    }
    
    if (location.country) {
      parts.push(location.country);
    }
    
    return parts.join(', ');
  }

    /**
     * Reverse geocodes latitude and longitude to get location details
     * @param latitude - Latitude of the location
     * @param longitude - Longitude of the location
     * @returns Partial GeocodingResult with location details
     */
  static async reverseGeocode(latitude: number, longitude: number): Promise<Partial<GeocodingResult> | null> {
    const params = new URLSearchParams({
      latitude: latitude.toString(),
      longitude: longitude.toString(),
      localityLanguage: 'sl',
    });

    try {
      const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?${params}`);
      
      if (!response.ok) {
        throw new Error(`Reverse geocoding API error: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (!data.city) {
        return null;
      }

      return {
        name: data.city,
        country: data.countryName,
        latitude: data.latitude,
        longitude: data.longitude,
      };
    } catch (error) {
      console.error('Reverse geocoding error:', error);
      throw error;
    }
  }
}

// Default locations for quick access
export const DEFAULT_LOCATIONS = [
  {
    name: 'New York',
    latitude: 40.7128,
    longitude: -74.0060,
    country: 'United States'
  },
  {
    name: 'London',
    latitude: 51.5074,
    longitude: -0.1278,
    country: 'United Kingdom'
  },
  {
    name: 'Tokyo',
    latitude: 35.6762,
    longitude: 139.6503,
    country: 'Japan'
  },
  {
    name: 'Sydney',
    latitude: -33.8688,
    longitude: 151.2093,
    country: 'Australia'
  },
  {
    name: 'Ljubljana',
    latitude: 46.0569,
    longitude: 14.5058,
    country: 'Slovenia'
  }
];
