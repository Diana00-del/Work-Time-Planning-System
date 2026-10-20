import TextField from "@/components/form/TextField";
import { useSnackbarContext } from "@/contexts/Snacks";
import useUsers, { UpdateUser, User } from "@/services/Users";
import useValidate from "@/utils/useValidate";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { Form } from "react-final-form";
import { object, string } from "yup";

export interface EditUserFormDialogProps {
  user: User;
  open: boolean;
  onClose: () => void;
  onUserUpdate: (user: User) => void;
}

export default function EditUserFormDialog(
  { user, open, onClose, onUserUpdate }: EditUserFormDialogProps
) {
  const { update } = useUsers();
  const { showSuccess, showError } = useSnackbarContext();

  const handleSubmit = (values: UpdateUser) => {
    update(user.id, values)
      .then((updatedUser) => {
        onUserUpdate(updatedUser);
        onClose();
        showSuccess("User updated successfully", "User Updated");
      })
      .catch((error) => showError(error.message, "Failed to update user"));
  };

  const initialValues: UpdateUser = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    address: user.address,
    city: user.city,
    state: user.state,
    zip: user.zip,
    country: user.country
  };

  const validationSchema = object({
    firstName: string().required().min(2).max(128),
    lastName: string().required().min(2).max(128),
    email: string().required().email().max(128),
    phone: string().required().max(32),
    address: string().required().max(512),
    city: string().required().max(128),
    state: string().required().max(128),
    zip: string().required().max(32),
    country: string().required().max(128)
  });
  const validate = useValidate(validationSchema);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="edit-user-dialog-title"
      aria-describedby="edit-user-dialog-description"
      fullWidth
      maxWidth="sm"
    >
      <Form onSubmit={handleSubmit} validate={validate} initialValues={initialValues}>
        {({ handleSubmit, form, submitting, pristine }) => (
          <form onSubmit={handleSubmit}>
            <DialogTitle id="edit-user-dialog-title">Edit User</DialogTitle>
            <DialogContent>
              <TextField id="firstName" name="firstName" label="First Name" />
              <TextField id="lastName" name="lastName" label="Last Name" />
              <TextField id="email" name="email" label="Email" />
              <TextField id="phone" name="phone" label="Phone" />
              <TextField id="address" name="address" label="Address" />
              <TextField id="city" name="city" label="City" />
              <TextField id="state" name="state" label="State" />
              <TextField id="zip" name="zip" label="Zip" />
              <TextField id="country" name="country" label="Country" />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  form.reset();
                  onClose();
                }}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={submitting || pristine} variant="contained" color="primary">Edit</Button>
            </DialogActions>
          </form>
        )}
      </Form>
    </Dialog>
  );
}