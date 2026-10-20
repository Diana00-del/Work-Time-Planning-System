import TextField from "@/components/form/TextField";
import { useSnackbarContext } from "@/contexts/Snacks";
import useLocations, { Location } from "@/services/Locations";
import useValidate from "@/utils/useValidate";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { Form } from "react-final-form";
import { object, string } from "yup";

export interface CreateLocationFormDialogProps {
  open: boolean;
  onClose: () => void;
  onLocationCreate: (user: Location) => void;
}

export default function CreateLocationFormDialog(
  { open, onClose, onLocationCreate }: CreateLocationFormDialogProps
) {
  const { add } = useLocations();
  const { showSuccess, showError } = useSnackbarContext();

  const handleSubmit = (values: Location) => {
    add(values)
      .then((location) => {
        onLocationCreate(location);
        showSuccess("Location created successfully", "Location Created");
        onClose();
      })
      .catch(error => showError(error.message, "Failed to create location"));
  };

  const validationSchema = object({
    name: string().required().min(2).max(255),
    address: string().required().max(512),
    city: string().required().max(128),
    state: string().required().max(128),
    zip: string().required().max(32),
    country: string().required().max(128),
    phone: string().required().max(64),
    email: string().required().email().max(128),
  });
  const validate = useValidate(validationSchema);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="create-location-dialog-title"
      aria-describedby="create-location-dialog-description"
      fullWidth
      maxWidth="sm"
    >
      <Form onSubmit={handleSubmit} validate={validate}>
        {({ handleSubmit, form, submitting, pristine }) => (
          <form onSubmit={handleSubmit}>
            <DialogTitle id="create-location-dialog-title">Create Location</DialogTitle>
            <DialogContent>
              <TextField id="name" name="name" label="Name" />
              <TextField id="address" name="address" label="Address" />
              <TextField id="city" name="city" label="City" />
              <TextField id="state" name="state" label="State" />
              <TextField id="zip" name="zip" label="Zip" />
              <TextField id="country" name="country" label="Country" />
              <TextField id="phone" name="phone" label="Phone" />
              <TextField id="email" name="email" label="Email" />
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
              <Button type="submit" disabled={submitting || pristine} color="primary">Create</Button>
            </DialogActions>
          </form>
        )}
      </Form>
    </Dialog>
  );
}