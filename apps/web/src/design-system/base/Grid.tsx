import clsx from "clsx";
import type { PropsWithChildren } from "react";

import styles from "./Grid.module.css";

export type GridProps = PropsWithChildren<{
  className?: string;
  haveGutters?: boolean;
  justifyCenter?: boolean;
}>;

export const Grid = ({ children, haveGutters, justifyCenter, className, ...rest }: GridProps) => (
  <div
    className={clsx(
      "fr-grid-row",
      haveGutters && "fr-grid-row--gutters",
      justifyCenter && styles.justifyCenter,
      className,
    )}
    {...rest}
  >
    {children}
  </div>
);

type ColsNumberType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type GridColProps = PropsWithChildren & {
  className?: string;
  lg?: ColsNumberType;
  md?: ColsNumberType;
  sm?: ColsNumberType;
  xl?: ColsNumberType;
};

export const GridCol = ({ sm = 12, md, lg, xl, className, children, ...rest }: GridColProps) => (
  <div
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
  </div>
);
