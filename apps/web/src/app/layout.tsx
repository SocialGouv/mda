import "../styles/global.css";

import { DEFAULT_SEO_CONFIG } from "@common/config/next-seo";
import { BasicLayout } from "@components/layouts/BasicLayout";
import { DarkTheme } from "@components/utils/client/DarkTheme";
import { Matomo } from "@components/utils/client/Matomo";
import { NextSeo } from "next-seo";
import { type PropsWithChildren } from "react";

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="fr">
      <head>
        <NextSeo {...DEFAULT_SEO_CONFIG} />
        <Matomo />
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
