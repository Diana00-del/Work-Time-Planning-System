import { MultiselectField } from "@/components/form/MultiselectField";
import TextField from "@/components/form/TextField";
import { useSnackbarContext } from "@/contexts/Snacks";
import useUsers, { CreateUser, User } from "@/services/Users";
import useValidate from "@/utils/useValidate";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { Form } from "react-final-form";
import { array, object, string } from "yup";

export interface CreateUserFormDialogProps {
  open: boolean;
  onClose: () => void;
  onUserCreate: (user: User) => void;
}

export default function CreateUserFormDialog(
  { open, onClose, onUserCreate }: CreateUserFormDialogProps
) {
  const { add } = useUsers();
  const { showSuccess, showError } = useSnackbarContext();

  const handleSubmit = (values: CreateUser) => {
    add({ ...values, roles: [] })
      .then((user) => {
        onUserCreate(user);
        onClose();
        showSuccess("User created successfully", "User Created");
      })
      .catch((error) => showError(error.message, "Failed to create user"));
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
      aria-labelledby="create-user-dialog-title"
      aria-describedby="create-user-dialog-description"
      fullWidth
      maxWidth="sm"
    >
      <Form onSubmit={handleSubmit} validate={validate}>
        {({ handleSubmit, form, submitting, pristine }) => (
          <form onSubmit={handleSubmit}>
            <DialogTitle id="create-user-dialog-title">Create User</DialogTitle>
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
              <Button type="submit" disabled={submitting || pristine} variant="contained" color="primary">Create</Button>
            </DialogActions>
          </form>
        )}
      </Form>
    </Dialog>
  );
}