// src/pages/AdminLoginPage.tsx
import { useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Alert,
  Stack,
  CircularProgress,
  Paper,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useLoginMutation } from '../app/authApi';
import { useLazyGetMosqueStatusQuery } from '../app/adminApi';
import { useNavigate } from 'react-router-dom';

interface FormData {
  mobile: string;
  pin: string;
}

export default function AdminLoginPage() {
  const navigate = useNavigate();

  // 1) login mutation
  const [login, { isLoading: loginLoading, error: loginError }] =
    useLoginMutation();

  // 2) lazy query for status
  const [fetchStatus, { data: statusData, isSuccess: statusSuccess, isError: statusError }] =
    useLazyGetMosqueStatusQuery();

  // form
  const { control, handleSubmit } = useForm<FormData>();

  // on form submit:
  const onSubmit = async (data: FormData) => {
    try {
      await login(data).unwrap();
      // now fetch status
      await fetchStatus().unwrap();
    } catch {
      // errors displayed below
    }
  };

  // after we have statusData, route accordingly
  useEffect(() => {
    if (!statusSuccess || !statusData) return;
    const { status, isMosqueApproved, review_notes } = statusData;

    if (status === 'under_review') {
      navigate('/under-review');
    } else if (status === 'rejected') {
      navigate('/under-review', {
        state: { rejected: true, notes: review_notes }
      });
    } else if (status === 'approved' && !isMosqueApproved) {
      navigate('/setup-profile');
    } else {
      navigate('/dashboard');
    }
  }, [statusSuccess, statusData, navigate]);

  return (
    <Container maxWidth="xs" sx={{ pt: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom align="center" fontWeight="bold">
          Admin Login
        </Typography>
        <Typography variant="body2" color="textSecondary" align="center" sx={{ mb: 3 }}>
          Enter your mobile number and PIN to access the admin panel.
        </Typography>

        {loginError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {(loginError as any).data?.error || 'Login failed'}
          </Alert>
        )}
        {statusError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {(statusError as any).data?.error || 'Unable to fetch status'}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <Controller
              name="mobile"
              control={control}
              defaultValue=""
              rules={{
                required: 'Mobile is required',
                pattern: {
                  value: /^\+\d{7,15}$/,
                  message: 'Use +countrycode format'
                }
              }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Mobile"
                  placeholder="+1234567890"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />

            <Controller
              name="pin"
              control={control}
              defaultValue=""
              rules={{
                required: 'PIN is required',
                minLength: { value: 4, message: '4 digits' },
                maxLength: { value: 4, message: '4 digits' }
              }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="PIN"
                  type="password"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              disabled={loginLoading}
              sx={{
                textTransform: 'none',
                fontWeight: 'bold',
                py: 1.5,
              }}
            >
              {loginLoading ? <CircularProgress size={24} /> : 'Login'}
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
}
