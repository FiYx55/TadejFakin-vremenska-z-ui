export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          About WeatherAI
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-blue-600">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              WeatherAI aims to provide accurate, accessible, and intelligent weather information 
              to help people make informed decisions about their daily activities and long-term planning.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-green-600">Data Source</h2>
            <p className="text-gray-600 leading-relaxed">
              We use the Open-Meteo API, which provides high-quality weather data from 
              various meteorological services worldwide, ensuring reliable and up-to-date information.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="font-semibold mb-2">Real-time Data</h3>
              <p className="text-sm text-gray-600">Current weather conditions updated regularly</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌍</span>
              </div>
              <h3 className="font-semibold mb-2">Global Coverage</h3>
              <p className="text-sm text-gray-600">Weather data for any location worldwide</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="font-semibold mb-2">Mobile Friendly</h3>
              <p className="text-sm text-gray-600">Responsive design for all devices</p>
            </div>
          </div>
        </div>

        <div className="text-center bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Technology Stack</h2>
          <p className="text-gray-600 mb-6">
            Built with modern web technologies for optimal performance and user experience
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Next.js</span>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">TypeScript</span>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Tailwind CSS</span>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Open-Meteo API</span>
          </div>
        </div>
      </div>
    </div>
  );
}
