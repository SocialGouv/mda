"use client";

import { Menu } from "@headlessui/react";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, type PropsWithChildren } from "react";

import { NextLinkOrA } from "../../utils/NextLinkOrA";
import styles from "./MainNav.module.css";

export const MainNav = ({ children }: PropsWithChildren) => {
  return (
    <nav className="fr-nav" id="header-navigation" role="navigation" aria-label="Menu principal">
      <ul className="fr-nav__list">{children}</ul>
    </nav>
  );
};

export type MainNavItemProps = PropsWithChildren<{ href: string; onClick?: () => void }>;

export const MainNavItem = ({ children, href, onClick }: MainNavItemProps) => {
  const currentPathName = usePathname();
  const parentPath = currentPathName ? `/${currentPathName.split("/")[1]}` : undefined;
  const isCurrent = href === parentPath ? "page" : undefined;

  return (
    <li className="fr-nav__item">
      <NextLinkOrA href={href} className="fr-nav__link" aria-current={isCurrent} onClick={onClick}>
        {children}
      </NextLinkOrA>
    </li>
  );
};

export const MainNavItemWithDropdown = ({
  links,
  title,
}: PropsWithChildren<{ links: Array<{ href: string; label: string; onClick?: () => void }>; title: string }>) => {
  const currentPathName = usePathname();
  const parentPath = currentPathName ? `/${currentPathName.split("/")[1]}` : undefined;
  const subLinkParentUrl = `/${links.map(link => link.href.split("/")[1])[0]}`;
  const isCurrent = subLinkParentUrl === parentPath ? "page" : undefined;
  return (
    <Menu as="li" className="fr-nav__item">
      <Menu.Button className="fr-nav__btn" aria-current={isCurrent}>
        {title}
      </Menu.Button>
      <Menu.Items className="fr-menu">
        <div className="fr-menu__list">
          {links.map(link => (
            <Menu.Item key={link.href} as={Fragment}>
              <Link href={link.href} className={clsx("fr-nav__link", styles.sublink)} onClick={link.onClick}>
                {link.label}
              </Link>
            </Menu.Item>
          ))}
        </div>
      </Menu.Items>
    </Menu>
  );
};
