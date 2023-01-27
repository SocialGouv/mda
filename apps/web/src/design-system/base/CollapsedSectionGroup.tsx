import clsx from "clsx";
import { type PropsWithChildren } from "react";

import styles from "./CollapsedSectionGroup.module.css";

export const CollapsedSectionGroup = ({ children, className }: PropsWithChildren<{ className?: string }>) => (
  <div className={className}>{children}</div>
);

export const CollapsedSectionGroupHead = ({ children, className }: PropsWithChildren<{ className?: string }>) => (
  <div className={clsx("fr-mb-4w fr-text-right", className)}>{children}</div>
);

export const CollapsedSectionGroupBody = ({ children }: PropsWithChildren) => (
  <div className={styles.body}>{children}</div>
);
