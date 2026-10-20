import TextField from "@/components/form/TextField";
import { Button } from "@mui/material";
import { FormRenderProps } from "react-final-form";

export type InitializePasswordResetFormValues = {
  email: string;
};

export type InitializePasswordResetFormProps = FormRenderProps<InitializePasswordResetFormValues>;

export default function InitializePasswordResetForm(props: InitializePasswordResetFormProps) {
  const { handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit} noValidate>
      <TextField id="email" name="email" label="Email Address" autocomplete="email"/>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Send Reset Email
      </Button>
    </form>
  );
}
