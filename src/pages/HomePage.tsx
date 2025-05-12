// src/pages/HomePage.tsx
import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  Stack,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function HomePage() {
  const [city, setCity] = useState('');

  const handleEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    // for now, just alert—replace with real search later
    alert(`Searching mosques in “${city}”`);
  };

  return (
    <Box>
      {/* — Hero Section — */}
      <Box
        component="main"
        sx={{ py: 6, textAlign: 'center' }}
      >
        <Container maxWidth="sm">
          <Typography variant="h3" component="h1" gutterBottom>
            Find Your Nearest Mosque
          </Typography>
          <Typography variant="body1" paragraph>
            Quickly discover mosque profiles and up-to-date prayer timings in your area.
          </Typography>

          {/* simple enquiry form */}
          <Box
            component="form"
            onSubmit={handleEnquiry}
            sx={{ mt: 4 }}
          >
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter your city"
                fullWidth
                size="small"
                variant="outlined"
              />
              <Button
                type="submit"
                variant="contained"
                size="medium"
              >
                Search
              </Button>
            </Stack>
          </Box>

          {/* CTAs into admin flow */}
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="center"
            sx={{ mt: 5 }}
          >
            <Button
              component={RouterLink}
              to="/register-mosque"
              variant="contained"
              size="large"
            >
              Register Mosque
            </Button>
            <Button
              component={RouterLink}
              to="/admin/login"
              variant="outlined"
              size="large"
            >
              Admin Login
            </Button>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
