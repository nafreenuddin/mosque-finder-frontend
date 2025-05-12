import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function KnowledgeModal({ open, onClose }: Props) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute' as const,
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          p: 4, borderRadius: 1, boxShadow: 24,
          maxWidth: 400, textAlign: 'center'
        }}
      >
        <Typography variant="h6" gutterBottom>
          Why we need your location
        </Typography>
        <Typography sx={{ mb: 3 }}>
          To ensure you’re physically at the mosque when registering, we capture
          your GPS coordinates directly from your device. This prevents
          fraudulent or out-of-area registrations.
        </Typography>
        <Button variant="contained" onClick={onClose}>
          I Understand
        </Button>
      </Box>
    </Modal>
  );
}
