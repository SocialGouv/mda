import { type PropsWithChildren } from "react";

import type { ButtonStylesProps } from "../utils/ButtonStyles";
import { buttonStyles } from "../utils/ButtonStyles";
import { NextLinkOrA, type NextLinkOrAProps } from "../utils/NextLinkOrA";

export type ButtonAsLinkProps = ButtonStylesProps &
  NextLinkOrAProps & {
    href?: string;
    isCurrent?: boolean;
    isDisabled?: boolean;
    onClick?: () => void;
    rel?: string;
    target?: string;
    title?: string;
  };

export const ButtonAsLink = ({
  href,
  isCurrent,
  isDisabled,
  variant,
  size,
  iconLeft,
  iconRight,
  iconOnly,
  isRounded,
  target,
  children,
  ...rest
}: PropsWithChildren<ButtonAsLinkProps>) => (
  <NextLinkOrA
    href={href || undefined}
    aria-current={isCurrent ? "page" : undefined}
    aria-disabled={isDisabled || !href ? true : undefined}
    className={buttonStyles({ variant, size, iconLeft, iconRight, iconOnly, isRounded })}
    target={target}
    rel={target === "_blank" ? "noopener noreferrer" : undefined}
    {...rest}
  >
    {children}
  </NextLinkOrA>
);
