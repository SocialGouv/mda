import clsx from "clsx";
import type { PropsWithChildren } from "react";

export const LinkGroup = ({
  className,
  children,
  ...rest
}: PropsWithChildren<{
  className?: string;
}>) => {
  return (
    <ul className={clsx("fr-links-group", className)} {...rest}>
      {children}
    </ul>
  );
};

export const LinkGroupItem = ({ children }: PropsWithChildren) => <li>{children}</li>;
