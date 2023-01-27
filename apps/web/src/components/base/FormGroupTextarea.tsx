import { type FormTextareaProps, FormGroup, FormGroupLabel, FormGroupMessage, FormTextarea } from "@design-system";
import { forwardRef } from "react";
import { type FieldError } from "react-hook-form";

type FormGroupTextareaProps = FormTextareaProps & {
  error?: FieldError;
  hint?: string;
  isDisabled?: boolean;
  label: string;
  name: string;
};

export const FormGroupTextarea = forwardRef<HTMLTextAreaElement, FormGroupTextareaProps>(
  ({ name, label, hint, error, isDisabled, ...rest }, ref) => (
    <FormGroup isError={Boolean(error)}>
      <FormGroupLabel htmlFor={name} hint={hint}>
        {label}
      </FormGroupLabel>
      <FormTextarea
        id={name}
        isDisabled={isDisabled}
        isError={Boolean(error)}
        name={name}
        ref={ref}
        aria-describedby={error ? `msg-${name}` : undefined}
        {...rest}
      />
      {error && <FormGroupMessage id={`msg-${name}`}>{error.message}</FormGroupMessage>}
    </FormGroup>
  ),
);

FormGroupTextarea.displayName = "FormGroupTextarea";
