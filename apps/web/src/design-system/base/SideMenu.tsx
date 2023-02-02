import clsx from "clsx";
import Link from "next/link";
import type { PropsWithChildren } from "react";
import { forwardRef } from "react";

export const SideMenuTitle = ({ children }: PropsWithChildren) => <div className="fr-sidemenu__title">{children}</div>;

export type SideMenuLinkProps = PropsWithChildren<{
  href: string;
  isCurrent?: boolean;
}>;

export const SideMenuLink = forwardRef<HTMLAnchorElement, SideMenuLinkProps>(
  ({ isCurrent, children, href, ...rest }, ref) => (
    <li className={clsx("fr-sidemenu__item", isCurrent && "fr-sidemenu__item--active")}>
      <Link
        className="fr-sidemenu__link"
        aria-current={isCurrent ? "page" : undefined}
        target="_self"
        {...rest}
        ref={ref}
        href={href}
      >
        {children}
      </Link>
    </li>
  ),
);

SideMenuLink.displayName = "SideMenuLink";
