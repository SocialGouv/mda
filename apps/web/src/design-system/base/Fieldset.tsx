import clsx from "clsx";
import { type PropsWithChildren } from "react";

export const Fieldset = ({
  children,
  label,
  className,
  labelClassName,
}: PropsWithChildren<{ className?: string; label?: string; labelClassName?: string }>) => {
  return (
    <fieldset className={clsx("fr-fieldset", className)} aria-label={label}>
      <legend className={clsx("fr-fieldset__legend", labelClassName)}>{label}</legend>
      {children}
    </fieldset>
  );
};

export const FieldsetContent = ({ children, className }: PropsWithChildren<{ className?: string }>) => {
  return <div className={clsx("fr-fieldset__content", className)}>{children}</div>;
};

export const FieldsetElement = ({ children, className }: PropsWithChildren<{ className?: string }>) => {
  return <div className={clsx("fr-fieldset__element", className)}>{children}</div>;
};
