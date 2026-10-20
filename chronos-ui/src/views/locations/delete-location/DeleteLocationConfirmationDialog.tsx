import { useSnackbarContext } from "@/contexts/Snacks";
import useLocations, { Location } from "@/services/Locations";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";

export interface DeleteLocationConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  location: Location;
  onLocationDelete: (locationId: number) => void;
}

export default function DeleteLocationConfirmationDialog(
  { open, onClose, location, onLocationDelete }: DeleteLocationConfirmationDialogProps
) {
  const { deleteLocation } = useLocations();
  const { showSuccess, showError } = useSnackbarContext();

  const handleDelete = () => {
    deleteLocation(location.id)
      .then(() => {
        onLocationDelete(location.id);
        showSuccess("Location deleted successfully", "Location Deleted");
        onClose();
      })
      .catch((error) => showError(error.message, "Failed to delete location"));
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="delete-location-dialog-title"
      aria-describedby="delete-location-dialog-description"
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle id="delete-location-dialog-title">Delete Location</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          Are you sure you want to delete location {location.name}?
        </Typography>
        <Typography variant="body1">
          This action cannot be undone.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleDelete} color="primary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
