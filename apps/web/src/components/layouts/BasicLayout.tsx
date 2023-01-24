"use client";

import "@gouvfr/dsfr/dist/dsfr.main.min.css";
import "@gouvfr/dsfr/dist/utility/icons/icons-system/icons-system.min.css";
import "@gouvfr/dsfr/dist/utility/icons/icons-user/icons-user.min.css";
import "@gouvfr/dsfr/dist/utility/icons/icons-business/icons-business.min.css";
import "@gouvfr/dsfr/dist/utility/icons/icons-map/icons-map.min.css";
import "@gouvfr/dsfr/dist/utility/icons/icons-design/icons-design.min.css";

import { config } from "@common/config";
import {
  Footer,
  FooterBody,
  FooterBodyBrand,
  FooterBodyContent,
  FooterBodyContentDescription,
  FooterBodyContentItems,
  FooterBodyItem,
  FooterBottom,
  FooterBottomItem,
  FooterBottomLink,
  FooterContentLink,
  Logo,
  LogoMda,
  MainNav,
  MainNavItem,
  Notice,
  SkipLinks,
  SkipLinksItem,
} from "@design-system";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type PropsWithChildren, useEffect, useState } from "react";
import { NextLinkOrA } from "src/design-system/utils/NextLinkOrA";

import { BreadcrumbDynamic } from "../base/BreadcrumbDynamic";

export const BasicLayout = ({ children }: PropsWithChildren) => {
  const [navOpen, setNavOpen] = useState(false);
  const currentPathName = usePathname();

  useEffect(() => {
    if (navOpen) {
      document.body.style.setProperty("--scroll-top", "0px");
    } else {
      document.body.style.removeProperty("--scroll-top");
    }
  }, [navOpen]);

  return (
    <>
      <SkipLinks>
        <SkipLinksItem href="#content">Contenu</SkipLinksItem>
        <SkipLinksItem href="#header">Menu</SkipLinksItem>
        <SkipLinksItem href="#footer">Pied de page</SkipLinksItem>
      </SkipLinks>
      <Notice>Service en version beta</Notice>
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
              <MainNavItem href="/annuaire">Annuaire</MainNavItem>
              <MainNavItem href="/glossaire">Glossaire</MainNavItem>
            </MainNav>
          </div>
        </div>
      </header>
      {currentPathName !== "/" && <BreadcrumbDynamic />}
      <main role="main" id="content">
        {children}
      </main>
      <Footer>
        <FooterBody>
          <FooterBodyBrand>
            <Link href="/">
              <Logo />
            </Link>
          </FooterBodyBrand>
          <FooterBodyContent>
            <FooterBodyContentDescription>
              Ce site est une version beta en cours de déploiement progressif. Il sera enrichi au fur et à mesure des
              retours des personnes concernées. Un oubli&nbsp;? Une suggestion&nbsp;? Utilisez le module{" "}
              <NextLinkOrA href="/je-donne-mon-avis">Je donne mon avis</NextLinkOrA> pour soumettre vos idées afin de
              contribuer à enrichir ce service public construit par et pour les personnes autistes et leurs proches.
            </FooterBodyContentDescription>
            <FooterBodyContentDescription>
              Attention, les demandes personnelles transmises via ce formulaire ne pourront être traités sur ce site,
              veuillez vous rapprocher de l'organisme en charge de votre dossier. Pour toute question, vous pouvez
              contacter{" "}
              <a href="https://www.autismeinfoservice.fr/" target="_blank" rel="noreferrer">
                Autisme Info Services
              </a>
              .
            </FooterBodyContentDescription>
            <FooterBodyContentItems>
              <FooterBodyItem>
                <FooterContentLink href="https://www.legifrance.gouv.fr/" target="_blank" rel="noreferrer">
                  legifrance.gouv.fr
                </FooterContentLink>
              </FooterBodyItem>
              <FooterBodyItem>
                <FooterContentLink href="https://www.gouvernement.fr/" target="_blank" rel="noreferrer">
                  gouvernement.fr
                </FooterContentLink>
              </FooterBodyItem>
              <FooterBodyItem>
                <FooterContentLink href="https://www.service-public.fr/" target="_blank" rel="noreferrer">
                  service-public.fr
                </FooterContentLink>
              </FooterBodyItem>
              <FooterBodyItem>
                <FooterContentLink href="https://www.data.gouv.fr/" target="_blank" rel="noreferrer">
                  data.gouv.fr
                </FooterContentLink>
              </FooterBodyItem>
            </FooterBodyContentItems>
          </FooterBodyContent>
        </FooterBody>
        <FooterBottom>
          <FooterBottomItem>
            <FooterBottomLink href="/accessibilite">Accessibilité&nbsp;: non conforme</FooterBottomLink>
          </FooterBottomItem>
          <FooterBottomItem>
            <FooterBottomLink href="/cgu">CGU</FooterBottomLink>
          </FooterBottomItem>
          <FooterBottomItem>
            <FooterBottomLink href="/mentions-legales">Mentions légales</FooterBottomLink>
          </FooterBottomItem>
          <FooterBottomItem>
            <FooterBottomLink href="/politique-de-confidentialite">Politique de confidentialité</FooterBottomLink>
          </FooterBottomItem>
          <FooterBottomItem>
            <FooterBottomLink href="/je-donne-mon-avis">Je donne mon avis</FooterBottomLink>
          </FooterBottomItem>
        </FooterBottom>
      </Footer>
    </>
  );
};
