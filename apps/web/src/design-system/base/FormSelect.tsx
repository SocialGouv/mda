import clsx from "clsx";
import { forwardRef } from "react";

export type FormSelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  className?: string;
  isDisabled?: boolean;
  isError?: boolean;
  isValid?: boolean;
  placeholderHidden?: boolean;
  placeholderSelected?: boolean;
};

export const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  (
    { placeholder, className, isDisabled, isValid, isError, children, placeholderSelected, placeholderHidden, ...rest },
    ref,
  ) => {
    return (
      <select
        className={clsx("fr-select", isError && "fr-select--error", isValid && "fr-select--valid", className)}
        disabled={isDisabled}
        {...rest}
        ref={ref}
        {...(placeholderSelected ? { defaultValue: "" } : {})}
      >
        {placeholder && (
          <option value="" disabled hidden={placeholderHidden}>
            {placeholder}
          </option>
        )}

        {children}
      </select>
    );
  },
);

FormSelect.displayName = "FormSelect";
