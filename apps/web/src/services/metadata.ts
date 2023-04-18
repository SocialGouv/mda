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

const DEFAULT_DESCRIPTION = `Aider les personnes concernées par l'autisme à trouver leurs réponses et à mener à bien leurs démarches.`;

const DESCRIPTION_LENGTH = DEFAULT_DESCRIPTION.length;

interface ResolvedMetadatas {
  description?: string;
  keywords?: Metadata["keywords"];
  slug?: string;
  title: TemplateString | string;
}

interface MetadataFactoryParams {
  noCanonicalLink?: true;
  resolveMetadata(params?: unknown): Promise<ResolvedMetadatas> | ResolvedMetadatas;
}

function formatDescription(description?: string): string {
  if (!description) {
    return DEFAULT_DESCRIPTION;
  }

  return description.length > DESCRIPTION_LENGTH
    ? `${description.substring(0, DESCRIPTION_LENGTH - 4)}...`
    : description;
}

export const generateMetadataFactory =
  ({ noCanonicalLink, resolveMetadata }: MetadataFactoryParams) =>
  async (params: unknown, parent: ResolvingMetadata): Promise<Metadata> => {
    const { description, keywords, title, slug } = await resolveMetadata(params);
    const { alternates } = await parent;
    const baseUrl = alternates?.canonical?.url.toString() || config.siteUrl;

    return {
      title,
      description: formatDescription(description),
      keywords: keywords ?? DEFAULT_KEYWORDS,
      alternates: noCanonicalLink
        ? {}
        : {
            canonical: slug ? `${baseUrl}/${slug}` : baseUrl,
          },
    };
  };
