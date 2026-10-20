import { object, ref, string } from "yup";
import ResetPasswordForm, { ResetPasswordFormValues } from "./ResetPasswordForm";
import useValidate from "@/utils/useValidate";
import { Avatar, Container, CssBaseline, Paper, Typography } from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { Form } from "react-final-form";
import usePasswordReset from "@/services/PasswordReset";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSnackbarContext } from "@/contexts/Snacks";

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const { resetPassword } = usePasswordReset();
  const navigate = useNavigate();
  const { showSuccess, showError } = useSnackbarContext();

  const handleSubmit = (values: ResetPasswordFormValues) => {
    const token = searchParams.get("token") || "";
    resetPassword(values.password, token)
      .then(() => {
        navigate("/login");
        showSuccess("Password reset successfully", "Password Reset");
      })
      .catch(error => showError(error.message, "Failed to reset password"));
  };

  const validationSchema = object({
    password: string().required("Password required")
      .min(8, "Password must be at least 8 characters")
      .max(64, "Password must be at most 64 characters"),
    confirmPassword: string()
      .required("Confirm Password required")
      .oneOf([ref("password")], "Passwords must match")
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
          Set New Password
        </Typography>
        
        <Form onSubmit={handleSubmit} validate={validate}>
          {(props) => <ResetPasswordForm {...props} />}
        </Form>
      </Paper>
    </Container>
  );
}

export default ResetPassword;
