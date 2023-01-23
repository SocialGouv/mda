"use client";

import { config } from "@common/config";
import { Logo, LogoMda } from "@design-system";
import { MainNav, MainNavItem } from "@design-system/client";
import clsx from "clsx";
import Link from "next/link";
import { useEffect, useState } from "react";

export const Header = () => {
  const [navOpen, setNavOpen] = useState(false);
  useEffect(() => {
    if (navOpen) {
      document.body.style.setProperty("--scroll-top", "0px");
    } else {
      document.body.style.removeProperty("--scroll-top");
    }
  }, [navOpen]);

  return (
    <header role="banner" className="fr-header" id="header">
      <div className="fr-header__body">
        <div className="fr-container">
          <div className="fr-header__body-row">
            <div className="fr-header__brand fr-enlarge-link">
              <div className="fr-header__brand-top">
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
                <Link href="/">
                  <p className="fr-header__service-title">{config.siteTitle}</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={clsx("fr-header__menu fr-modal", navOpen && "fr-modal--opened")}
        id="modal-main-nav"
        aria-labelledby="button-main-nav"
      >
        <div className="fr-container">
          <button
            className="fr-btn--close fr-btn"
            aria-controls="modal-main-nav"
            title="Fermer"
            onClick={() => setNavOpen(false)}
          >
            Fermer
          </button>
          <MainNav>
            <MainNavItem href="/fiches-pratiques">Fiches pratiques</MainNavItem>
            <MainNavItem href="/mon-parcours">Mon parcours</MainNavItem>
            <MainNavItem href="/mon-diagnostique">Mon diagnostique</MainNavItem>
          </MainNav>
        </div>
      </div>
    </header>
  );
};