"use client";

import { Menu } from "@headlessui/react";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { type PropsWithChildren, Fragment } from "react";

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

export const MainNavItemWithDropdown = ({
  links,
  title,
}: PropsWithChildren<{ links: Array<{ href: string; label: string }>; title: string }>) => {
  const currentPathName = usePathname();
  const parentPath = currentPathName ? `/${currentPathName.split("/")[1]}` : undefined;
  const subLinkParentUrl = `/${links.map(link => link.href.split("/")[1])[0]}`;
  const isCurrent = subLinkParentUrl === parentPath ? "page" : undefined;
  return (
    <Menu as="li" className="fr-nav__item">
      <Menu.Button className="fr-nav__btn" aria-current={isCurrent}>
        {title}
      </Menu.Button>
      <Menu.Items>
        <div className="fr-menu">
          <div className="fr-menu__list">
            {links.map(link => (
              <Menu.Item key={link.href} as={Fragment}>
                <NextLinkOrA href={link.href} className={clsx("fr-nav__link")}>
                  {link.label}
                </NextLinkOrA>
              </Menu.Item>
            ))}
          </div>
        </div>
      </Menu.Items>
    </Menu>
  );
};
