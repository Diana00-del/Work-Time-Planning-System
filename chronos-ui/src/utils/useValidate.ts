import { ValidationErrors } from "final-form";
import { AnyObject, ObjectSchema, ValidationError } from "yup";

type Validator<T> = (value: T) => ValidationErrors;

export default function useValidate<T extends AnyObject>(validationSchema: ObjectSchema<T>): Validator<T> {
  return (values: T) => {
    try {
      validationSchema.validateSync(values, { abortEarly: false });
    } catch (e: unknown) {
      const error = e as ValidationError;
      return error.inner.reduce(
        (errors, error) => ({
          ...errors,
          [error.path!]: error.message
        }),
        {}
      );
    }
  };
}
