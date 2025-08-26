/**
 * HourlyWeather Component
 * 
 * Displays a horizontal scrolling list of hourly weather forecasts for the next 12 hours.
 * Shows time, temperature, weather icon, and precipitation probability for each hour.
 * 
 * Features:
 * - Horizontal scrolling hourly forecast
 * - Individual hour cards with time, temperature, and weather icon
 * - Precipitation probability indicators
 * - Day/night themed styling consistent with current weather
 * - Responsive design with smooth scrolling
 * 
 * @component
 * @author VremenskaPro Team
 */

import { WeatherResponse, getWeatherDescription, getWeatherIcon } from '@/lib/weather-api';
import Image from 'next/image';

/**
 * Props interface for the HourlyWeather component
 */
interface HourlyWeatherProps {
  /** Weather data response containing hourly forecast data */
  weather: WeatherResponse;
}

/**
 * HourlyWeather Component
 * 
 * Renders a scrollable list of hourly weather forecasts with temperatures,
 * weather icons, and precipitation probabilities.
 * 
 * @param props - Component props
 * @param props.weather - Weather data with hourly forecast information
 * @returns JSX element displaying hourly weather forecast or null if no hourly data
 */
export default function HourlyWeather({ weather }: HourlyWeatherProps) {
  if (!weather.hourly) {
    return null;
  }

  const {
    time,
    temperature_2m: temperatures,
    weather_code: weatherCodes,
    precipitation_probability: precipitationProb,
    is_day: isDayArray,
  } = weather.hourly;

  const { temperature_2m: tempUnit } = weather.hourly_units!;

  // Check if it's currently day or night (use first hour as reference for main card theme)
  const isCurrentlyDay = weather.current?.is_day === 1;
  
  // Main card theme (keep consistent with current weather)
  const cardClasses = isCurrentlyDay 
    ? "bg-white rounded-3xl shadow-xl p-6 w-full max-w-2xl mx-auto mt-6"
    : "bg-slate-800 rounded-3xl shadow-xl p-6 w-full max-w-2xl mx-auto mt-6";
  
  const titleClasses = isCurrentlyDay ? "text-2xl font-bold text-gray-800 mb-6" : "text-2xl font-bold text-white mb-6";

  // Show next 12 hours
  const next12Hours = time.slice(0, 12).map((timeStr, index) => {
    const date = new Date(timeStr);
    const hour = date.getHours();
    const temp = temperatures[index];
    const weatherCode = weatherCodes[index];
    const precipitation = precipitationProb[index];
    const isDay = isDayArray[index] === 1;
    const icon = getWeatherIcon(weatherCode, isDay);

    return {
      time: hour === 0 ? '00:00' : `${hour}:00`,
      temp: Math.round(temp),
      icon,
      precipitation,
      weatherCode,
      isDay, // Include day/night info for individual theming
    };
  });

  return (
    <div className={cardClasses}>
      <h3 className={titleClasses}>Urno napovedovanje</h3>
      
      <div className="overflow-x-auto">
        <div className="flex gap-4 pb-2">
          {next12Hours.map((hour, index) => {
            // Individual hour card theming based on day/night
            const hourCardClasses = hour.isDay 
              ? "flex flex-col items-center min-w-[80px] p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
              : "flex flex-col items-center min-w-[80px] p-3 rounded-xl bg-slate-700 hover:bg-slate-600 transition-colors";
            const timeTextClasses = hour.isDay ? "text-sm font-medium text-gray-600 mb-2" : "text-sm font-medium text-slate-300 mb-2";
            const tempTextClasses = hour.isDay ? "text-lg font-bold text-gray-800 mb-1" : "text-lg font-bold text-white mb-1";
            const precipTextClasses = hour.isDay ? "text-xs text-gray-500" : "text-xs text-slate-400";

            return (
              <div
                key={index}
                className={hourCardClasses}
              >
                {/* Time */}
                <p className={timeTextClasses}>
                  {hour.time}
                </p>
                
                {/* Weather Icon */}
                <div className="w-12 h-12 mb-2">
                  <Image
                    src={`/animated/${hour.icon}.svg`}
                    alt={getWeatherDescription(hour.weatherCode)}
                    width={48}
                    height={48}
                    className="drop-shadow-sm"
                  />
                </div>
                
                {/* Temperature */}
                <p className={tempTextClasses}>
                  {hour.temp}{tempUnit}
                </p>
                
                {/* Precipitation Probability */}
                <div className="flex items-center gap-1">
                  <span className="text-xs text-blue-500">💧</span>
                  <p className={precipTextClasses}>
                    {hour.precipitation}%
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
