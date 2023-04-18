import { config } from "@common/config";
import { type Metadata, type ResolvingMetadata } from "next";
import { type TemplateString } from "next/dist/lib/metadata/types/metadata-types";

const DEFAULT_KEYWORDS = [
  "autisme",
  "troubles du spectre de l'autisme",
  "TSA",
  "TND",
  "Troubles du neurodéveloppement",
  "diagnostic, TDA/H",
  "asperger",
  "trouble autistique",
];

interface ResolvedMetadatas {
  keywords?: Metadata["keywords"];
  slug?: string;
  title: TemplateString | string;
}

interface MetadataFactoryParams {
  noCanonicalLink?: true;
  resolveMetadata(params?: unknown): Promise<ResolvedMetadatas> | ResolvedMetadatas;
}

export const generateMetadataFactory =
  ({ noCanonicalLink, resolveMetadata }: MetadataFactoryParams) =>
  async (params: unknown, parent: ResolvingMetadata): Promise<Metadata> => {
    const { keywords, title, slug } = await resolveMetadata(params);
    const { alternates } = await parent;
    const baseUrl = alternates?.canonical?.url.toString() || config.siteUrl;

    return {
      title,
      keywords: keywords ?? DEFAULT_KEYWORDS,
      alternates: noCanonicalLink
        ? {}
        : {
            canonical: slug ? `${baseUrl}/${slug}` : baseUrl,
          },
    };
  };
