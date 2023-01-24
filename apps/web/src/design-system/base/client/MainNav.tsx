"use client";

import { usePathname } from "next/navigation";
import type { PropsWithChildren } from "react";

import { NextLinkOrA } from "../../utils/NextLinkOrA";

export const MainNav = ({ children }: PropsWithChildren) => {
  return (
    <nav className="fr-nav" id="header-navigation" role="navigation" aria-label="Menu principal">
      <ul className="fr-nav__list">{children}</ul>
    </nav>
  );
};

export type MainNavItemProps = PropsWithChildren<{ href: string }>;

export const MainNavItem = ({ children, href }: MainNavItemProps) => {
  const currentPathName = usePathname();
  const parentPath = currentPathName ? `/${currentPathName.split("/")[1]}` : undefined;
  const isCurrent = href === parentPath ? "page" : undefined;

  return (
    <li className="fr-nav__item">
      <NextLinkOrA href={href} className="fr-nav__link" aria-current={isCurrent}>
        {children}
      </NextLinkOrA>
    </li>
  );
};
