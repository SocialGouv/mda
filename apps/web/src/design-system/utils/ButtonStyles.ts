import clsx from "clsx";

import type { IconStyles } from "./IconStyles";

export type ButtonStylesProps = {
  iconLeft?: IconStyles;
  iconOnly?: IconStyles;
  iconRight?: IconStyles;
  isRounded?: boolean;
  size?: "lg" | "sm";
  variant?: "primary" | "secondary" | "tertiary-no-border" | "tertiary";
};

export const buttonStyles = ({ variant, size, iconLeft, iconRight, iconOnly, isRounded }: ButtonStylesProps): string =>
  clsx(
    "fr-btn",
    variant === "secondary" && "fr-btn--secondary",
    variant === "tertiary" && "fr-btn--tertiary",
    variant === "tertiary-no-border" && "fr-btn--tertiary-no-outline",
    size === "sm" && "fr-btn--sm",
    size === "lg" && "fr-btn--lg",
    isRounded && "fr-btn--round",
    iconLeft && `fr-btn--icon-left ${iconLeft}`,
    iconRight && `fr-btn--icon-right ${iconRight}`,
    iconOnly,
  );
