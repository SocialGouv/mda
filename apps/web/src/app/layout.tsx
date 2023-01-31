import "../styles/global.css";

import { config } from "@common/config";
import { DEFAULT_SEO_CONFIG } from "@common/config/next-seo";
import { BasicLayout } from "@components/layouts/BasicLayout";
import { DarkTheme } from "@components/utils/client/DarkTheme";
import { Matomo } from "@components/utils/client/Matomo";
import { TarteAuCitronGDPR } from "@components/utils/client/TarteAuCitronGDPR";
import { NextSeo } from "next-seo";
import { type PropsWithChildren } from "react";

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="fr">
      <head>
        <NextSeo {...DEFAULT_SEO_CONFIG} />
        <Matomo env={config.server.env} />
        <TarteAuCitronGDPR env={config.server.env} />
        <DarkTheme />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <BasicLayout>{children}</BasicLayout>
      </body>
    </html>
  );
};

export default RootLayout;
