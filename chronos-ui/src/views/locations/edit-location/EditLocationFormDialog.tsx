import TextField from "@/components/form/TextField";
import { useSnackbarContext } from "@/contexts/Snacks";
import useLocations, { Location, UpdateLocation } from "@/services/Locations";
import useValidate from "@/utils/useValidate";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { Form } from "react-final-form";
import { object, string } from "yup";

export interface EditLocationFormDialogProps {
  open: boolean;
  onClose: () => void;
  location: Location;
  onLocationUpdate: (location: Location) => void;
}

export default function EditLocationFormDialog(
  { open, onClose, location, onLocationUpdate }: EditLocationFormDialogProps
) {
  const { update } = useLocations();
  const { showSuccess, showError } = useSnackbarContext();

  const handleSubmit = (values: UpdateLocation) => {
    update(location.id, values)
      .then((location) => {
        onLocationUpdate(location);
        onClose();
        showSuccess("Location updated successfully", "Location Updated");
      })
      .catch(error => showError(error.message, "Failed to update location"));
  };

  const initialValues: UpdateLocation = {
    name: location.name,
    address: location.address,
    city: location.city,
    state: location.state,
    zip: location.zip,
    country: location.country,
    phone: location.phone,
    email: location.email
  };

  const validationSchema = object({
    name: string().required().min(2).max(255),
    address: string().required().max(512),
    city: string().required().max(128),
    state: string().required().max(128),
    zip: string().required().max(32),
    country: string().required().max(128),
    phone: string().required().max(64),
    email: string().required().email().max(128)
  });
  const validate = useValidate(validationSchema);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="edit-location-dialog-title"
      aria-describedby="edit-location-dialog-description"
      fullWidth
      maxWidth="sm"
    >
      <Form onSubmit={handleSubmit} validate={validate} initialValues={initialValues}>
        {({ handleSubmit, form, submitting, pristine }) => (
          <form onSubmit={handleSubmit}>
            <DialogTitle id="edit-location-dialog-title">Edit Location</DialogTitle>
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
                color="primary"
                onClick={() => {
                  form.reset();
                  onClose();
                }}
              >
                Cancel
              </Button>
              <Button type="submit" color="primary" disabled={submitting || pristine}>
                Edit
              </Button>
            </DialogActions>
          </form>
        )}
      </Form>
    </Dialog>
  );
}
