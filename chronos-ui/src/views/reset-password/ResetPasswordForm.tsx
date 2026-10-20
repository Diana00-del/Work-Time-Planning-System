import PasswordField from "@/components/form/PasswordField";
import { Button } from "@mui/material";
import { FormRenderProps } from "react-final-form";

export type ResetPasswordFormValues = {
  password: string;
  confirmPassword: string;
};

export type ResetPasswordFormProps = FormRenderProps<ResetPasswordFormValues>;

export default function ResetPasswordForm(props: ResetPasswordFormProps) {
  const { handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit} noValidate>
      <PasswordField id="password" name="password" label="Password" autocomplete="new-password"/>
      <PasswordField id="confirmPassword" name="confirmPassword" label="Confirm Password" autocomplete="new-password"/>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Reset Password
      </Button>
    </form>
  );
}