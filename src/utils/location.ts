if (import.meta.env.MODE === 'development') {
  // Your development code
}export interface Location {
  latitude: number;
  longitude: number;
  accuracy?: number;
}

export const getCurrentLocation = (): Promise<Location> => {
  // In development, return mock location (Burj Khalifa coordinates as an example)
  if (process.env.NODE_ENV === 'development') {
    return Promise.resolve({
      latitude: 25.1972,
      longitude: 55.2744,
      accuracy: 100
    });
  }

  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser'));
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
        reject(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  });
};

export const isLocationPermissionGranted = async (): Promise<boolean> => {
  if (!navigator.permissions) {
    return true; // If permissions API not available, assume granted
  }
  
  const permission = await navigator.permissions.query({ name: 'geolocation' });
  return permission.state === 'granted';
};
