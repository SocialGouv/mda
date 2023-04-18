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
import { generateMetadataFactory } from "@services/metadata";
import { fetchStrapi } from "@services/strapi";
import Link from "next/link";
import { type PropsWithChildren, Suspense } from "react";

declare module "@design-system/client" {
  interface GdprServiceNames {
    matomo: unknown;
    youtube: unknown;
  }
}

export const generateMetadata = generateMetadataFactory({
  resolveTitle: () => ({ default: config.siteTitle, template: `%s | ${config.siteTitle}` }),
});

const Layout = async ({ children }: PropsWithChildren) => {
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
        <Suspense>
          <Matomo env={config.env} />
        </Suspense>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="csp-nonce" content={config.githubSha} />
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
                    <h2 className="fr-h5">{footerAttributes?.banner_title}</h2>
                    <ul className="fr-btns-group">
                      {footerAttributes?.banner_icons &&
                        footerAttributes?.banner_icons.map(icon => (
                          <li key={icon.id}>
                            <ButtonAsLink
                              iconOnly={icon.svg}
                              href={icon.link?.url || "#"}
                              title={icon.link?.title}
                              target="_blank"
                              rel="noreferrer"
                              isExternal
                            >
                              {icon.link?.text}
                            </ButtonAsLink>
                          </li>
                        ))}
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

export default Layout;
