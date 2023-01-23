import { type FormInputProps, FormGroup, FormGroupLabel, FormGroupMessage, FormInput } from "@design-system";
import { type HTMLInputTypeAttribute, forwardRef } from "react";
import { type FieldError } from "react-hook-form";

type FormGroupInputProps = FormInputProps & {
  error?: FieldError;
  hint?: string;
  label: string;
  name: string;
  type: HTMLInputTypeAttribute;
};

export const FormGroupInput = forwardRef<HTMLInputElement, FormGroupInputProps>(
  ({ id, name, label, hint, isError, isDisabled, error, ...rest }, ref) => (
    <FormGroup isError={Boolean(error)}>
      <FormGroupLabel htmlFor={name} hint={hint}>
        {label}
      </FormGroupLabel>
      <FormInput
        id={id || name}
        isDisabled={isDisabled}
        isError={Boolean(error)}
        name={name}
        ref={ref}
        aria-describedby={isError ? `msg-${name}` : undefined}
        {...rest}
      />
      {error && <FormGroupMessage id={`msg-${name}`}>{error.message}</FormGroupMessage>}
    </FormGroup>
  ),
);

FormGroupInput.displayName = "FormGroupInput";
