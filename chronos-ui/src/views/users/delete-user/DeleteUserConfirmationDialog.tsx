import { useSnackbarContext } from "@/contexts/Snacks";
import useUsers, { User } from "@/services/Users";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";

export interface DeleteUserConfirmationDialogProps {
  user: User;
  open: boolean;
  onClose: () => void;
  onUserDelete: (userId: number) => void;
}

export default function DeleteUserConfirmationDialog(
  { user, open, onClose, onUserDelete }: DeleteUserConfirmationDialogProps
) {
  const { deleteUser } = useUsers();
  const { showSuccess, showError } = useSnackbarContext();

  const handleSubmit = () => {
    deleteUser(user.id)
      .then(() => {
        onUserDelete(user.id);
        onClose();
        showSuccess("User deleted successfully", "User Deleted");
      })
      .catch((error) => showError(error.message, "Failed to delete user"));
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="edit-user-dialog-title"
      aria-describedby="edit-user-dialog-description"
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle id="edit-user-dialog-title">Delete User</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          Are you sure you want to delete user {user.firstName} {user.lastName}?
        </Typography>
        <Typography variant="body1">
          This action cannot be undone.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}