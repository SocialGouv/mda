import clsx from "clsx";
import type { PropsWithChildren } from "react";
import { forwardRef } from "react";

import { NextLinkOrA } from "../utils/NextLinkOrA";

export const SideMenuTitle = ({ children }: PropsWithChildren) => <div className="fr-sidemenu__title">{children}</div>;

export type SideMenuLinkProps = PropsWithChildren<
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    isCurrent?: boolean;
  }
>;

export const SideMenuLink = forwardRef<HTMLAnchorElement, SideMenuLinkProps>(
  ({ isCurrent, children, href, ...rest }, ref) => (
    <li className={clsx("fr-sidemenu__item", isCurrent && "fr-sidemenu__item--active")}>
      <NextLinkOrA
        className="fr-sidemenu__link"
        aria-current={isCurrent ? "page" : undefined}
        target="_self"
        {...rest}
        ref={ref}
        href={href}
      >
        {children}
      </NextLinkOrA>
    </li>
  ),
);

SideMenuLink.displayName = "SideMenuLink";
