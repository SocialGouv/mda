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
  Notice,
  SkipLinks,
  SkipLinksItem,
} from "@design-system";
import { NextLinkOrA } from "@design-system/utils/NextLinkOrA";
import Link from "next/link";
import { type PropsWithChildren } from "react";

import { BreadcrumbDynamic } from "../base/client/BreadcrumbDynamic";
import { Header } from "../base/client/Header";

export const BasicLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <SkipLinks>
        <SkipLinksItem href="#content">Contenu</SkipLinksItem>
        <SkipLinksItem href="#header">Menu</SkipLinksItem>
        <SkipLinksItem href="#footer">Pied de page</SkipLinksItem>
      </SkipLinks>
      <Notice>
        <NextLinkOrA href="/je-donne-mon-avis">Service en version beta</NextLinkOrA>
      </Notice>
      <Header />
      <BreadcrumbDynamic />
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
              Ce site est fait pour les personnes autistes, par des personnes autistes, et avec des personnes
              concernées. C'est une version beta en cours de déploiement progressif. Vos commentaires, réactions et
              propositions sont précieux pour nous aider à améliorer ce service au fur et à mesure. Un oubli&nbsp;? Une
              suggestion&nbsp;? Utilisez le module{" "}
              <NextLinkOrA href="/je-donne-mon-avis">Je donne mon avis</NextLinkOrA> pour soumettre vos idées afin de
              contribuer à enrichir ce service public.
            </FooterBodyContentDescription>
            <FooterBodyContentDescription>
              Attention, les demandes personnelles transmises via ce formulaire ne pourront être traitées sur ce site.
              Pour les demandes personnelles, veuillez vous rapprocher de l'organisme en charge de votre dossier. Pour
              toute question, vous pouvez contacter{" "}
              <a href="https://www.autismeinfoservice.fr/" target="_blank" rel="noreferrer">
                Autisme Info Services
              </a>
              .
            </FooterBodyContentDescription>
            <FooterBodyContentItems>
              <FooterBodyItem>
                <FooterContentLink href="https://www.legifrance.gouv.fr/" target="_blank" rel="noreferrer" isExternal>
                  legifrance.gouv.fr
                </FooterContentLink>
              </FooterBodyItem>
              <FooterBodyItem>
                <FooterContentLink href="https://www.gouvernement.fr/" target="_blank" rel="noreferrer" isExternal>
                  gouvernement.fr
                </FooterContentLink>
              </FooterBodyItem>
              <FooterBodyItem>
                <FooterContentLink href="https://www.service-public.fr/" target="_blank" rel="noreferrer" isExternal>
                  service-public.fr
                </FooterContentLink>
              </FooterBodyItem>
              <FooterBodyItem>
                <FooterContentLink href="https://www.data.gouv.fr/" target="_blank" rel="noreferrer" isExternal>
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
    </>
  );
};
