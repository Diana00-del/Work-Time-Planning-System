import { LockOutlined } from "@mui/icons-material";
import { Avatar, Container, CssBaseline, Grid, Link, Paper, Typography } from "@mui/material";
import { Form } from "react-final-form";
import { Link as RouterLink } from "react-router-dom";
import InitializePasswordResetForm, { InitializePasswordResetFormValues } from "./InitializePasswordResetForm";
import { object, string } from "yup";
import useValidate from "@/utils/useValidate";
import usePasswordReset from "@/services/PasswordReset";
import { useSnackbarContext } from "@/contexts/Snacks";

function InitializePasswordReset() {
  const { initializePasswordReset } = usePasswordReset();
  const { showInfo, showError } = useSnackbarContext();

  const handleSubmit = (values: InitializePasswordResetFormValues) => {
    initializePasswordReset(values.email)
      .then(() => showInfo("Password reset email sent", "Password Reset"))
      .catch(error => showError(error.message, "Failed to send password reset email"));
  };

  const validationSchema = object({
    email: string().email("Invalid email address").required("Email required")
  });
  const validate = useValidate(validationSchema);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper
        elevation={3}
        sx={{
          marginTop: 8,
          padding: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Reset Password
        </Typography>
        
        <Form onSubmit={handleSubmit} validate={validate}>
          {(props) => <InitializePasswordResetForm {...props} />}
        </Form>

        <Grid container>
          <Grid item xs>
            <Link to="/login" variant="body2" component={RouterLink}>
              Return to login
            </Link>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default InitializePasswordReset;
