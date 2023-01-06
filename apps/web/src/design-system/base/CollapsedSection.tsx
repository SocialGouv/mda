"use client";

import clsx from "clsx";
import { type PropsWithChildren, useState } from "react";

import styles from "./CollapsedSection.module.css";

export type CollapsedSectionProps = PropsWithChildren<{
  title: string;
}>;

export const CollapsedSection = ({ children, title }: CollapsedSectionProps) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={styles.section}>
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
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12.172 7 6.808 1.636 8.222.222 16 8l-7.778 7.778-1.414-1.414L12.172 9H0V7h12.172Z"
              fill="var(--text-inverted-blue-france)"
            />
          </svg>
        </div>
        <h2 className={styles.title}>{title}</h2>
        <button onClick={() => setOpen(!open)} className={styles.button}>
          <span className={clsx(styles.icon, open ? "fr-icon-arrow-up-s-line" : "fr-icon-arrow-down-s-line")} />
          <span className="fr-sr-only">Ouvrir la section</span>
        </button>
      </div>

      {open && <div className={clsx(!open ? styles.hide : styles.content)}>{children}</div>}
    </div>
  );
};
