"use client";

import { config } from "@common/config";
import { Logo, LogoMda } from "@design-system";
import { MainNav, MainNavItem, MainNavItemWithDropdown } from "@design-system/client";
import clsx from "clsx";
import Link from "next/link";
import { type PropsWithChildren, useEffect, useRef, useState } from "react";

export const Header = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [navOpen, setNavOpen] = useState(false);
  const [isDialog, setIsDialog] = useState(false);
  useEffect(() => {
    if (navOpen) {
      document.body.style.setProperty("--scroll-top", "0px");
      if (buttonRef.current !== null) {
        buttonRef.current.focus();
      }
    } else {
      document.body.style.removeProperty("--scroll-top");
    }
    const handleKeyDown = (event: { keyCode: number }) => {
      if (event.keyCode === 27) {
        setNavOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [navOpen]);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 992) {
        setIsDialog(true);
      } else {
        setIsDialog(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const MainNavLink = ({ href, children }: PropsWithChildren<{ href: string }>) => (
    <MainNavItem onClick={() => setNavOpen(false)} href={href}>
      {children}
    </MainNavItem>
  );

  return (
    <header role="banner" className="fr-header" id="header">
      <div className="fr-header__body">
        <div className="fr-container">
          <div className="fr-header__body-row">
            <div className="fr-header__brand fr-enlarge-link">
              <div className="fr-header__brand-top fr-no-print">
                <div className="fr-header__logo">
                  <Logo />
                </div>
                <div className="fr-header__operator">
                  <LogoMda />
                </div>
                <div className="fr-header__navbar">
                  <button
                    className="fr-btn--menu fr-btn"
                    data-fr-opened={navOpen ? "true" : "false"}
                    aria-controls="modal-main-nav"
                    aria-haspopup="menu"
                    id="button-main-nav"
                    title="Menu"
                    onClick={() => setNavOpen(true)}
                  >
                    Menu
                  </button>
                </div>
              </div>
              <div className="fr-header__service">
                <Link href="/" aria-label="Retour à la page d'accueil de La Maison de l'autisme">
                  <p className="fr-header__service-title">{config.siteTitle}</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={clsx("fr-no-print fr-header__menu fr-modal", navOpen && "fr-modal--opened")}
        id="modal-main-nav"
        role={isDialog ? "dialog" : undefined}
        aria-labelledby="button-main-nav"
        aria-modal={isDialog ? "true" : undefined}
      >
        <div className="fr-container">
          <button
            ref={buttonRef}
            className="fr-btn--close fr-btn"
            aria-controls="modal-main-nav"
            title="Fermer"
            onClick={() => setNavOpen(false)}
          >
            Fermer
          </button>
          <MainNav>
            <MainNavItemWithDropdown
              title="Mon parcours"
              links={[
                {
                  href: "/mon-parcours/personne-autiste",
                  label: "Personne autiste",
                  onClick: () => setNavOpen(false),
                },
                {
                  href: "/mon-parcours/parent-personne-aidante",
                  label: "Parent ou aidant",
                  onClick: () => setNavOpen(false),
                },
                {
                  href: "/mon-parcours/professionnel-de-sante",
                  label: "Professionnel de santé ou du médico-social",
                  onClick: () => setNavOpen(false),
                },
              ]}
            />
            <MainNavLink href="/mon-diagnostic">Mon diagnostic</MainNavLink>
            <MainNavLink href="/mes-aides">Mes aides</MainNavLink>

            <MainNavLink href="/fiches-pratiques">Fiches pratiques</MainNavLink>
            <MainNavLink href="/annuaire">Annuaire</MainNavLink>
            <MainNavLink href="/glossaire">Glossaire</MainNavLink>
            <MainNavLink href="/la-maison-de-l-autisme">La Maison de l'autisme</MainNavLink>
            <MainNavLink href="/je-donne-mon-avis">Je donne mon avis</MainNavLink>
          </MainNav>
        </div>
      </div>
    </header>
  );
};
