import clsx from "clsx";
import type { PropsWithChildren } from "react";

export type LinkGroupProps = PropsWithChildren<{
  className?: string;
}>;

export const LinkGroup = ({ className, children, ...rest }: LinkGroupProps) => {
  return (
    <div className={clsx("fr-links-group", className)} {...rest}>
      {children}
    </div>
  );
};
