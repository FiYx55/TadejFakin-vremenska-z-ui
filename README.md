# VremenskaPro 🌤️

**Advanced Slovenian Weather Application**

VremenskaPro is a comprehensive weather application built with Next.js that provides current weather conditions, forecasts, and historical weather analysis. The application features a modern, responsive design with day/night theming and Slovenian localization.

## ✨ Features

### Current Weather
- **Real-time conditions** - Temperature, humidity, wind speed, precipitation
- **Day/Night theming** - Dynamic styling based on time of day
- **Weather icons** - Animated SVG icons with day/night variants
- **Location detection** - Automatic geolocation with reverse geocoding

### Weather Forecasts
- **Hourly forecasts** - Next 12 hours with temperatures and conditions
- **7-day daily forecasts** - High/low temperatures, precipitation probability
- **Detailed metrics** - Wind speed, sunrise/sunset times, UV index
- **Temperature visualization** - Visual temperature range bars

### Historical Weather Analysis
- **Historical data** - Access to past weather records
- **Statistical analysis** - Weather extremes, averages, and patterns
- **Time period selection** - 2 weeks default, up to 1 month
- **Pattern recognition** - Most common weather conditions analysis

### City Search
- **Global city search** - Find weather for any city worldwide
- **Autocomplete** - Real-time search suggestions
- **Location details** - City, region, and country information
- **Dedicated search page** - Clean, focused search experience

### User Experience
- **Responsive design** - Mobile-first, works on all devices
- **Slovenian localization** - Weather descriptions in Slovenian
- **Modern UI** - Clean, intuitive interface with smooth animations
- **Fast loading** - Optimized performance with Next.js

## 🚀 Getting Started

### Prerequisites
- Node.js 18.0 or later
- npm, yarn, pnpm, or bun package manager

### Installation

1. **Clone the repository**
```bash
git clone [repository-url]
cd weather-ai
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Run the development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. **Open the application**
Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with navigation
│   ├── page.tsx           # Home page with current weather
│   ├── search/            # City search page
│   └── history/           # Weather history page
├── components/            # React components
│   ├── layout/           # Layout components
│   │   ├── Navbar.tsx    # Main navigation
│   │   └── Footer.tsx    # Page footer
│   ├── weather/          # Weather-specific components
│   │   ├── CurrentWeather.tsx    # Current conditions card
│   │   ├── HourlyWeather.tsx     # Hourly forecast
│   │   ├── DailyWeather.tsx      # Daily forecast
│   │   └── WeatherHistory.tsx    # Historical analysis
│   ├── CitySearch.tsx    # City search component
│   └── ui/               # Reusable UI components
├── lib/                  # Utility libraries
│   ├── weather-api.ts    # Weather API integration
│   └── geolocation.ts    # Location services
└── public/               # Static assets
    └── animated/         # Weather icon SVGs
```

## 🔧 Technical Stack

### Frontend Framework
- **Next.js 14** - React framework with App Router
- **React 18** - Component library with hooks
- **TypeScript** - Type-safe development

### Styling & UI
- **Tailwind CSS** - Utility-first CSS framework
- **Responsive Design** - Mobile-first approach
- **Custom Components** - Reusable UI elements

### Weather APIs
- **Open-Meteo API** - Current weather and forecasts
- **Open-Meteo Historical Archive** - Historical weather data
- **Open-Meteo Geocoding** - City search functionality

### Location Services
- **Browser Geolocation API** - User location detection
- **BigDataCloud API** - Reverse geocoding
- **Geographic Search** - Global city lookup

## 📡 API Integration

### Weather Data
- **Current Weather**: Real-time conditions from Open-Meteo
- **Forecasts**: Hourly and daily forecasts up to 7 days
- **Historical Data**: Archive data for weather analysis
- **Weather Codes**: Comprehensive weather condition mapping

### Location Services
- **Geolocation**: Browser-based position detection
- **Reverse Geocoding**: Coordinates to location names
- **City Search**: Global city and location lookup

## 🎨 Design Features

### Day/Night Theming
- **Dynamic Styling**: Changes based on current time of day
- **Weather Icons**: Day and night variants for weather conditions
- **Color Schemes**: Blue gradients for day, dark themes for night

### Responsive Layout
- **Mobile-First**: Optimized for mobile devices
- **Flexible Grid**: Adapts to different screen sizes
- **Touch-Friendly**: Large buttons and interactive elements

### Slovenian Localization
- **Weather Descriptions**: All conditions in Slovenian
- **Date Formatting**: Slovenian date and time formats
- **Navigation**: Slovenian menu items and labels

## 🔧 Development

### Code Organization
- **Component-Based**: Modular React components
- **Type Safety**: Full TypeScript implementation
- **Clean Architecture**: Separated concerns and utilities
- **Comprehensive Documentation**: JSDoc comments throughout

### Performance Optimization
- **Next.js Optimization**: Built-in performance features
- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic bundling optimization
- **Caching**: Efficient API response handling

## 📱 Pages & Components

### Home Page (`/`)
- Current weather for user's location
- Hourly and daily forecasts
- Link to city search

### Search Page (`/search`)
- Global city search functionality
- Weather display for selected cities
- Autocomplete suggestions

### History Page (`/history`)
- Historical weather analysis
- Statistical insights
- Time period selection

## 🌐 Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge
- **Mobile Browsers**: iOS Safari, Chrome Mobile
- **Geolocation**: Requires HTTPS in production

## 📄 License

This project is part of a diploma thesis and is intended for educational purposes.

---

**VremenskaPro** - Advanced Weather Intelligence for Slovenia 🇸🇮

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
