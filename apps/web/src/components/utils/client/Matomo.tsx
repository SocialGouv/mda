"use client";

import { config } from "@common/config";
import { useGdprStore } from "@design-system/client";
import { init, push } from "@socialgouv/matomo-next";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export type MatomoProps = Pick<typeof config, "env">;

export const Matomo = ({ env }: MatomoProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const matomoConsent = useGdprStore(state => state.consents.matomo);
  const [inited, setInited] = useState(false);
  const [previousPath, setPreviousPath] = useState("");

  useEffect(() => {
    if (env === "prod" && !inited) {
      init({
        ...config.matomo,
        onInitialization: () => {
          push(["optUserOut"]);
          push(["requireCookieConsent"]);
          push(["enableHeartBeatTimer"]);
          push(["disableQueueRequest"]);
        },
      });

      setInited(true);
    }

    if (matomoConsent) {
      console.log("Activation des cookies Matomo.");
      push(["forgetUserOptOut"]);
      push(["rememberCookieConsentGiven"]);
    } else {
      console.log("Désactivation des cookies Matomo.");
      push(["optUserOut"]);
      push(["forgetCookieConsentGiven"]);
    }
  }, [env, inited, matomoConsent]);

  /**
   * The @socialgouv/matomo-next does not work with next 13
   */
  useEffect(() => {
    if (!pathname || !matomoConsent) {
      return;
    }

    if (!previousPath) {
      return setPreviousPath(pathname);
    }

    push(["setReferrerUrl", `${previousPath}`]);
    push(["setCustomUrl", pathname]);
    push(["deleteCustomVariables", "page"]);
    setPreviousPath(pathname);
    // In order to ensure that the page title had been updated,
    // we delayed pushing the tracking to the next tick.
    setTimeout(() => {
      push(["setDocumentTitle", document.title]);
      if (pathname.startsWith("/recherche")) {
        push(["trackSiteSearch", searchParams?.get("keyword") ?? ""]);
      } else {
        push(["trackPageView"]);
      }
    });
    /**
     * This is because we don't want to track previousPath
     * could be a if (previousPath === pathname) return; instead
     * But be sure to not send the tracking twice
     */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matomoConsent, pathname, searchParams]);

  return <></>;
};
