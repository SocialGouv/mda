import { type PropsWithChildren } from "react";

import styles from "./FormGroupStep.module.css";

export const FormGroupSteps = ({ children }: PropsWithChildren) => {
  return <div className={styles.steps}>{children}</div>;
};

export const FormGroupStep = ({ children }: PropsWithChildren) => {
  return <div className={styles.step}>{children}</div>;
};
