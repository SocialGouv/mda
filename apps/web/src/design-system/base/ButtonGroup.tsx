import clsx from "clsx";
import type { PropsWithChildren } from "react";

export type ButtonGroupProps = PropsWithChildren<{
  className?: string;
  inline?: "desktop-up" | "mobile-up" | "tablet-up";
}>;

export const ButtonGroup = ({ inline, className, children, ...rest }: ButtonGroupProps) => {
  return (
    <div
      className={clsx(
        "fr-btns-group",
        inline === "mobile-up" && "fr-btns-group--inline-sm",
        inline === "tablet-up" && "fr-btns-group--inline-md",
        inline === "desktop-up" && "fr-btns-group--inline-lg",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
};
