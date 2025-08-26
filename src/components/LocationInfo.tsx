"use client";

import { GeocodingResult } from '@/lib/geolocation';

interface LocationInfoProps {
  location: Partial<GeocodingResult> | null;
  error: string | null;
  loading: boolean;
}

export default function LocationInfo({ location, error, loading }: LocationInfoProps) {
  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-bold mb-2">Vaša trenutna lokacija</h2>
      {loading && <p>Pridobivanje lokacije...</p>}
      {error && !loading && <p className="text-red-500">Napaka: {error}</p>}
      {location && !loading && (
        <div>
          <p><strong>Mesto:</strong> {location.name}</p>
          <p><strong>Država:</strong> {location.country}</p>
          <p><strong>Koordinate:</strong> {location.latitude?.toFixed(4)}, {location.longitude?.toFixed(4)}</p>
        </div>
      )}
    </div>
  );
}
