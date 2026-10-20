import { FormControl, FormHelperText, InputLabel, MenuItem, Select as MuiSelect } from "@mui/material";
import { useField } from "react-final-form";

type Option = {
  value: string;
  label: string;
};

export interface SelectFieldProps {
  id: string;
  name: string;
  label: string;
  options: Option[];
  required?: boolean;
  autocomplete?: string;
}

export default function SelectField(
  { id, name, label, options, required, autocomplete }: SelectFieldProps
) {
  const { input, meta } = useField(name);
  const labelId = `${id}-label`;

  return (
    <FormControl variant="outlined" fullWidth margin="normal" error={meta.error && meta.touched}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <MuiSelect
        required={required}
        id={id}
        label={label}
        labelId={labelId}
        autoComplete={autocomplete}
        {...input}
        error={meta.touched && meta.error !== undefined}
      >
        {options.map((option, index) => (
          <MenuItem key={index} value={option.value}>{option.label}</MenuItem>
        ))}
      </MuiSelect>
      <FormHelperText error={meta.touched && meta.error !== undefined}>
        {meta.touched && meta.error}
      </FormHelperText>
    </FormControl>
  );
}
