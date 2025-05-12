import { useState, useEffect } from 'react';

export interface Coords { lat: number; lng: number; }

export default function useGeolocation() {
  const [coords, setCoords] = useState<Coords | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => setCoords({ lat: coords.latitude, lng: coords.longitude }),
      () => setError('Location access is required to register your mosque.')
    );
  }, []);

  return { coords, error };
}
