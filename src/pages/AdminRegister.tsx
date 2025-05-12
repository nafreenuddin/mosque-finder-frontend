import { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  Stack,
  CircularProgress,
  Container,
  Paper,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import {
  useRegisterAdminMutation,
  useVerifyRegistrationMutation
} from '../app/authApi';
import { useNavigate } from 'react-router-dom';

type Step1Inputs = {
  mobile: string;
  name: string;
  email: string;
};

type Step2Inputs = {
  code: string;
};

export default function AdminRegisterPage() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [step, setStep] = useState<1 | 2>(1);
  const [otpFromServer, setOtp] = useState<string | null>(null);

  const [registerAdmin, { isLoading: regLoading, error: regError }] =
    useRegisterAdminMutation();
  const [verifyReg, { isLoading: verLoading, error: verError }] =
    useVerifyRegistrationMutation();

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors: step1Errors }
  } = useForm<Step1Inputs>({
    mode: 'onBlur',
    defaultValues: {
      mobile: '',
      name: '',
      email: ''
    }
  });

  const {
    control: otpControl,
    handleSubmit: handleOtpSubmit,
    formState: { errors: otpErrors }
  } = useForm<Step2Inputs>({
    mode: 'onBlur',
    defaultValues: {
      code: ''
    }
  });

  const onStep1Submit = async (data: Step1Inputs) => {
    try {
      const response = await registerAdmin(data).unwrap();
      setOtp(response.otp);
      setStep(2);
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  const onStep2Submit = async (data: Step2Inputs) => {
    try {
      const step1Data = getValues();
      const pin = window.prompt('Set a 4-digit PIN:') || '';
      const pinConfirm = window.prompt('Confirm your PIN:') || '';

      await verifyReg({
        mobile: step1Data.mobile,
        code: data.code,
        name: step1Data.name,
        email: step1Data.email,
        pin,
        pinConfirm
      }).unwrap();

      navigate('/admin/login');
    } catch (error) {
      console.error('Verification error:', error);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        px: 2
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: isMobile ? 3 : 4,
          borderRadius: 3,
          width: '100%',
          maxWidth: 500,
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)'
        }}
      >
        <Typography
          variant={isMobile ? 'h5' : 'h4'}
          component="h1"
          align="center"
          gutterBottom
          sx={{ fontWeight: 700, mb: 3 }}
        >
          Admin Registration
        </Typography>

        {step === 1 && (
          <form onSubmit={handleSubmit(onStep1Submit)} noValidate>
            <Stack spacing={3}>
              {regError && (
                <Alert severity="error">
                  {(regError as any)?.data?.error || 'Failed to send OTP'}
                </Alert>
              )}

              <Controller
                name="mobile"
                control={control}
                rules={{
                  required: 'Mobile number is required',
                  pattern: {
                    value: /^\+\d{7,15}$/,
                    message: 'Invalid mobile number. Use international format (+1234567890)'
                  }
                }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Mobile Number"
                    placeholder="+1234567890"
                    variant="outlined"
                    type="tel"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />

              <Controller
                name="name"
                control={control}
                rules={{
                  required: 'Full name is required',
                  minLength: {
                    value: 2,
                    message: 'Name must be at least 2 characters'
                  }
                }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Full Name"
                    variant="outlined"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />

              <Controller
                name="email"
                control={control}
                rules={{
                  required: 'Email address is required',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Please enter a valid email address'
                  }
                }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Email Address"
                    type="email"
                    variant="outlined"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={regLoading}
                sx={{
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 600
                }}
              >
                {regLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  'Send OTP'
                )}
              </Button>
            </Stack>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleOtpSubmit(onStep2Submit)} noValidate>
            <Stack spacing={3}>
              {otpFromServer && (
                <Alert severity="info">
                  Dev OTP: <strong>{otpFromServer}</strong>
                </Alert>
              )}

              {verError && (
                <Alert severity="error">
                  {(verError as any)?.data?.error || 'Failed to verify OTP'}
                </Alert>
              )}

              <Controller
                name="code"
                control={otpControl}
                rules={{
                  required: 'OTP is required',
                  pattern: {
                    value: /^\d{4,6}$/,
                    message: 'OTP must be 4-6 digits'
                  }
                }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="OTP Code"
                    type="number"
                    variant="outlined"
                    inputProps={{
                      inputMode: 'numeric',
                      pattern: '[0-9]*',
                      min: 0
                    }}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={verLoading}
                sx={{
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 600
                }}
              >
                {verLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  'Verify OTP'
                )}
              </Button>

              <Button
                variant="outlined"
                color="secondary"
                fullWidth
                onClick={() => setStep(1)}
                sx={{
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: 'none'
                }}
              >
                Back to Registration
              </Button>
            </Stack>
          </form>
        )}
      </Paper>
    </Container>
  );
}
