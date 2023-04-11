"use client";
import { config } from "@common/config";

declare let __webpack_nonce__: string;
// eslint-disable-next-line prefer-const
__webpack_nonce__ = config.githubSha;

// should be before react-dsfr
if (typeof window !== "undefined") {
  const originalAppendChild = document.head.appendChild.bind(document.head);
  document.head.appendChild = node => {
    if (["style", "script"].includes(node.nodeName.toLocaleLowerCase())) {
      (node as unknown as Element).setAttribute(
        "nonce",
        (node as unknown as Element).getAttribute("nonce") || config.githubSha,
      );
    }
    return originalAppendChild(node);
  };
}

import { startReactDsfr } from "@codegouvfr/react-dsfr/next-appdir";
import { defaultColorScheme } from "@components/utils/client/defaultColorScheme";
import Link from "next/link";

declare module "@codegouvfr/react-dsfr/next-appdir" {
  interface RegisterLink {
    Link: typeof Link;
  }
}

startReactDsfr({ defaultColorScheme, Link });
