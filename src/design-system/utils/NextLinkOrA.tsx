import Link, { type LinkProps } from "next/link";
import { type PropsWithChildren } from "react";

export type NextLinkOrAProps = LinkProps | React.AnchorHTMLAttributes<HTMLAnchorElement>;

export const NextLinkOrA = <Props extends NextLinkOrAProps>({ children, href, ...rest }: PropsWithChildren<Props>) =>
  href ? (
    <Link href={href} {...rest}>
      {children}
    </Link>
  ) : (
    <a {...rest}>{children}</a>
  );
