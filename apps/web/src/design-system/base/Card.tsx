import clsx from "clsx";
import type { PropsWithChildren } from "react";

import type { IconStyles } from "../utils/IconStyles";

export type CardProps = PropsWithChildren<{
  className?: string;
  isEnlargeLink?: boolean;
  isHorizontal?: boolean;
  noBorder?: boolean;
  size?: "lg" | "sm";
}>;

export const Card = ({ children, size, isEnlargeLink, noBorder, isHorizontal, className, ...rest }: CardProps) => {
  return (
    <div
      className={clsx(
        "fr-card",
        size === "sm" && "fr-card--sm",
        size === "lg" && "fr-card--lg",
        isEnlargeLink && "fr-enlarge-link",
        noBorder && "fr-card--no-border",
        isHorizontal && "fr-card--horizontal",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
};

export const CardBody = ({ children }: PropsWithChildren) => <div className="fr-card__body">{children}</div>;

export const CardBodyContent = ({ children }: PropsWithChildren) => <div className="fr-card__content">{children}</div>;

export const CardBodyContentEnd = ({ children }: PropsWithChildren) => <div className="fr-card__end">{children}</div>;

export const CardBodyContentStart = ({ children }: PropsWithChildren) => (
  <div className="fr-card__start">{children}</div>
);

export type CardBodyContentTitleProps = PropsWithChildren<{
  titleAs?: "h2" | "h3" | "h4" | "h5" | "h6" | "p";
}>;

export const CardBodyContentTitle = ({ children, titleAs: HtmlTag = "p" }: CardBodyContentTitleProps) => {
  return <HtmlTag className="fr-card__title">{children}</HtmlTag>;
};

export const CardBodyContentDescription = ({ children }: PropsWithChildren) => (
  <div className="fr-card__desc">{children}</div>
);

export type CardBodyContentLegendProps = PropsWithChildren<{ icon?: IconStyles }>;

export const CardBodyContentDetails = ({ children, icon }: CardBodyContentLegendProps) => (
  <p className={clsx("fr-card__detail", icon)}>{children}</p>
);

export const CardBodyFooter = ({ children }: PropsWithChildren) => <div className="fr-card__footer">{children}</div>;

export const CardHeader = ({ children }: PropsWithChildren) => <div className="fr-card__header">{children}</div>;

export const CardHeaderImg = ({ children }: PropsWithChildren) => <div className="fr-card__img">{children}</div>;
