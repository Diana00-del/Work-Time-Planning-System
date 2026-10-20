import useAuth from "@/contexts/Auth";
import useValidate from "@/utils/useValidate";
import { LockOutlined } from "@mui/icons-material";
import { Avatar, Container, CssBaseline, Grid, Link, Paper, Typography } from "@mui/material";
import { Form } from "react-final-form";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { object, string } from "yup";
import { LoginForm, LoginFormValues } from "./LoginForm";
import { useSnackbarContext } from "@/contexts/Snacks";

function Login() {
  const auth = useAuth();
  const navigate = useNavigate();
  const { showSuccess, showError } = useSnackbarContext();

  const handleSubmit = (values: LoginFormValues) => {
    auth.login(values.email, values.password)
      .then(() => {
        navigate("/");
        showSuccess("Logged in successfully", "Login");
      })
      .catch(error => showError(error.message, "Failed to login"));
  };

  const validationSchema = object({
    email: string().email("Invalid email address").required("Email required"),
    password: string().required("Password required"),
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
          Sign in
        </Typography>
        
        <Form onSubmit={handleSubmit} validate={validate}>
          {(props) => <LoginForm {...props} />}
        </Form>
        
        <Grid container>
          <Grid item xs>
            <Link to="/initialize-password-reset" variant="body2" component={RouterLink}>
              Forgot password?
            </Link>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default Login;
