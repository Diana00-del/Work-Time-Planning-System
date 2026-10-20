import PasswordField from "@/components/form/PasswordField";
import { useSnackbarContext } from "@/contexts/Snacks";
import usePasswordReset from "@/services/PasswordReset";
import useValidate from "@/utils/useValidate";
import { Box, Button, Grid } from "@mui/material";
import { Form } from "react-final-form";
import { useNavigate } from "react-router-dom";
import { object, ref, string } from "yup";

type ChangePasswordFormValues = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function ChangePasswordForm() {
  const { changePassword } = usePasswordReset();
  const { showInfo, showError } = useSnackbarContext();
  const navigate = useNavigate();

  const handleSubmit = (values: ChangePasswordFormValues) => {
    changePassword(values.oldPassword, values.newPassword)
      .then(() => {
        navigate("/login");
        showInfo("Password changed successfully", "Password Changed");
      })
      .catch(error => showError(error.message, "Failed to change password"));
  };
  
  const validationSchema = object({
    oldPassword: string().required("Old password required"),
    newPassword: string().required("New password required")
      .min(8, "Password must be at least 8 characters")
      .max(64, "Password must be at most 64 characters"),
    confirmPassword: string().required("Confirm password required")
      .oneOf([ref("newPassword")], "Passwords must match")
  });
  const validate = useValidate(validationSchema);

  return (
    <Form onSubmit={handleSubmit} validate={validate}>
      {props => (
        <form onSubmit={props.handleSubmit}>
          <PasswordField id="oldPassword" name="oldPassword" label="Old Password" />
          <PasswordField id="newPassword" name="newPassword" label="New Password" />
          <PasswordField id="confirmPassword" name="confirmPassword" label="Confirm Password" />

          <Box sx={{ marginTop: 2 }} />
          <Grid container spacing={2}>
            <Grid item>
              <Button variant="contained" color="primary" type="submit">Change Password</Button>
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