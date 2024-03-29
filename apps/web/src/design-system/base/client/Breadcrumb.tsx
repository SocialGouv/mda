"use client";

import clsx from "clsx";
import type { PropsWithChildren } from "react";
import { useState } from "react";

import { NextLinkOrA, type NextLinkOrAProps } from "../../utils/NextLinkOrA";

export const Breadcrumb = ({ children, className }: PropsWithChildren<{ className?: string }>) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <nav role="navigation" className={clsx("fr-breadcrumb", className)} aria-label="vous êtes ici :">
      <button
        className="fr-breadcrumb__button"
        aria-expanded={isExpanded}
        aria-controls="breadcrumb"
        onClick={() => setIsExpanded(true)}
      >
        Voir le fil d’Ariane
      </button>
      <div className={clsx(!isExpanded && "fr-collapse")} id="breadcrumb">
        <ol className="fr-breadcrumb__list">{children}</ol>
      </div>
    </nav>
  );
};

export type BreadcrumbItemProps = PropsWithChildren<{ href?: string; isCurrent?: boolean }>;

export const BreadcrumbItem = ({ href, isCurrent, children }: BreadcrumbItemProps) => {
  const props: NextLinkOrAProps = isCurrent ? { "aria-current": isCurrent && "page" } : { href, passHref: true };
  return (
    <li>
      <NextLinkOrA {...props} className="fr-breadcrumb__link">
        {children}
      </NextLinkOrA>
    </li>
  );
};
