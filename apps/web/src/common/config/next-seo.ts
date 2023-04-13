import { type NextSeoProps } from "next-seo";

import { config } from ".";
import ContentSecurityPolicy from "./csp.config";

export const DEFAULT_SEO_CONFIG: NextSeoProps = {
  additionalLinkTags: [
    {
      rel: "icon",
      href: "/favicon.ico",
    },
  ],
  additionalMetaTags:
    process.env.NODE_ENV === "production"
      ? [
          {
            httpEquiv: "content-security-policy",
            content: ContentSecurityPolicy(config.githubSha),
          },
        ]
      : [],
  titleTemplate: `%s | ${config.siteTitle}`,
  defaultTitle: config.siteTitle,
  useAppDir: true,
};
