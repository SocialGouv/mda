import clsx from "clsx";
import type { PropsWithChildren } from "react";

export type ContainerProps = PropsWithChildren<{
  className?: string;
}>;

export const Container = ({ children, className, ...rest }: ContainerProps) => {
  return (
    <div className={clsx("fr-container", className)} {...rest}>
      {children}
    </div>
  );
};
