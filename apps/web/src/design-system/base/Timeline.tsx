import clsx from "clsx";
import { type PropsWithChildren, type ReactNode } from "react";

import { NextLinkOrA } from "../utils/NextLinkOrA";
import styles from "./Timeline.module.css";

export const Timeline = ({ children }: PropsWithChildren) => {
  return <ul className={styles.list}>{children}</ul>;
};

export const TimelineItem = ({
  children,
  isEnlargeLink,
  footer,
}: PropsWithChildren<{ footer?: ReactNode; isEnlargeLink?: boolean }>) => {
  return (
    <li className={styles.item}>
      <div className={clsx(styles.number, isEnlargeLink && styles.numberWithLink)}>
        <div className={clsx(isEnlargeLink && "fr-enlarge-link", "fr-card fr-card--no-border", styles.itemCard)}>
          <div className="fr-card__body">
            <div className="fr-card__content">{children}</div>
            {footer && <div className={styles.footer}>{footer}</div>}
          </div>
        </div>
      </div>
    </li>
  );
};

export const TimelineItemTitle = ({
  children,
  titleAs: HtmlTag = "h2",
}: PropsWithChildren<{
  titleAs?: "h2" | "h3" | "h4" | "h5" | "h6" | "p";
}>) => {
  return <HtmlTag className="fr-card__title">{children}</HtmlTag>;
};

export const TimelineDescription = ({ children }: PropsWithChildren) => {
  return <p className="fr-card__desc">{children}</p>;
};

export const TimelineItemFooterLink = ({
  children,
  href,
  title,
}: PropsWithChildren<{ href?: string; title?: string }>) => (
  <NextLinkOrA
    href={href}
    className={clsx(styles.footerLink, "fr-link fr-link--icon-right fr-icon-arrow-right-line")}
    title={title}
  >
    {children}
  </NextLinkOrA>
);
