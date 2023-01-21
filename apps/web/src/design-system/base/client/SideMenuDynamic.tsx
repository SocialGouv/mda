"use client";

import clsx from "clsx";
import { type CSSProperties, type PropsWithChildren, useState } from "react";
import { useCollapse } from "src/design-system/hooks/useCollapse";

export type SideMenuProps = {
  buttonLabel: string;
};

export const SideMenuDynamic = ({ buttonLabel, children }: PropsWithChildren<SideMenuProps>) => {
  const [isExpanded, setExpanded] = useState(false);
  const wrapperId = "fr-sidemenu-wrapper";
  const { item, collapse } = useCollapse(wrapperId, isExpanded);

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
          <ul className="fr-sidemenu__list">{children}</ul>
        </div>
      </div>
    </nav>
  );
};
