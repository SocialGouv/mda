import clsx from "clsx";
import type { HTMLInputTypeAttribute } from "react";
import { forwardRef } from "react";

import type { IconStyles } from "../utils/IconStyles";
import styles from "./FormInput.module.css";

type _FormInputCustomTypes = HTMLInputTypeAttribute | "percentage";

export type FormInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  autocomplete?: string;
  icon?: IconStyles;
  isDisabled?: boolean;
  isError?: boolean;
  isValid?: boolean;
};

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ type = "text", isError, isValid, isDisabled, icon, id, ...rest }, ref) => {
    if (type === "percentage") {
      return (
        <div className="fr-input-wrap">
          <input
            className={clsx("fr-input", isError && "fr-input--error", isValid && "fr-input--valid", styles.input)}
            type="number"
            min="0"
            max="100"
            step="0.1"
            disabled={isDisabled}
            aria-invalid={isError ? "true" : undefined}
            ref={ref}
            {...rest}
          />
        </div>
      );
    }
    return (
      <div className={clsx("fr-input-wrap", icon, type === "date" && "fr-icon-calendar-line")}>
        <input
          id={id}
          className={clsx("fr-input", isError && "fr-input--error", isValid && "fr-input--valid", styles.input)}
          type={type}
          disabled={isDisabled}
          aria-invalid={isError ? "true" : undefined}
          ref={ref}
          {...rest}
        />
      </div>
    );
  },
);

FormInput.displayName = "FormInput";
