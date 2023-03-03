import clsx from "clsx";
import type { PropsWithChildren } from "react";

import styles from "./Grid.module.css";

export type GridProps = PropsWithChildren<{
  as?: "div" | "ol" | "ul";
  className?: string;
  haveGutters?: boolean;
  justifyCenter?: boolean;
}>;

export const Grid = ({ as: HtmlTag = "div", children, haveGutters, justifyCenter, className, ...rest }: GridProps) => (
  <HtmlTag
    className={clsx(
      styles.grid,
      "fr-grid-row",
      haveGutters && "fr-grid-row--gutters",
      justifyCenter && styles.justifyCenter,
      className,
    )}
    {...rest}
  >
    {children}
  </HtmlTag>
);

type ColsNumberType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type GridColProps = PropsWithChildren & {
  as?: "div" | "li";
  className?: string;
  lg?: ColsNumberType;
  md?: ColsNumberType;
  sm?: ColsNumberType;
  xl?: ColsNumberType;
};

export const GridCol = ({ as: HtmlTag = "div", sm = 12, md, lg, xl, className, children, ...rest }: GridColProps) => (
  <HtmlTag
    className={clsx(
      sm && `fr-col-${sm}`,
      md && `fr-col-md-${md}`,
      lg && `fr-col-lg-${lg}`,
      xl && `fr-col-xl-${xl}`,
      className,
    )}
    {...rest}
  >
    {children}
  </HtmlTag>
);
