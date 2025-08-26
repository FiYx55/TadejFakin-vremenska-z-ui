/**
 * Weather API utilities for the VremenskaPro application
 * 
 * This module provides a comprehensive interface to the Open-Meteo weather API,
 * supporting current weather, forecasts, and historical weather data.
 * 
 * Features:
 * - Current weather conditions
 * - Hourly and daily forecasts
 * - Historical weather data analysis
 * - Slovenian weather descriptions
 * - Day/night weather icons
 * - Weather pattern analysis
 * 
 * @author VremenskaPro Team
 * @version 1.0.0
 */

// Open-Meteo API utilities

/**
 * Interface for current weather data structure
 */
export interface WeatherData {
  current: {
    time: string;
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    is_day: number;
    precipitation: number;
    rain: number;
    showers: number;
    snowfall: number;
    weather_code: number;
    cloud_cover: number;
    pressure_msl: number;
    surface_pressure: number;
    wind_speed_10m: number;
    wind_direction_10m: number;
    wind_gusts_10m: number;
  };
  current_units: {
    time: string;
    temperature_2m: string;
    relative_humidity_2m: string;
    apparent_temperature: string;
    is_day: string;
    precipitation: string;
    rain: string;
    showers: string;
    snowfall: string;
    weather_code: string;
    cloud_cover: string;
    pressure_msl: string;
    surface_pressure: string;
    wind_speed_10m: string;
    wind_direction_10m: string;
    wind_gusts_10m: string;
  };
}

/**
 * Interface for daily forecast data structure
 */
export interface ForecastData {
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    apparent_temperature_max: number[];
    apparent_temperature_min: number[];
    sunrise: string[];
    sunset: string[];
    daylight_duration: number[];
    sunshine_duration: number[];
    uv_index_max: number[];
    precipitation_sum: number[];
    rain_sum: number[];
    showers_sum: number[];
    snowfall_sum: number[];
    precipitation_hours: number[];
    precipitation_probability_max: number[];
    wind_speed_10m_max: number[];
    wind_gusts_10m_max: number[];
    wind_direction_10m_dominant: number[];
  };
  daily_units: {
    time: string;
    weather_code: string;
    temperature_2m_max: string;
    temperature_2m_min: string;
    apparent_temperature_max: string;
    apparent_temperature_min: string;
    sunrise: string;
    sunset: string;
    daylight_duration: string;
    sunshine_duration: string;
    uv_index_max: string;
    precipitation_sum: string;
    rain_sum: string;
    showers_sum: string;
    snowfall_sum: string;
    precipitation_hours: string;
    precipitation_probability_max: string;
    wind_speed_10m_max: string;
    wind_gusts_10m_max: string;
    wind_direction_10m_dominant: string;
  };
}

/**
 * Interface for hourly weather data structure
 */
export interface HourlyData {
  hourly: {
    time: string[];
    temperature_2m: number[];
    relative_humidity_2m: number[];
    apparent_temperature: number[];
    precipitation_probability: number[];
    precipitation: number[];
    rain: number[];
    showers: number[];
    snowfall: number[];
    weather_code: number[];
    cloud_cover: number[];
    wind_speed_10m: number[];
    wind_direction_10m: number[];
    wind_gusts_10m: number[];
    is_day: number[];
  };
  hourly_units: {
    time: string;
    temperature_2m: string;
    relative_humidity_2m: string;
    apparent_temperature: string;
    precipitation_probability: string;
    precipitation: string;
    rain: string;
    showers: string;
    snowfall: string;
    weather_code: string;
    cloud_cover: string;
    wind_speed_10m: string;
    wind_direction_10m: string;
    wind_gusts_10m: string;
    is_day: string;
  };
}

/**
 * Interface for location data including coordinates and timezone
 */
export interface LocationData {
  latitude: number;
  longitude: number;
  timezone: string;
  elevation: number;
}

/**
 * Main weather response interface extending location data
 * Contains optional current, daily, and hourly weather data
 */
export interface WeatherResponse extends LocationData {
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone_abbreviation: string;
  current?: WeatherData['current'];
  current_units?: WeatherData['current_units'];
  daily?: ForecastData['daily'];
  daily_units?: ForecastData['daily_units'];
  hourly?: HourlyData['hourly'];
  hourly_units?: HourlyData['hourly_units'];
}

/**
 * Interface for historical weather data structure
 * Contains daily historical weather measurements and statistics
 */
export interface HistoricalWeatherData {
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    temperature_2m_mean: number[];
    apparent_temperature_max: number[];
    apparent_temperature_min: number[];
    apparent_temperature_mean: number[];
    sunrise: string[];
    sunset: string[];
    daylight_duration: number[];
    sunshine_duration: number[];
    precipitation_sum: number[];
    rain_sum: number[];
    snowfall_sum: number[];
    precipitation_hours: number[];
    wind_speed_10m_max: number[];
    wind_gusts_10m_max: number[];
    wind_direction_10m_dominant: number[];
  };
  daily_units: {
    time: string;
    weather_code: string;
    temperature_2m_max: string;
    temperature_2m_min: string;
    temperature_2m_mean: string;
    apparent_temperature_max: string;
    apparent_temperature_min: string;
    apparent_temperature_mean: string;
    sunrise: string;
    sunset: string;
    daylight_duration: string;
    sunshine_duration: string;
    precipitation_sum: string;
    rain_sum: string;
    snowfall_sum: string;
    precipitation_hours: string;
    wind_speed_10m_max: string;
    wind_gusts_10m_max: string;
    wind_direction_10m_dominant: string;
  };
}

/**
 * Historical weather response interface extending location data
 * Contains historical daily weather data and metadata
 */
export interface HistoricalWeatherResponse extends LocationData {
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone_abbreviation: string;
  daily?: HistoricalWeatherData['daily'];
  daily_units?: HistoricalWeatherData['daily_units'];
}

/**
 * Base URLs for Open-Meteo API endpoints
 */
const BASE_URL = 'https://api.open-meteo.com/v1';
const HISTORICAL_BASE_URL = 'https://archive-api.open-meteo.com/v1';

/**
 * Main Weather API class providing static methods for weather data retrieval
 * Uses Open-Meteo API for current weather, forecasts, and historical data
 */
export class WeatherAPI {
  /**
   * Fetches current weather data for a specific location
   * @param latitude - The latitude coordinate of the location
   * @param longitude - The longitude coordinate of the location
   * @returns Promise containing current weather data including temperature, humidity, precipitation, and other conditions
   * @throws Error if the API request fails
   */
  static async getCurrentWeather(latitude: number, longitude: number): Promise<WeatherResponse> {
    const params = new URLSearchParams({
      latitude: latitude.toString(),
      longitude: longitude.toString(),
      current: [
        'temperature_2m',
        'relative_humidity_2m',
        'apparent_temperature',
        'is_day',
        'precipitation',
        'rain',
        'showers',
        'snowfall',
        'weather_code',
        'cloud_cover',
        'pressure_msl',
        'surface_pressure',
        'wind_speed_10m',
        'wind_direction_10m',
        'wind_gusts_10m'
      ].join(','),
      timezone: 'auto'
    });

    const response = await fetch(`${BASE_URL}/forecast?${params}`);
    
    if (!response.ok) {
      throw new Error(`Weather API error: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Fetches daily weather forecast for a specific location
   * @param latitude - The latitude coordinate of the location
   * @param longitude - The longitude coordinate of the location
   * @param days - Number of forecast days to retrieve (default: 7)
   * @returns Promise containing daily forecast data including min/max temperatures, precipitation, and weather codes
   * @throws Error if the API request fails
   */
  static async getForecast(latitude: number, longitude: number, days: number = 7): Promise<WeatherResponse> {
    const params = new URLSearchParams({
      latitude: latitude.toString(),
      longitude: longitude.toString(),
      daily: [
        'weather_code',
        'temperature_2m_max',
        'temperature_2m_min',
        'apparent_temperature_max',
        'apparent_temperature_min',
        'sunrise',
        'sunset',
        'daylight_duration',
        'sunshine_duration',
        'uv_index_max',
        'precipitation_sum',
        'rain_sum',
        'showers_sum',
        'snowfall_sum',
        'precipitation_hours',
        'precipitation_probability_max',
        'wind_speed_10m_max',
        'wind_gusts_10m_max',
        'wind_direction_10m_dominant'
      ].join(','),
      forecast_days: days.toString(),
      timezone: 'auto'
    });

    const response = await fetch(`${BASE_URL}/forecast?${params}`);
    
    if (!response.ok) {
      throw new Error(`Weather API error: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Fetches comprehensive weather data including current conditions, hourly and daily forecasts
   * @param latitude - The latitude coordinate of the location
   * @param longitude - The longitude coordinate of the location
   * @param days - Number of forecast days to retrieve (default: 7)
   * @returns Promise containing current weather, 24-hour hourly forecast, and daily forecast data
   * @throws Error if the API request fails
   */
  static async getCurrentWeatherAndForecast(latitude: number, longitude: number, days: number = 7): Promise<WeatherResponse> {
    const params = new URLSearchParams({
      latitude: latitude.toString(),
      longitude: longitude.toString(),
      current: [
        'temperature_2m',
        'relative_humidity_2m',
        'apparent_temperature',
        'is_day',
        'precipitation',
        'rain',
        'showers',
        'snowfall',
        'weather_code',
        'cloud_cover',
        'pressure_msl',
        'surface_pressure',
        'wind_speed_10m',
        'wind_direction_10m',
        'wind_gusts_10m'
      ].join(','),
      hourly: [
        'temperature_2m',
        'relative_humidity_2m',
        'apparent_temperature',
        'precipitation_probability',
        'precipitation',
        'rain',
        'showers',
        'snowfall',
        'weather_code',
        'cloud_cover',
        'wind_speed_10m',
        'wind_direction_10m',
        'wind_gusts_10m',
        'is_day'
      ].join(','),
      daily: [
        'weather_code',
        'temperature_2m_max',
        'temperature_2m_min',
        'apparent_temperature_max',
        'apparent_temperature_min',
        'sunrise',
        'sunset',
        'daylight_duration',
        'sunshine_duration',
        'uv_index_max',
        'precipitation_sum',
        'rain_sum',
        'showers_sum',
        'snowfall_sum',
        'precipitation_hours',
        'precipitation_probability_max',
        'wind_speed_10m_max',
        'wind_gusts_10m_max',
        'wind_direction_10m_dominant'
      ].join(','),
      forecast_days: days.toString(),
      forecast_hours: '24',
      timezone: 'auto'
    });

    const response = await fetch(`${BASE_URL}/forecast?${params}`);
    
    if (!response.ok) {
      throw new Error(`Weather API error: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Fetches historical weather data for a specific date range
   * @param latitude - The latitude coordinate of the location
   * @param longitude - The longitude coordinate of the location
   * @param startDate - Start date in YYYY-MM-DD format
   * @param endDate - End date in YYYY-MM-DD format
   * @returns Promise containing historical daily weather data including temperatures, precipitation, and weather patterns
   * @throws Error if the API request fails or date format is invalid
   */
  static async getHistoricalWeather(
    latitude: number, 
    longitude: number, 
    startDate: string, 
    endDate: string
  ): Promise<HistoricalWeatherResponse> {
    const params = new URLSearchParams({
      latitude: latitude.toString(),
      longitude: longitude.toString(),
      start_date: startDate, // Format: YYYY-MM-DD
      end_date: endDate,     // Format: YYYY-MM-DD
      daily: [
        'weather_code',
        'temperature_2m_max',
        'temperature_2m_min',
        'temperature_2m_mean',
        'apparent_temperature_max',
        'apparent_temperature_min',
        'apparent_temperature_mean',
        'sunrise',
        'sunset',
        'daylight_duration',
        'sunshine_duration',
        'precipitation_sum',
        'rain_sum',
        'snowfall_sum',
        'precipitation_hours',
        'wind_speed_10m_max',
        'wind_gusts_10m_max',
        'wind_direction_10m_dominant'
      ].join(','),
      timezone: 'auto'
    });

    const response = await fetch(`${HISTORICAL_BASE_URL}/archive?${params}`);
    
    if (!response.ok) {
      throw new Error(`Historical Weather API error: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Fetches historical weather data for a specified number of days back from today
   * @param latitude - The latitude coordinate of the location
   * @param longitude - The longitude coordinate of the location
   * @param days - Number of days back from today to retrieve (default: 14)
   * @returns Promise containing historical weather data for the specified period
   * @throws Error if the API request fails
   */
  static async getWeatherHistory(
    latitude: number, 
    longitude: number, 
    days: number = 14
  ): Promise<HistoricalWeatherResponse> {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - days);

    const endDateStr = endDate.toISOString().split('T')[0];
    const startDateStr = startDate.toISOString().split('T')[0];

    return this.getHistoricalWeather(latitude, longitude, startDateStr, endDateStr);
  }

  /**
   * Fetches and compares historical weather data for two complete years
   * @param latitude - The latitude coordinate of the location
   * @param longitude - The longitude coordinate of the location
   * @param year1 - First year to compare (YYYY format)
   * @param year2 - Second year to compare (YYYY format)
   * @returns Promise containing weather data for both years for comparison analysis
   * @throws Error if the API request fails or years are invalid
   */
  static async getYearlyWeatherComparison(
    latitude: number, 
    longitude: number, 
    year1: number, 
    year2: number
  ): Promise<{ year1: HistoricalWeatherResponse; year2: HistoricalWeatherResponse }> {
    const startDate1 = `${year1}-01-01`;
    const endDate1 = `${year1}-12-31`;
    const startDate2 = `${year2}-01-01`;
    const endDate2 = `${year2}-12-31`;

    const [weather1, weather2] = await Promise.all([
      this.getHistoricalWeather(latitude, longitude, startDate1, endDate1),
      this.getHistoricalWeather(latitude, longitude, startDate2, endDate2)
    ]);

    return { year1: weather1, year2: weather2 };
  }
}

/**
 * Type definition for weather icon mapping
 * Can be either a string or an object with day/night variants
 */
type WeatherIcon = string | { day: string; night: string };

/**
 * Weather code mappings for Open-Meteo API
 * Maps numeric weather codes to Slovenian descriptions and appropriate icons
 * Supports day/night variants for relevant weather conditions
 */
export const WEATHER_CODES: Record<number, { description: string; icon: WeatherIcon }> = {
  0: { description: 'Jasno', icon: { day: 'clear-day', night: 'clear-night' } },
  1: { description: 'Pretežno jasno', icon: { day: 'clear-day', night: 'clear-night' } },
  2: { description: 'Delno oblačno', icon: { day: 'cloudy-1-day', night: 'cloudy-1-night' } },
  3: { description: 'Oblačno', icon: { day: 'cloudy-3-day', night: 'cloudy-3-night' } },
  45: { description: 'Megla', icon: { day: 'fog-day', night: 'fog-night' } },
  48: { description: 'Megla z ivjem', icon: { day: 'fog-day', night: 'fog-night' } },
  51: { description: 'Rahlo rosenje', icon: { day: 'rainy-1-day', night: 'rainy-1-night' } },
  53: { description: 'Zmerno rosenje', icon: { day: 'rainy-2-day', night: 'rainy-2-night' } },
  55: { description: 'Gosto rosenje', icon: { day: 'rainy-3-day', night: 'rainy-3-night' } },
  56: { description: 'Rahlo ledeno rosenje', icon: 'rain-and-sleet-mix' },
  57: { description: 'Gosto ledeno rosenje', icon: 'rain-and-sleet-mix' },
  61: { description: 'Rahlo deževje', icon: { day: 'rainy-1-day', night: 'rainy-1-night' } },
  63: { description: 'Zmerno deževje', icon: { day: 'rainy-2-day', night: 'rainy-2-night' } },
  65: { description: 'Močno deževje', icon: { day: 'rainy-3-day', night: 'rainy-3-night' } },
  66: { description: 'Rahlo ledeno deževje', icon: 'rain-and-sleet-mix' },
  67: { description: 'Močno ledeno deževje', icon: 'rain-and-sleet-mix' },
  71: { description: 'Rahlo sneženje', icon: { day: 'snowy-1-day', night: 'snowy-1-night' } },
  73: { description: 'Zmerno sneženje', icon: { day: 'snowy-2-day', night: 'snowy-2-night' } },
  75: { description: 'Močno sneženje', icon: { day: 'snowy-3-day', night: 'snowy-3-night' } },
  77: { description: 'Snežna zrna', icon: { day: 'snowy-1-day', night: 'snowy-1-night' } },
  80: { description: 'Rahle dežne plohe', icon: { day: 'rainy-1-day', night: 'rainy-1-night' } },
  81: { description: 'Zmerne dežne plohe', icon: { day: 'rainy-2-day', night: 'rainy-2-night' } },
  82: { description: 'Močne dežne plohe', icon: { day: 'rainy-3-day', night: 'rainy-3-night' } },
  85: { description: 'Rahle snežne plohe', icon: { day: 'snowy-1-day', night: 'snowy-1-night' } },
  86: { description: 'Močne snežne plohe', icon: { day: 'snowy-3-day', night: 'snowy-3-night' } },
  95: { description: 'Nevihta', icon: 'thunderstorms' },
  96: { description: 'Nevihta z rahlo točo', icon: { day: 'scattered-thunderstorms-day', night: 'scattered-thunderstorms-night' } },
  99: { description: 'Nevihta z močno točo', icon: 'severe-thunderstorm' },
};

/**
 * Gets the appropriate weather icon name based on weather code and time of day
 * @param weatherCode - The Open-Meteo weather code number
 * @param isDay - Whether it's currently day time (default: true)
 * @returns String name of the weather icon file (without extension)
 */
export function getWeatherIcon(weatherCode: number, isDay: boolean = true): string {
  const weather = WEATHER_CODES[weatherCode] || WEATHER_CODES[0];
  const icon = weather.icon;

  if (typeof icon === 'object') {
    return isDay ? icon.day : icon.night;
  }
  return icon;
}

/**
 * Gets the Slovenian description for a weather condition based on weather code
 * @param weatherCode - The Open-Meteo weather code number
 * @returns Slovenian description of the weather condition
 */
export function getWeatherDescription(weatherCode: number): string {
  return WEATHER_CODES[weatherCode]?.description || 'Neznano';
}

// Weather history analysis utilities
/**
 * Analyzes historical weather data to extract statistical insights and patterns
 * @param historicalData - The historical weather response data from the API
 * @returns Object containing weather extremes, averages, and pattern analysis, or null if no data
 */
export function analyzeWeatherHistory(historicalData: HistoricalWeatherResponse) {
  if (!historicalData.daily) return null;

  const {
    temperature_2m_max: maxTemps,
    temperature_2m_min: minTemps,
    precipitation_sum: precipitation,
    weather_code: weatherCodes,
  } = historicalData.daily;

  // Find extremes
  const hottestDay = Math.max(...maxTemps);
  const coldestDay = Math.min(...minTemps);
  const wettestDay = Math.max(...precipitation);
  
  // Calculate averages
  const avgMaxTemp = maxTemps.reduce((a, b) => a + b, 0) / maxTemps.length;
  const avgMinTemp = minTemps.reduce((a, b) => a + b, 0) / minTemps.length;
  const totalPrecipitation = precipitation.reduce((a, b) => a + b, 0);
  
  // Count weather types
  const weatherTypeCounts = weatherCodes.reduce((acc, code) => {
    const description = getWeatherDescription(code);
    acc[description] = (acc[description] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const mostCommonWeather = Object.entries(weatherTypeCounts)
    .sort(([,a], [,b]) => b - a)[0];

  return {
    extremes: {
      hottestDay: Math.round(hottestDay),
      coldestDay: Math.round(coldestDay),
      wettestDay: Math.round(wettestDay * 10) / 10,
    },
    averages: {
      avgMaxTemp: Math.round(avgMaxTemp),
      avgMinTemp: Math.round(avgMinTemp),
      totalPrecipitation: Math.round(totalPrecipitation * 10) / 10,
    },
    weatherPatterns: {
      mostCommonWeather: mostCommonWeather ? mostCommonWeather[0] : 'Neznano',
      mostCommonWeatherDays: mostCommonWeather ? mostCommonWeather[1] : 0,
      totalDays: weatherCodes.length,
    }
  };
}
