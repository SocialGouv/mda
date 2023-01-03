import clsx from "clsx";
import type { PropsWithChildren } from "react";

import { ButtonGroup } from "../base/ButtonGroup";
import styles from "./FormLayout.module.css";

export type FormLayoutProps = PropsWithChildren<{
  className?: string;
}>;

export const FormLayout = ({ className, children, ...rest }: FormLayoutProps) => {
  return (
    <div className={clsx(styles.form, className)} {...rest}>
      {children}
    </div>
  );
};

export const FormLayoutButtonGroup = ({ children }: PropsWithChildren) => {
  return (
    <ButtonGroup inline="mobile-up" className={styles["btns-group"]}>
      {children}
    </ButtonGroup>
  );
};
