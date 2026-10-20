import PasswordField from "@/components/form/PasswordField";
import TextField from "@/components/form/TextField";
import { Button } from "@mui/material";
import { FormRenderProps } from "react-final-form";

export type LoginFormValues = {
  email: string;
  password: string;
};

export type LoginFormProps = FormRenderProps<LoginFormValues>;

export const LoginForm = (props: LoginFormProps) => {
  const { handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit} noValidate>
      <TextField id="email" name="email" label="Email Address" autocomplete="email"/>
      <PasswordField id="password" name="password" label="Password" autocomplete="current-password"/>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Sign In
      </Button>
    </form>
  );
};