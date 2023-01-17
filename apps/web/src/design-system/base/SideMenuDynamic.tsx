"use client";

import clsx from "clsx";
import { usePathname } from "next/navigation";
import type { CSSProperties } from "react";
import { useState } from "react";

import { useCollapse } from "../hooks/useCollapse";
import { SideMenuLink } from "./SideMenu";

export type SideMenuProps = {
  buttonLabel: string;
  data: Array<{
    href: string;
    text: string;
  }>;
};

export const SideMenu = ({ buttonLabel, data }: SideMenuProps) => {
  const [isExpanded, setExpanded] = useState(false);
  const wrapperId = "fr-sidemenu-wrapper";
  const { item, collapse } = useCollapse(wrapperId, isExpanded);
  const currentPathName = usePathname();

  return (
    <nav className="fr-sidemenu fr-sidemenu--sticky" aria-label="Menu latéral" role="navigation">
      <div className="fr-sidemenu__inner">
        <button
          className="fr-sidemenu__btn"
          hidden
          aria-controls={wrapperId}
          aria-expanded={isExpanded}
          onClick={() => setExpanded(!isExpanded)}
        >
          {buttonLabel}
        </button>
        <div
          className={clsx("fr-collapse", isExpanded && "fr-collapse--expanded")}
          id={wrapperId}
          style={
            {
              "--collapse-max-height": item.stateHeight,
              "--collapse": collapse,
            } as CSSProperties
          }
        >
          <ul className="fr-sidemenu__list">
            {data.map(({ href, text }, index) => (
              <SideMenuLink key={index} href={href} isCurrent={href === currentPathName}>
                {text}
              </SideMenuLink>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};
