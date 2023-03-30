import clsx from "clsx";
import Link from "next/link";
import type { PropsWithChildren } from "react";
import { forwardRef } from "react";

import { Container } from "../layout/Container";
import { NextLinkOrA, type NextLinkOrAProps } from "../utils/NextLinkOrA";

export const Footer = ({ children, className }: PropsWithChildren<{ className?: string }>) => (
  <footer className={clsx("fr-footer", className)} role="contentinfo" id="footer">
    <Container>{children}</Container>
  </footer>
);

export type FooterBodyProps = {
  description: string;
  items?: React.ReactNode;
  logo: React.ReactNode;
};

export const FooterBody = ({ children }: PropsWithChildren) => <div className="fr-footer__body">{children}</div>;

export const FooterBodyBrand = ({ children }: PropsWithChildren) => {
  return <div className="fr-footer__brand fr-enlarge-link">{children}</div>;
};

export const FooterBodyContent = ({ children }: PropsWithChildren) => {
  return <div className="fr-footer__content">{children}</div>;
};

export const FooterBodyContentDescription = ({ children }: PropsWithChildren) => {
  return <p className="fr-footer__content-desc">{children}</p>;
};

export const FooterBodyContentItems = ({ children }: PropsWithChildren) => {
  return <ul className="fr-footer__content-list">{children}</ul>;
};

export const FooterBodyItem = ({ children }: PropsWithChildren) => {
  return <li className="fr-footer__content-item">{children}</li>;
};

export const FooterBottom = ({ children }: PropsWithChildren) => {
  return (
    <div className="fr-footer__bottom">
      <nav>
        <ul className="fr-footer__bottom-list">{children}</ul>
      </nav>
      <div className="fr-footer__bottom-copy">
        <p>
          Sauf mention contraire, tous les contenus de ce site sont sous{" "}
          <Link href="https://github.com/SocialGouv/mda/blob/main/LICENSE" target="_blank" rel="noreferrer">
            licence Apache 2.0
          </Link>
        </p>
      </div>
    </div>
  );
};

export const FooterBottomItem = ({ children }: PropsWithChildren) => {
  return <li className="fr-footer__bottom-item">{children}</li>;
};

export const FooterBottomLink = forwardRef<HTMLAnchorElement, NextLinkOrAProps>(({ children, ...rest }, ref) => {
  return (
    <NextLinkOrA className="fr-footer__bottom-link" ref={ref} {...rest}>
      {children}
    </NextLinkOrA>
  );
});

FooterBottomLink.displayName = "FooterBottomLink";

export const FooterContentLink = ({ children, ...rest }: NextLinkOrAProps) => {
  return (
    <NextLinkOrA className="fr-footer__content-link" {...rest}>
      {children}
    </NextLinkOrA>
  );
};
