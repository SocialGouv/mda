"use client";

import Script, { type ScriptProps } from "next/script";
import { useCallback } from "react";

export const OrejimeGDPR = () => {
  const handleLoad: ScriptProps["onLoad"] = useCallback(() => {
    const orejime = Orejime.init({
      privacyPolicy: "/politique-de-confidentialite#cookies",
      appElement: "#orejime",
      apps: [
        {
          name: "internal-tracker",
          title: "Cookies techniques nécessaires au bon fonctionnement du site",
          purposes: ["Analytics"],
          description:
            "Utilisation: Ces cookies permettent au site de fonctionner de manière optimale. Vous pouvez vous y opposer et les supprimer en utilisant les paramètres de votre navigateur, cependant votre expérience utilisateur risque d’être dégradée.",
          required: !0,
        },
        {
          name: "streaming-video",
          title: "Streaming Vidéo",
          purposes: ["Streaming vidéo"],
          description:
            'Utilisation: Ces cookies permettent la lecture de vidéos sur le site maisondelautisme en provenance de sites d’hébergement de contenus. <a href="https://policies.google.com/privacy" target="_blank" title="politique de confidentialité de YouTube - nouvelle fenêtre">"Politique de confidentialité de YouTube"</a>',
          callback: function (...args: unknown[]) {
            console.log(args);
          },
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
