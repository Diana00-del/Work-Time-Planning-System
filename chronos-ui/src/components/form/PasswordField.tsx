import { TextField as MuiTextField } from "@mui/material";
import { useField } from "react-final-form";

export interface PasswordFieldProps {
  id: string;
  name: string;
  label: string;
  required?: boolean;
  autocomplete?: string;
}

export default function PasswordField(
  { id, name, label, required, autocomplete }: PasswordFieldProps
) {
  const field = useField(name, {
    type: "password"
  });

  return (
    <MuiTextField
      variant="outlined"
      margin="normal"
      required={required}
      fullWidth
      id={id}
      label={label}
      autoComplete={autocomplete}
      {...field.input}
      error={field.meta.touched && field.meta.error !== undefined}
      helperText={field.meta.touched && field.meta.error}
    />
  );
}