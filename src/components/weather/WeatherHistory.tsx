/**
 * WeatherHistory Component
 * 
 * Displays historical weather data with statistical analysis and daily breakdown.
 * Shows weather patterns, extremes, averages, and individual daily records.
 * 
 * Features:
 * - Statistical weather analysis (extremes, averages, patterns)
 * - Summary cards with weather insights
 * - Daily historical weather records with icons and details
 * - Temperature, precipitation, and wind data
 * - Slovenian date formatting and weather descriptions
 * - Responsive design with clean card layout
 * 
 * @component
 * @author VremenskaPro Team
 */

import { HistoricalWeatherResponse, getWeatherDescription, getWeatherIcon, analyzeWeatherHistory } from '@/lib/weather-api';
import { GeocodingResult } from '@/lib/geolocation';
import Image from 'next/image';

/**
 * Props interface for the WeatherHistory component
 */
interface WeatherHistoryProps {
  /** Historical weather data from the Open-Meteo archive API */
  weatherHistory: HistoricalWeatherResponse;
  /** Location information for display */
  location: Partial<GeocodingResult>;
  /** Number of days of historical data to display */
  days: number;
}

/**
 * WeatherHistory Component
 * 
 * Renders historical weather data with statistical analysis and daily records.
 * Includes weather extremes, averages, pattern analysis, and detailed daily breakdown.
 * 
 * @param props - Component props
 * @param props.weatherHistory - Historical weather data from API
 * @param props.location - Location information for context
 * @param props.days - Number of historical days to analyze and display
 * @returns JSX element displaying weather history analysis or null if no data
 */
export default function WeatherHistory({ weatherHistory, location, days }: WeatherHistoryProps) {
  if (!weatherHistory.daily) {
    return null;
  }

  const {
    time,
    temperature_2m_max: maxTemps,
    temperature_2m_min: minTemps,
    temperature_2m_mean: meanTemps,
    weather_code: weatherCodes,
    precipitation_sum: precipitation,
    wind_speed_10m_max: windSpeeds,
  } = weatherHistory.daily;

  const {
    temperature_2m_max: tempUnit,
    precipitation_sum: precipUnit,
    wind_speed_10m_max: windUnit,
  } = weatherHistory.daily_units!;

  // Prepare historical data (reverse to show most recent first)
  const historicalDays = time.slice(-days).reverse().map((dateStr, index) => {
    const reversedIndex = time.length - 1 - index;
    const date = new Date(dateStr);
    const maxTemp = maxTemps[reversedIndex];
    const minTemp = minTemps[reversedIndex];
    const meanTemp = meanTemps[reversedIndex];
    const weatherCode = weatherCodes[reversedIndex];
    const precip = precipitation[reversedIndex];
    const windSpeed = windSpeeds[reversedIndex];
    const icon = getWeatherIcon(weatherCode, true); // Use day icon for historical data

    return {
      date: date.toLocaleDateString('sl-SI', {
        weekday: 'short',
        day: 'numeric',
        month: 'short'
      }),
      fullDate: date.toLocaleDateString('sl-SI', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }),
      maxTemp: Math.round(maxTemp),
      minTemp: Math.round(minTemp),
      meanTemp: Math.round(meanTemp),
      weatherCode,
      icon,
      precip: Math.round(precip * 10) / 10,
      windSpeed: Math.round(windSpeed),
      description: getWeatherDescription(weatherCode),
    };
  });

  // Calculate averages for the period
  const avgMaxTemp = Math.round(maxTemps.slice(-days).reduce((a, b) => a + b, 0) / days);
  const avgMinTemp = Math.round(minTemps.slice(-days).reduce((a, b) => a + b, 0) / days);
  const avgMeanTemp = Math.round(meanTemps.slice(-days).reduce((a, b) => a + b, 0) / days);
  const totalPrecip = Math.round(precipitation.slice(-days).reduce((a, b) => a + b, 0) * 10) / 10;

  // Get weather analysis
  const analysis = analyzeWeatherHistory(weatherHistory);

  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          Povzetek zadnjih {days} dni - {location.name}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-sm text-gray-600">Povp. najv. temp.</p>
            <p className="text-2xl font-bold text-orange-600">{avgMaxTemp}{tempUnit}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Povp. najn. temp.</p>
            <p className="text-2xl font-bold text-blue-600">{avgMinTemp}{tempUnit}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Povp. temperatura</p>
            <p className="text-2xl font-bold text-gray-700">{avgMeanTemp}{tempUnit}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Skupne padavine</p>
            <p className="text-2xl font-bold text-blue-500">{totalPrecip} {precipUnit}</p>
          </div>
        </div>
      </div>

      {/* Weather Analysis */}
      {analysis && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Analiza vremena</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Extremes */}
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-3">Ekstremne vrednosti</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Najvročji dan:</span>
                  <span className="font-semibold text-orange-600">{analysis.extremes.hottestDay}{tempUnit}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Najhladnejši dan:</span>
                  <span className="font-semibold text-blue-600">{analysis.extremes.coldestDay}{tempUnit}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Največ padavin:</span>
                  <span className="font-semibold text-blue-500">{analysis.extremes.wettestDay} {precipUnit}</span>
                </div>
              </div>
            </div>

            {/* Weather Patterns */}
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-3">Vremenske značilnosti</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Najpogosteje:</span>
                  <span className="font-semibold text-gray-700">{analysis.weatherPatterns.mostCommonWeather}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Število dni:</span>
                  <span className="font-semibold text-gray-700">{analysis.weatherPatterns.mostCommonWeatherDays} od {analysis.weatherPatterns.totalDays}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Historical Days List */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Dnevni pregled</h3>
        <div className="space-y-3">
          {historicalDays.map((day, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {/* Date and Icon */}
              <div className="flex items-center gap-4 flex-1">
                <div className="w-10 h-10">
                  <Image
                    src={`/animated/${day.icon}.svg`}
                    alt={day.description}
                    width={40}
                    height={40}
                    className="drop-shadow-sm"
                  />
                </div>
                <div>
                  <p className="font-medium text-gray-800">{day.date}</p>
                  <p className="text-sm text-gray-600">{day.description}</p>
                </div>
              </div>

              {/* Temperature Range */}
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="text-sm text-gray-600">Max</p>
                  <p className="font-bold text-orange-600">{day.maxTemp}{tempUnit}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Min</p>
                  <p className="font-bold text-blue-600">{day.minTemp}{tempUnit}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Padavine</p>
                  <p className="font-medium text-blue-500">{day.precip} {precipUnit}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Veter</p>
                  <p className="font-medium text-gray-700">{day.windSpeed} {windUnit}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
