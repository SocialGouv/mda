import clsx from "clsx";
import type { PropsWithChildren } from "react";

import { Container } from "../layout/Container";
import styles from "./Notice.module.css";

export const Notice = ({
  children,
  className,
  isInsideContent,
}: PropsWithChildren<{ className?: string; isInsideContent?: boolean }>) => {
  return (
    <div className={clsx("fr-notice fr-notice--info", isInsideContent && styles.isInsideContent, className)}>
      <Container>
        <div className="fr-notice__body">
          <div className={clsx("fr-notice__title", isInsideContent && "fr-text--regular")}>{children}</div>
        </div>
      </Container>
    </div>
  );
};
