// src/features/mosque/MosqueForm.tsx
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Box, TextField, Button, Typography, Alert, Stack } from '@mui/material';
import { useCreateMosqueMutation, type NewMosque } from '../../app/mosqueApi';
import { useNavigate } from 'react-router-dom';

interface Props {
  initialCoords: { lat: number; lng: number };
}

export default function MosqueForm({ initialCoords }: Props) {
  const navigate = useNavigate();
  const [createMosque, { isLoading, error }] = useCreateMosqueMutation();
  const { control, handleSubmit } = useForm<NewMosque>({
    defaultValues: {
      name:         '',
      address_line: '',
      city:         '',
      state:        '',
      country:      '',
      postal_code:  '',
      location_type:'',
      latitude:     initialCoords.lat,
      longitude:    initialCoords.lng
    }
  });

  const onSubmit = async (data: NewMosque) => {
    try {
      await createMosque({
        ...data,
        latitude:  initialCoords.lat,
        longitude: initialCoords.lng
      }).unwrap();
      navigate('/under-review');
    } catch {
      /* error shown below */
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
      <Typography variant="h5" mb={2}>
        Register Your Mosque
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {/* adjust based on your error shape */}
          {(error as any).data?.error || 'Failed to register mosque'}
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Controller
            name="name"
            control={control}
            rules={{ required: 'Name is required' }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Mosque Name"
                fullWidth
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />

          <Controller
            name="address_line"
            control={control}
            rules={{ required: 'Address is required' }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Address Line"
                fullWidth
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Controller
              name="city"
              control={control}
              rules={{ required: 'City is required' }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="City"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />

            <Controller
              name="state"
              control={control}
              render={({ field }) => (
                <TextField {...field} label="State (optional)" fullWidth />
              )}
            />
          </Stack>

          <Controller
            name="country"
            control={control}
            rules={{ required: 'Country is required' }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Country"
                fullWidth
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />

          <Controller
            name="postal_code"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Postal Code (optional)" fullWidth />
            )}
          />

          <Controller
            name="location_type"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Location Type (optional)" fullWidth />
            )}
          />

          <Box textAlign="right" mt={2}>
            <Button type="submit" variant="contained" disabled={isLoading}>
              {isLoading ? 'Submitting…' : 'Submit'}
            </Button>
          </Box>
        </Stack>
      </form>
    </Box>
  );
}
