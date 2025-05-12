//import React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import useGeolocation from '../../hooks/useGeoLocation';

interface Props {
  onReady: (coords: { lat: number; lng: number }) => void;
}

export default function LocationGate({ onReady }: Props) {
  const { coords, error } = useGeolocation();

  if (error) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (!coords) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Allow location access to continue…</Typography>
      </Box>
    );
  }

  // once we have coords, hand them up
  onReady(coords);
  return null;
}
