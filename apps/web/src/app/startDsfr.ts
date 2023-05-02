"use client";
import { config } from "@common/config";

// should be before react-dsfr
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

import { startReactDsfr } from "@codegouvfr/react-dsfr/next-appdir";
import { defaultColorScheme } from "@components/utils/client/defaultColorScheme";
import Link from "next/link";

declare module "@codegouvfr/react-dsfr/next-appdir" {
  interface RegisterLink {
    Link: typeof Link;
  }
}

startReactDsfr({ defaultColorScheme, Link });
