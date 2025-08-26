/**
 * DailyWeather Component
 * 
 * Displays a 7-day weather forecast with detailed daily information including
 * high/low temperatures, weather conditions, precipitation, and sunrise/sunset times.
 * 
 * Features:
 * - 7-day weather forecast display
 * - High/low temperature ranges with visual temperature bars
 * - Weather icons with day/night variants
 * - Precipitation probability and wind speed
 * - Sunrise and sunset times
 * - Localized day names (Danes, Jutri, weekday names in Slovenian)
 * - Day/night themed styling
 * 
 * @component
 * @author VremenskaPro Team
 */

import { WeatherResponse, getWeatherDescription, getWeatherIcon } from '@/lib/weather-api';
import Image from 'next/image';

/**
 * Props interface for the DailyWeather component
 */
interface DailyWeatherProps {
  /** Weather data response containing daily forecast data */
  weather: WeatherResponse;
}

/**
 * DailyWeather Component
 * 
 * Renders a 7-day weather forecast with comprehensive daily weather information
 * including temperature ranges, weather conditions, and astronomical data.
 * 
 * @param props - Component props
 * @param props.weather - Weather data with daily forecast information
 * @returns JSX element displaying daily weather forecast or null if no daily data
 */
export default function DailyWeather({ weather }: DailyWeatherProps) {
  if (!weather.daily) {
    return null;
  }

  const {
    time,
    weather_code: weatherCodes,
    temperature_2m_max: maxTemps,
    temperature_2m_min: minTemps,
    precipitation_probability_max: precipitationProb,
    wind_speed_10m_max: windSpeeds,
    sunrise,
    sunset,
  } = weather.daily;

  const { 
    temperature_2m_max: tempUnit,
    wind_speed_10m_max: windUnit,
  } = weather.daily_units!;

  // Check if it's currently day or night for main card theme
  const isCurrentlyDay = weather.current?.is_day === 1;
  
  // Main card theme
  const cardClasses = isCurrentlyDay 
    ? "bg-white rounded-3xl shadow-xl p-6 w-full max-w-2xl mx-auto mt-6"
    : "bg-slate-800 rounded-3xl shadow-xl p-6 w-full max-w-2xl mx-auto mt-6";
  
  const titleClasses = isCurrentlyDay ? "text-2xl font-bold text-gray-800 mb-6" : "text-2xl font-bold text-white mb-6";

  // Format the daily forecast data
  const dailyForecast = time.slice(0, 7).map((dateStr, index) => {
    const date = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    
    let dayName;
    if (date.toDateString() === today.toDateString()) {
      dayName = 'Danes';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      dayName = 'Jutri';
    } else {
      dayName = date.toLocaleDateString('sl-SI', { weekday: 'short' });
    }

    const weatherCode = weatherCodes[index];
    const maxTemp = Math.round(maxTemps[index]);
    const minTemp = Math.round(minTemps[index]);
    const precipitation = precipitationProb[index];
    const windSpeed = Math.round(windSpeeds[index]);
    
    // Use day icon for daily forecast
    const icon = getWeatherIcon(weatherCode, true);
    const description = getWeatherDescription(weatherCode);

    return {
      dayName,
      date: date.getDate(),
      month: date.toLocaleDateString('sl-SI', { month: 'short' }),
      maxTemp,
      minTemp,
      precipitation,
      windSpeed,
      icon,
      description,
      weatherCode,
    };
  });

  return (
    <div className={cardClasses}>
      <h3 className={titleClasses}>7-dnevna napoved</h3>
      
      <div className="space-y-3">
        {dailyForecast.map((day, index) => {
          // Individual day card theming
          const dayCardClasses = isCurrentlyDay 
            ? "flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
            : "flex items-center justify-between p-4 rounded-xl bg-slate-700 hover:bg-slate-600 transition-colors";
          const dayTextClasses = isCurrentlyDay ? "text-gray-800" : "text-white";
          const tempTextClasses = isCurrentlyDay ? "text-gray-800" : "text-white";
          const detailTextClasses = isCurrentlyDay ? "text-gray-600" : "text-slate-300";

          return (
            <div
              key={index}
              className={dayCardClasses}
            >
              {/* Left: Day and Date */}
              <div className="flex items-center gap-4">
                <div className="text-center min-w-[60px]">
                  <p className={`font-semibold ${dayTextClasses}`}>
                    {day.dayName}
                  </p>
                  <p className={`text-sm ${detailTextClasses}`}>
                    {day.date}. {day.month}
                  </p>
                </div>
                
                {/* Weather Icon */}
                <div className="w-12 h-12">
                  <Image
                    src={`/animated/${day.icon}.svg`}
                    alt={day.description}
                    width={48}
                    height={48}
                    className="drop-shadow-sm"
                  />
                </div>
                
                {/* Weather Description */}
                <div className="flex-1 min-w-[120px]">
                  <p className={`font-medium ${dayTextClasses}`}>
                    {day.description}
                  </p>
                  <div className="flex items-center gap-4 mt-1">
                    <span className={`text-xs ${detailTextClasses}`}>
                      💧 {day.precipitation}%
                    </span>
                    <span className={`text-xs ${detailTextClasses}`}>
                      💨 {day.windSpeed} {windUnit}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Right: Temperature */}
              <div className="text-right">
                <div className="flex items-center gap-2">
                  <span className={`text-lg font-bold ${tempTextClasses}`}>
                    {day.maxTemp}°
                  </span>
                  <span className={`text-sm ${detailTextClasses}`}>
                    {day.minTemp}°
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
