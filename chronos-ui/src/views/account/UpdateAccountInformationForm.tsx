import TextField from "@/components/form/TextField";
import { useSnackbarContext } from "@/contexts/Snacks";
import useUsers, { UpdateUser, User } from "@/services/Users";
import useValidate from "@/utils/useValidate";
import { Box, Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { Form } from "react-final-form";
import { object, string } from "yup";

export default function UpdateAccountInformationForm() {
  const { self, update } = useUsers();
  const [user, setUser] = useState<User | null>(null);
  const { showSuccess, showError } = useSnackbarContext();

  useEffect(() => {
    self()
      .then(user => setUser(user))
      .catch(error => showError(error.message, "Failed to fetch account information"));
  }, []);

  const handleSubmit = (values: UpdateUser) => {
    if (!user) return;

    update(user.id, values)
      .then(() => showSuccess("Account information updated successfully", "Account Updated"))
      .catch(error => showError(error.message, "Failed to update account information"));
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
    <Form
      onSubmit={handleSubmit}
      validate={validate}
      initialValues={{
        firstName: user?.firstName,
        lastName: user?.lastName,
        email: user?.email,
        phone: user?.phone,
        address: user?.address,
        city: user?.city,
        state: user?.state,
        zip: user?.zip,
        country: user?.country
      }}
    >
      {props => (
        <form onSubmit={props.handleSubmit}>
          <TextField id="firstName" name="firstName" label="First Name" />
          <TextField id="lastName" name="lastName" label="Last Name" />
          <TextField id="email" name="email" label="Email" />
          <TextField id="phone" name="phone" label="Phone" />
          <TextField id="address" name="address" label="Address" />
          <TextField id="city" name="city" label="City" />
          <TextField id="state" name="state" label="State" />
          <TextField id="zip" name="zip" label="Zip" />
          <TextField id="country" name="country" label="Country" />

          <Box sx={{ marginTop: 2 }} />
          <Grid container spacing={2}>
            <Grid item>
              <Button variant="contained" color="primary" type="submit">Update</Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="secondary" type="reset">Reset</Button>
            </Grid>
          </Grid>
        </form>
      )}
    </Form>
  );
}