import "../../styles/global.css";

import { config } from "@common/config";
import { DarkTheme } from "@components/utils/client/DarkTheme";
import { DsfrScript } from "@components/utils/client/DsfrScript";
import { Matomo } from "@components/utils/client/Matomo";
import { type PropsWithChildren } from "react";

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="fr">
      <head>
        <Matomo env={config.env} />
        <DarkTheme />
        <DsfrScript />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
