import clsx from "clsx";
import type { PropsWithChildren } from "react";

export type AlertProps = PropsWithChildren<{
  className?: string;
  size?: "md" | "sm";
  type?: "error" | "info" | "success" | "warning";
}>;

export const Alert = ({ type = "info", size = "md", children, className, ...rest }: AlertProps) => {
  return (
    <div
      role="alert"
      className={clsx(
        "fr-alert",
        type === "error" && "fr-alert--error",
        type === "success" && "fr-alert--success",
        type === "info" && "fr-alert--info",
        type === "warning" && "fr-alert--warning",
        size === "sm" && "fr-alert--sm",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
};

export type AlertTitleProps = PropsWithChildren<{ as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" }>;

export const AlertTitle = ({ as: HtmlTag = "p", children, ...rest }: AlertTitleProps) => {
  return (
    <HtmlTag className="fr-alert__title" {...rest}>
      {children}
    </HtmlTag>
  );
};
