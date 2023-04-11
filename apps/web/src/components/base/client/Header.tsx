"use client";

import { config } from "@common/config";
import { Logo, LogoMda } from "@design-system";
import { MainNav, MainNavItem, MainNavItemWithDropdown } from "@design-system/client";
import { type GetAttributesValues } from "@mda/strapi-types";
import clsx from "clsx";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { type PropsWithChildren, useEffect, useRef, useState } from "react";

export const Header = ({ menuItems }: { menuItems: GetAttributesValues<"api::menu.menu">["item"] }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [navOpen, setNavOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchPhrase, setSearchPhrase] = useState("");
  const [isDialog, setIsDialog] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    const handleRouteChange = () => {
      if (inputRef.current !== null) {
        inputRef.current.value = "";
      }
    };
    handleRouteChange();
  }, [pathname]);

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

  const handleSearch = () => {
    router.push(`/recherche?keyword=${searchPhrase}`);
    setSearchOpen(false);
  };

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
                    className="fr-btn--search fr-btn"
                    data-fr-opened="false"
                    aria-controls="modal-search"
                    id="button-search"
                    title="Rechercher"
                    onClick={() => setSearchOpen(true)}
                  >
                    Rechercher
                  </button>
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
                <Link href="/" aria-label={`Retour à la page d'accueil de : ${config.siteTitle}`}>
                  <p className="fr-header__service-title">{config.siteTitle}</p>
                </Link>
              </div>
            </div>

            <div className="fr-header__tools">
              <div
                className={clsx("fr-header__search fr-modal", searchOpen && "fr-modal--opened")}
                id="modal-search"
                aria-labelledby="button-search"
                role={isDialog ? "dialog" : undefined}
                aria-modal={isDialog ? "true" : undefined}
              >
                <div className="fr-container fr-container-lg--fluid">
                  <button
                    className="fr-btn--close fr-btn"
                    aria-controls="modal-search"
                    title="Fermer"
                    onClick={() => setSearchOpen(false)}
                  >
                    Fermer
                  </button>
                  <div className="fr-search-bar" role="search">
                    <label className="fr-label" htmlFor="search">
                      Rechercher
                    </label>
                    <input
                      className="fr-input"
                      placeholder="Rechercher"
                      type="search"
                      id="search"
                      name="search"
                      ref={inputRef}
                      value={searchPhrase}
                      onChange={e => setSearchPhrase(e.target.value)}
                      onKeyDown={e => {
                        if (e.keyCode === 13) {
                          handleSearch();
                        }
                      }}
                    />

                    <button className="fr-btn" title="Rechercher" type="submit" onClick={() => handleSearch()}>
                      Rechercher
                    </button>
                  </div>
                </div>
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
            {menuItems?.map(item =>
              item.__component === "menu.menu-item" ? (
                <MainNavLink key={item.id} href={item.url}>
                  {item.text}
                </MainNavLink>
              ) : (
                <MainNavItemWithDropdown
                  key={item.id}
                  title={item.text}
                  links={item.dropdown.map(item => {
                    return {
                      id: item.id,
                      label: item.text,
                      href: item.url,
                      onClick: () => setNavOpen(false),
                    };
                  })}
                />
              ),
            )}
          </MainNav>
        </div>
      </div>
    </header>
  );
};
