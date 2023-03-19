import "../../styles/global.css";

import { config } from "@common/config";
import { DEFAULT_SEO_CONFIG } from "@common/config/next-seo";
import { BreadcrumbDynamic } from "@components/base/client/BreadcrumbDynamic";
import { Header } from "@components/base/client/Header";
import { DarkTheme } from "@components/utils/client/DarkTheme";
import { DsfrScript } from "@components/utils/client/DsfrScript";
import { Matomo } from "@components/utils/client/Matomo";
import { TarteAuCitronGDPR } from "@components/utils/client/TarteAuCitronGDPR";
import {
  ButtonAsLink,
  Container,
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
  Grid,
  GridCol,
  Logo,
  SkipLinks,
  SkipLinksItem,
} from "@design-system";
import { NextLinkOrA } from "@design-system/utils/NextLinkOrA";
import Link from "next/link";
import { NextSeo } from "next-seo";
import { type PropsWithChildren } from "react";

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="fr">
      <head>
        <NextSeo {...DEFAULT_SEO_CONFIG} />
        <Matomo env={config.env} />
        <TarteAuCitronGDPR env={config.env} />
        <DarkTheme />
        <DsfrScript />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <SkipLinks>
          <SkipLinksItem href="#content">Contenu</SkipLinksItem>
          <SkipLinksItem href="#header">Menu</SkipLinksItem>
          <SkipLinksItem href="#footer">Pied de page</SkipLinksItem>
        </SkipLinks>
        <Header />
        <BreadcrumbDynamic />
        <main role="main" id="content">
          {children}
        </main>
        <div className="fr-follow">
          <Container>
            <Grid>
              <GridCol>
                <div className="fr-follow__social">
                  <h2 className="fr-h5">
                    Suivez-nous
                    <br /> sur les réseaux sociaux
                  </h2>
                  <ul className="fr-btns-group">
                    <li>
                      <ButtonAsLink
                        iconOnly="fr-btn--instagram"
                        href="https://www.instagram.com/lamaisondelautisme/"
                        title="Page Instagram - nouvelle fenêtre"
                        target="_blank"
                        rel="noreferrer"
                      >
                        instagram
                      </ButtonAsLink>
                    </li>
                    <li>
                      <ButtonAsLink
                        iconOnly="fr-btn--facebook"
                        href="https://www.facebook.com/maisondelautisme"
                        title="Page facebook - nouvelle fenêtre"
                        target="_blank"
                        rel="noreferrer"
                      >
                        facebook
                      </ButtonAsLink>
                    </li>
                    <li>
                      <ButtonAsLink
                        iconOnly="fr-btn--linkedin"
                        href=" https://www.linkedin.com/company/maisondelautisme"
                        target="_blank"
                        title="Page LinkedIn - nouvelle fenêtre"
                        rel="noreferrer"
                      >
                        linkedin
                      </ButtonAsLink>
                    </li>
                  </ul>
                </div>
              </GridCol>
            </Grid>
          </Container>
        </div>
        <Footer className="fr-no-print">
          <FooterBody>
            <FooterBodyBrand>
              <Link href="/">
                <Logo />
              </Link>
            </FooterBodyBrand>
            <FooterBodyContent>
              <FooterBodyContentDescription>
                Ce site est fait pour les personnes autistes, par des personnes autistes, et avec des personnes
                concernées. Vos commentaires, réactions et propositions sont précieux pour nous aider à améliorer ce
                service au fur et à mesure. Un oubli&nbsp;? Une suggestion&nbsp;? Utilisez le module{" "}
                <NextLinkOrA
                  href="/je-donne-mon-avis"
                  title="Partagez votre avis sur ce site internet et vos idées d'amélioration"
                >
                  Je donne mon avis
                </NextLinkOrA>{" "}
                pour soumettre vos idées afin de contribuer à enrichir ce service public.
              </FooterBodyContentDescription>
              <FooterBodyContentDescription>
                Attention, les demandes personnelles transmises via ce formulaire ne pourront être traitées sur ce site.
                Pour les demandes personnelles, veuillez vous rapprocher de l'organisme en charge de votre dossier. Pour
                toute question, vous pouvez contacter{" "}
                <a
                  href="https://www.autismeinfoservice.fr/"
                  target="_blank"
                  rel="noreferrer"
                  title="Site Autisme Info Service - nouvelle fenêtre"
                >
                  Autisme Info Service
                </a>
                .
              </FooterBodyContentDescription>
              <FooterBodyContentItems>
                <FooterBodyItem>
                  <FooterContentLink
                    href="https://handicap.gouv.fr/accueil"
                    target="_blank"
                    rel="noreferrer"
                    isExternal
                    title="Site du ministère chargé des personnes handicapées - nouvelle fenêtre"
                  >
                    Handicap.gouv.fr
                  </FooterContentLink>
                </FooterBodyItem>
                <FooterBodyItem>
                  <FooterContentLink
                    href="https://www.monparcourshandicap.gouv.fr/"
                    target="_blank"
                    rel="noreferrer"
                    isExternal
                    title="Site mon parcours handicap - nouvelle fenêtre"
                  >
                    Mon Parcours Handicap
                  </FooterContentLink>
                </FooterBodyItem>
                <FooterBodyItem>
                  <FooterContentLink
                    href="https://www.mesdroitssociaux.gouv.fr/accueil/"
                    target="_blank"
                    rel="noreferrer"
                    isExternal
                    title="Site mes droits sociaux - nouvelle fenêtre"
                  >
                    Mes Droits Sociaux
                  </FooterContentLink>
                </FooterBodyItem>
                <FooterBodyItem>
                  <FooterContentLink
                    href="https://solidarites.gouv.fr/accueil"
                    target="_blank"
                    rel="noreferrer"
                    isExternal
                    title="Site Ministère des Solidarités, de l'Autonomie et des Personnes Handicapées - nouvelle fenêtre"
                  >
                    Ministère des Solidarités, de l'Autonomie et des Personnes Handicapées
                  </FooterContentLink>
                </FooterBodyItem>
              </FooterBodyContentItems>
              <FooterBodyContentItems>
                <FooterBodyItem>
                  <FooterContentLink
                    href="https://www.legifrance.gouv.fr/"
                    target="_blank"
                    rel="noreferrer"
                    isExternal
                    title="Site legifrance.gouv.fr - nouvelle fenêtre"
                  >
                    legifrance.gouv.fr
                  </FooterContentLink>
                </FooterBodyItem>
                <FooterBodyItem>
                  <FooterContentLink
                    href="https://www.gouvernement.fr/"
                    target="_blank"
                    rel="noreferrer"
                    isExternal
                    title="Site gouvernement.fr - nouvelle fenêtre"
                  >
                    gouvernement.fr
                  </FooterContentLink>
                </FooterBodyItem>
                <FooterBodyItem>
                  <FooterContentLink
                    href="https://www.service-public.fr/"
                    target="_blank"
                    rel="noreferrer"
                    isExternal
                    title="Site service-public.fr - nouvelle fenêtre"
                  >
                    service-public.fr
                  </FooterContentLink>
                </FooterBodyItem>
                <FooterBodyItem>
                  <FooterContentLink
                    href="https://www.data.gouv.fr/"
                    target="_blank"
                    rel="noreferrer"
                    isExternal
                    title="Site data.gouv.fr - nouvelle fenêtre"
                  >
                    data.gouv.fr
                  </FooterContentLink>
                </FooterBodyItem>
              </FooterBodyContentItems>
            </FooterBodyContent>
          </FooterBody>
          <FooterBottom>
            <FooterBottomItem>
              <FooterBottomLink href="/plan-du-site">Plan du site</FooterBottomLink>
            </FooterBottomItem>
            <FooterBottomItem>
              <FooterBottomLink href="/accessibilite">Accessibilité&nbsp;: partiellement conforme</FooterBottomLink>
            </FooterBottomItem>
            <FooterBottomItem>
              <FooterBottomLink href="/mentions-legales">Mentions légales</FooterBottomLink>
            </FooterBottomItem>
            <FooterBottomItem>
              <FooterBottomLink href="/politique-de-confidentialite">Politique de confidentialité</FooterBottomLink>
            </FooterBottomItem>
            <FooterBottomItem>
              <FooterBottomLink href={`https://github.com/SocialGouv/mda/commits/${config.githubSha}`} isExternal>
                Version {config.githubSha}
              </FooterBottomLink>
            </FooterBottomItem>
            <FooterBottomItem>
              <FooterBottomLink href="/je-donne-mon-avis">Je donne mon avis</FooterBottomLink>
            </FooterBottomItem>
          </FooterBottom>
        </Footer>
      </body>
    </html>
  );
};

export default RootLayout;
