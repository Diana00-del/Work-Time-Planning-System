import { FormControl } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import { DateTime } from "luxon";
import { useField } from "react-final-form";

// Definicja właściwości komponentu DatetimeField
export interface DatetimeFieldProps {
  id: string;
  name: string;
  label: string;
  required?: boolean;
}

export function DatetimeField(
  { id, name, label, required }: DatetimeFieldProps
) {
  const { input, meta } = useField(name);

  return (
    <FormControl variant="outlined"
      fullWidth
      margin="normal"
      error={meta.error && meta.touched}
      required={required}
      onBlur={input.onBlur}
      onFocus={input.onFocus}
    >
      <DateTimePicker
        label={label}
        ampm={false}
        format="DDD HH:mm"
        value={input.value ? DateTime.fromJSDate(new Date(input.value)) : null}
        onChange={(value) => input.onChange(value?.toJSDate() ?? null)}
        slotProps={{
          textField: {
            id: id,
            error: (meta.error && meta.touched) || meta.submitError,
            helperText: meta.error || meta.submitError
          }
        }}
      />
    </FormControl>
  );
}