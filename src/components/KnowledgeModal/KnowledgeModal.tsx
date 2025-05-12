import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

interface KnowledgeModalProps {
  open: boolean;
  onClose: () => void;
  onAccept: () => void;
}

export const KnowledgeModal = ({ open, onClose, onAccept }: KnowledgeModalProps) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Why We Need Your Location</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To register a mosque, we need your current location to:
          <ul>
            <li>Verify the mosque's location</li>
            <li>Help others find mosques near them</li>
            <li>Ensure accurate prayer time calculations</li>
          </ul>
          We respect your privacy and only use your location for these purposes.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onAccept} color="primary" variant="contained">
          Allow Location Access
        </Button>
      </DialogActions>
    </Dialog>
  );
};