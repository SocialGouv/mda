import { DEFAULT_SEO_CONFIG } from "@common/config/next-seo";
import { NextSeo, type NextSeoProps } from "next-seo";

export const Next13Seo = ({ useAppDir: _, ...props }: NextSeoProps) => (
  <NextSeo useAppDir {...{ DEFAULT_SEO_CONFIG, ...props }} />
);
