import clsx from "clsx";
import { type PropsWithChildren } from "react";

export const Fieldset = ({ children, label, className }: PropsWithChildren<{ className?: string; label?: string }>) => {
  return (
    <fieldset className={clsx("fr-fieldset", className)} aria-label={label}>
      <legend className="fr-fieldset__legend">{label}</legend>
      {children}
    </fieldset>
  );
};

export const FieldsetElement = ({ children, className }: PropsWithChildren<{ className?: string }>) => {
  return <div className={clsx("fr-fieldset__element", className)}>{children}</div>;
};
