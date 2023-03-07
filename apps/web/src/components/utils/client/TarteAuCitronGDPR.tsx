"use client";

import { type config } from "@common/config";
import Script, { type ScriptProps } from "next/script";
import { useCallback } from "react";

export type TOCGDPRProps = Pick<typeof config, "env">;

export const TarteAuCitronGDPR = ({ env: _env }: TOCGDPRProps) => {
  const handleLoad: ScriptProps["onLoad"] = useCallback(() => {
    tarteaucitron.init({
      privacyUrl: "/politique-de-confidentialite#cookies" /* Privacy policy url */,
      bodyPosition: "bottom" /* or top to bring it as first element for accessibility */,

      hashtag: "#tarteaucitron" /* Open the panel with this hashtag */,
      cookieName: "tarteaucitron" /* Cookie name */,

      orientation: "bottom" /* Banner position (top - bottom) */,

      groupServices: false /* Group services by category */,
      serviceDefaultState: "wait" /* Default state (true - wait - false) */,

      showAlertSmall: false /* Show the small banner on bottom right */,
      cookieslist: false /* Show the cookie list */,

      closePopup: false /* Show a close X on the banner */,

      showIcon: true /* Show cookie icon to manage cookies */,
      //"iconSrc": "", /* Optionnal: URL or base64 encoded image */
      iconPosition: "BottomLeft" /* BottomRight, BottomLeft, TopRight and TopLeft */,

      adblocker: true /* Show a Warning if an adblocker is detected */,

      DenyAllCta: true /* Show the deny all button */,
      AcceptAllCta: true /* Show the accept all button when highPrivacy on */,
      highPrivacy: true /* HIGHLY RECOMMANDED Disable auto consent */,

      handleBrowserDNTRequest: false /* If Do Not Track == 1, disallow all */,

      removeCredit: true /* Remove credit link */,
      moreInfoLink: true /* Show more info link */,

      useExternalCss: true /* If false, the tarteaucitron.css file will be loaded */,
      useExternalJs: false /* If false, the tarteaucitron.js file will be loaded */,

      //"cookieDomain": ".my-multisite-domaine.fr", /* Shared cookie for multisite */

      readmoreLink: "/politique-confidentialite#cookies" /* Change the default readmore link */,

      mandatory: true /* Show a message about mandatory cookies */,
      mandatoryCta: true /* Show the disabled accept button when mandatory on */,
    });

    tarteaucitron.initEvents.loadEvent(false);
  }, []);

  return (
    <>
      <Script src="https://unpkg.com/tarteaucitronjs@1.9.9/tarteaucitron.js" onLoad={handleLoad} />
    </>
  );
};
