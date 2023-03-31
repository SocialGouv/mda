"use client";

import Script, { type ScriptProps } from "next/script";
import { useCallback } from "react";

export const OrejimeGDPR = () => {
  const handleLoad: ScriptProps["onLoad"] = useCallback(() => {
    const orejime = Orejime.init({
      privacyPolicy: "/politique-de-confidentialite#cookies",
      cookieExpiresAfterDays: 182,
      debug: false,
      mustConsent: false,
      mustNotice: false,
      implicitConsent: false,
      translations: {
        fr: {
          poweredBy: false,
          consentNotice: {
            description:
              "Ce site utilise des cookies permettant de visualiser des contenus provenant des réseaux sociaux et d'améliorer le fonctionnement grâce aux statistiques de navigation. Votre choix est conservé pendant 6 mois et vous pouvez être informé et modifier vos préférences à tout moment sur la page « Politique de confidentialité ».",
            learnMore: "Politique de confidentialité",
          },
        },
      },
      appElement: "#orejime",
      apps: [
        {
          name: "internal-tracker",
          title: "Cookies techniques nécessaires au bon fonctionnement du site",
          description:
            "Utilisation: Ces cookies permettent au site de fonctionner de manière optimale. Vous pouvez vous y opposer et les supprimer en utilisant les paramètres de votre navigateur, cependant votre expérience utilisateur risque d’être dégradée.",
          required: true,
        },
        {
          name: "streaming-video",
          title: "Streaming Vidéo",
          description:
            'Utilisation: Ces cookies permettent la lecture de vidéos sur le site maisondelautisme en provenance de sites d’hébergement de contenus. <a href="https://policies.google.com/privacy" target="_blank" title="politique de confidentialité de YouTube - nouvelle fenêtre">"Politique de confidentialité de YouTube"</a>',
          optOut: false,
          default: false,
          onlyOnce: false,
        },
      ],
    });

    Orejime.show = orejime.show.bind(orejime);
  }, []);

  return (
    <>
      <Script src="https://unpkg.com/orejime@latest/dist/orejime.js" onLoad={handleLoad} />
    </>
  );
};
