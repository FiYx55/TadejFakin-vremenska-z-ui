/**
 * CurrentWeather Component
 * 
 * Displays current weather conditions in an attractive card format with day/night theming.
 * Shows temperature, weather description, location info, and detailed weather metrics.
 * 
 * Features:
 * - Large temperature display with weather icon
 * - Day/night themed styling (blue gradient for day, dark for night)
 * - Weather details grid (feels like, humidity, wind speed)
 * - Responsive design for mobile and desktop
 * - Animated weather icons with day/night variants
 * 
 * @component
 * @author VremenskaPro Team
 */

import { WeatherResponse, getWeatherDescription, getWeatherIcon } from '@/lib/weather-api';
import { GeocodingResult } from '@/lib/geolocation';
import Image from 'next/image';

/**
 * Props interface for the CurrentWeather component
 */
interface CurrentWeatherProps {
  /** Weather data response from the API containing current conditions */
  weather: WeatherResponse;
  /** Location information including name and country */
  location: Partial<GeocodingResult>;
}

/**
 * CurrentWeather Component
 * 
 * Renders current weather conditions with location info, temperature, and weather details.
 * Applies day/night theming based on the is_day value from weather data.
 * 
 * @param props - Component props
 * @param props.weather - Current weather data from Open-Meteo API
 * @param props.location - Location data with city name and country
 * @returns JSX element displaying current weather or null if no current data
 */
export default function CurrentWeather({ weather, location }: CurrentWeatherProps) {
  if (!weather.current) {
    return null;
  }

  const {
    temperature_2m: temp,
    apparent_temperature: feelsLike,
    relative_humidity_2m: humidity,
    wind_speed_10m: windSpeed,
    weather_code: weatherCode,
    is_day,
  } = weather.current;

  const {
    temperature_2m: tempUnit,
    relative_humidity_2m: humidityUnit,
    wind_speed_10m: windSpeedUnit,
  } = weather.current_units!;

  const description = getWeatherDescription(weatherCode);
  const icon = getWeatherIcon(weatherCode, is_day === 1);
  
  // Determine if it's day or night for styling
  const isDay = is_day === 1;
  const cardClasses = isDay 
    ? "bg-gradient-to-br from-sky-400 to-blue-600 text-white p-8 rounded-3xl shadow-xl w-full max-w-2xl mx-auto"
    : "bg-gradient-to-br from-slate-700 to-slate-900 text-white p-8 rounded-3xl shadow-xl w-full max-w-2xl mx-auto";
  
  const textColorClasses = isDay ? "text-sky-100" : "text-slate-200";
  const borderColorClasses = isDay ? "border-sky-300/50" : "border-slate-500/50";

  return (
    <div className={cardClasses}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        
        {/* Left Column: Location, Temp, Description */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h2 className="text-4xl font-bold">{location.name}</h2>
          <p className={`${textColorClasses} text-lg mb-4`}>{location.country}</p>
          <p className="text-8xl font-extrabold tracking-tighter">{Math.round(temp)}{tempUnit}</p>
          <p className={`text-xl font-medium ${textColorClasses} mt-2`}>{description}</p>
        </div>

        {/* Right Column: Icon and Details */}
        <div className="flex flex-col items-center">
          <div className="w-64 h-64 flex items-center justify-center drop-shadow-2xl">
            <Image
              src={`/animated/${icon}.svg`}
              alt={description}
              width={256}
              height={256}
              priority
              className="drop-shadow-lg"
            />
          </div>
          <div className={`w-full mt-6 pt-6 border-t ${borderColorClasses} grid grid-cols-3 gap-4 text-center`}>
            <div>
              <p className={`${textColorClasses} text-sm`}>Občutek</p>
              <p className="font-bold text-xl">{Math.round(feelsLike)}{tempUnit}</p>
            </div>
            <div>
              <p className={`${textColorClasses} text-sm`}>Vlažnost</p>
              <p className="font-bold text-xl">{humidity}{humidityUnit}</p>
            </div>
            <div>
              <p className={`${textColorClasses} text-sm`}>Veter</p>
              <p className="font-bold text-xl">{windSpeed} {windSpeedUnit}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
