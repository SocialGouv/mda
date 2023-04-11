import "../../styles/global.css";
import "../startDsfr";

declare let __webpack_nonce__: string;
// eslint-disable-next-line prefer-const
__webpack_nonce__ = config.githubSha;

import { DsfrHead } from "@codegouvfr/react-dsfr/next-appdir/DsfrHead";
import { DsfrProvider } from "@codegouvfr/react-dsfr/next-appdir/DsfrProvider";
import { getColorSchemeHtmlAttributes } from "@codegouvfr/react-dsfr/next-appdir/getColorSchemeHtmlAttributes";
import { config } from "@common/config";
import { BreadcrumbDynamic } from "@components/base/client/BreadcrumbDynamic";
import { GdprStandaloneButton } from "@components/base/client/GdprStandaloneButton";
import { Header } from "@components/base/client/Header";
import { MdaConsentBanner } from "@components/base/client/MdaConsentBanner";
import { defaultColorScheme } from "@components/utils/client/defaultColorScheme";
import { Matomo } from "@components/utils/client/Matomo";
import { Markdown } from "@components/utils/Markdown";
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
import { fetchStrapi } from "@services/strapi";
import Link from "next/link";
import { type PropsWithChildren } from "react";

declare module "@design-system/client" {
  interface GdprServiceNames {
    matomo: unknown;
    youtube: unknown;
  }
}

const MainRootLayout = async ({ children }: PropsWithChildren) => {
  const strapiMenu = await fetchStrapi("menu", { populate: "deep" });
  const strapiFooter = await fetchStrapi("footer", { populate: "deep" });
  const menuItems = strapiMenu.data?.attributes.item;
  const footerAttributes = strapiFooter.data?.attributes;
  return (
    <html lang="fr" {...getColorSchemeHtmlAttributes({ defaultColorScheme })}>
      <head nonce={config.githubSha}>
        <DsfrHead
          defaultColorScheme={defaultColorScheme}
          preloadFonts={[
            //"Marianne-Light",
            //"Marianne-Light_Italic",
            "Marianne-Regular",
            //"Marianne-Regular_Italic",
            "Marianne-Medium",
            //"Marianne-Medium_Italic",
            "Marianne-Bold",
            //"Marianne-Bold_Italic",
            //"Spectral-Regular",
            //"Spectral-ExtraBold"
          ]}
        />
        <Matomo env={config.env} />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="csp-nonce" content={config.githubSha} />
        <script async={false} src="./js/nonce.js" nonce={config.githubSha}></script>
      </head>
      <body>
        <DsfrProvider defaultColorScheme={defaultColorScheme}>
          <MdaConsentBanner />
          <SkipLinks>
            <SkipLinksItem href="#content">Contenu</SkipLinksItem>
            <SkipLinksItem href="#header">Menu</SkipLinksItem>
            <SkipLinksItem href="#footer">Pied de page</SkipLinksItem>
          </SkipLinks>
          <Header menuItems={menuItems} />
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
                          isExternal
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
                          isExternal
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
                          isExternal
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
                  {footerAttributes?.content && <Markdown>{footerAttributes.content}</Markdown>}
                </FooterBodyContentDescription>
                {footerAttributes?.link && (
                  <FooterBodyContentItems>
                    {footerAttributes.link?.map(item => (
                      <FooterBodyItem key={item.id}>
                        <FooterContentLink href={item.url} target="_blank" rel="noreferrer" title={item.title}>
                          {item.text}
                        </FooterContentLink>
                      </FooterBodyItem>
                    ))}
                  </FooterBodyContentItems>
                )}
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
              <FooterBottomItem>
                <GdprStandaloneButton />
              </FooterBottomItem>
            </FooterBottom>
          </Footer>
        </DsfrProvider>
      </body>
    </html>
  );
};

export default MainRootLayout;
