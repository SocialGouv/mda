import Link, { type LinkProps } from "next/link";
import { type PropsWithChildren } from "react";

export type NextLinkOrAProps = PropsWithChildren<
  {
    /** Is the link outside of the router? */
    isExternal?: boolean;
  } & (LinkProps | React.AnchorHTMLAttributes<HTMLAnchorElement>)
>;

export const NextLinkOrA = <Props extends NextLinkOrAProps>({ children, href, isExternal, ...rest }: Props) =>
  href ? (
    isExternal ? (
      <a href={href.toString()} {...rest}>
        {children}
      </a>
    ) : (
      <Link href={href} {...rest}>
        {children}
      </Link>
    )
  ) : (
    <a {...rest}>{children}</a>
  );
