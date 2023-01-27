import clsx from "clsx";
import { type PropsWithChildren } from "react";

import styles from "./CollapsedSection.module.css";

export type CollapsedSectionProps = PropsWithChildren<{
  id: string;
  isOpen?: boolean;
  openSection: (id: string, isOpen: boolean) => void;
  title: string;
}>;

export const CollapsedSection = ({ children, title, id, isOpen, openSection }: CollapsedSectionProps) => {
  return (
    <div className={styles.section} id={id}>
      <div className={styles.head}>
        <div className={styles.bullet}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            focusable="false"
            aria-hidden="true"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12.172 7 6.808 1.636 8.222.222 16 8l-7.778 7.778-1.414-1.414L12.172 9H0V7h12.172Z"
              fill="var(--text-inverted-blue-france)"
            />
          </svg>
        </div>
        <h2 className={styles.title}>{title}</h2>
        <button onClick={_ => openSection(id, !!isOpen)} className={styles.button}>
          <span className={clsx(styles.icon, isOpen ? "fr-icon-arrow-up-s-line" : "fr-icon-arrow-down-s-line")} />
          <span className="fr-sr-only">Ouvrir la section</span>
        </button>
      </div>

      <div className={clsx(!isOpen ? styles.hiddenContent : styles.content)}>{children}</div>
    </div>
  );
};
