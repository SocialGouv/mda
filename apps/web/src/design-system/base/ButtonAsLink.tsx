import { forwardRef } from "react";

import type { ButtonStylesProps } from "../utils/ButtonStyles";
import { buttonStyles } from "../utils/ButtonStyles";
import { NextLinkOrA } from "../utils/NextLinkOrA";

export type ButtonAsLinkProps = ButtonStylesProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    isCurrent?: boolean;
    isDisabled?: boolean;
  };

export type ButtonAsLinkRef = HTMLAnchorElement;

export const ButtonAsLink = forwardRef<ButtonAsLinkRef, ButtonAsLinkProps>(
  (
    { href, isCurrent, isDisabled, variant, size, iconLeft, iconRight, iconOnly, isRounded, target, children, ...rest },
    ref,
  ) => {
    return (
      <NextLinkOrA
        ref={ref}
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
  },
);

ButtonAsLink.displayName = "ButtonAsLink";
