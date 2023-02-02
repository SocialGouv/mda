import clsx from "clsx";
import { type PropsWithChildren } from "react";

import type { IconStyles } from "../utils/IconStyles";
import { NextLinkOrA } from "../utils/NextLinkOrA";

export type LinkProps = {
  href?: string;
  iconLeft?: IconStyles;
  iconRight?: IconStyles;
  isCurrent?: boolean;
  isDisabled?: boolean;
  rel?: string;
  size?: "lg" | "sm";
  target?: string;
  title?: string;
};

export const Link = ({
  href,
  children,
  size,
  iconLeft,
  iconRight,
  target,
  isDisabled,
  isCurrent,
  ...rest
}: PropsWithChildren<LinkProps>) => (
  <NextLinkOrA
    href={href || undefined}
    aria-current={isCurrent ? "page" : undefined}
    aria-disabled={isDisabled || !href ? true : undefined}
    className={clsx(
      "fr-link",
      size === "sm" && "fr-link--sm",
      size === "lg" && "fr-link--lg",
      iconLeft && `fr-link--icon-left ${iconLeft}`,
      iconRight && `fr-link--icon-right ${iconRight}`,
    )}
    target={target}
    rel={target === "_blank" ? "noopener noreferrer" : undefined}
    {...rest}
  >
    {children}
  </NextLinkOrA>
);

Link.displayName = "Link";
