import { TextField as MuiTextField } from "@mui/material";
import { useField } from "react-final-form";

export interface TextFieldProps {
  id: string;
  name: string;
  label: string;
  required?: boolean;
  autocomplete?: string;
  multiline?: boolean;
  rows?: number;
}

export default function TextField(
  { id, name, label, required, autocomplete, multiline, rows }: TextFieldProps
) {
  const field = useField(name);

  return (
    <MuiTextField
      variant="outlined"
      margin="normal"
      required={required}
      multiline={multiline}
      rows={rows}
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