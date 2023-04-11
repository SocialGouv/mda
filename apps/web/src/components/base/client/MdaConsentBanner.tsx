import { config } from "@common/config";
import { ConsentBanner } from "@design-system/client";
import { NextLinkOrA } from "@design-system/utils/NextLinkOrA";
import Link from "next/link";

export const MdaConsentBanner = () => (
  <ConsentBanner
    gdprPageLink="/politique-de-confidentialite#cookies"
    gdprPageLinkAs={Link}
    siteName={config.siteTitle}
    services={[
      {
        name: "matomo",
        title: "Matomo",
        description: "Outil d’analyse comportementale des utilisateurs.",
      },
      {
        name: "youtube",
        title: "Youtube",
        description: (
          <>
            Utilisation: Ces cookies permettent la lecture de vidéos sur le site maisondelautisme en provenance de sites
            d’hébergement de contenus.{" "}
            <NextLinkOrA
              href="https://policies.google.com/privacy"
              title="politique de confidentialité de YouTube - nouvelle fenêtre"
              target="_blank"
              isExternal
            >
              "Politique de confidentialité de YouTube"
            </NextLinkOrA>
            .<br />
            Ces cookies sont directement gérés sur le site youtube.com.
          </>
        ),
        mandatory: true,
      },
    ]}
  />
);
