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
  Notice,
  SkipLinks,
  SkipLinksItem,
} from "@design-system";
import Link from "next/link";
import { type PropsWithChildren } from "react";

import styles from "./BasicLayout.module.css";

export const BasicLayout = ({ children }: PropsWithChildren) => (
  <div className={styles.basicLayout}>
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
    </header>
    <main role="main" id="content" className={styles.content}>
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
            retours des personnes concernées.Un oubli ? Une suggestion ? Utilisez le module "JeDonneMonAvis" pour
            soumettre vos idées afin de contribuer à enrichir ce service public construit par et pour les personnes
            autistes et leurs proches.
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
          <FooterBottomLink href="/cgu">CGU</FooterBottomLink>
        </FooterBottomItem>
        <FooterBottomItem>
          <FooterBottomLink href="/mentions-legales">Mentions légales</FooterBottomLink>
        </FooterBottomItem>
        <FooterBottomItem>
          <FooterBottomLink href="/politique-de-confidentialite">Politique de confidentialité</FooterBottomLink>
        </FooterBottomItem>
      </FooterBottom>
    </Footer>
  </div>
);
