import { config } from "@common/config";
import { type Metadata, type ResolvingMetadata } from "next";
import { type DefaultTemplateString } from "next/dist/lib/metadata/types/metadata-types";

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
  modifiedTime?: string;
  publishedTime?: string;
  slug?: string;
  title: DefaultTemplateString | string;
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
    const {
      description: rawDescription,
      keywords,
      modifiedTime,
      publishedTime,
      slug,
      title: rawTitle,
    } = await resolveMetadata(params);
    const { alternates } = await parent;
    const baseUrl = new URL(alternates?.canonical?.url.toString() || config.siteUrl);

    const description = formatDescription(rawDescription);
    const url = slug ? new URL(`${baseUrl.origin}/${slug}`) : baseUrl;
    const title = typeof rawTitle === "string" ? rawTitle : rawTitle.default;

    return {
      title: rawTitle,
      description,
      keywords: keywords ?? DEFAULT_KEYWORDS,
      openGraph: {
        description,
        title: `${title} | ${url.hostname}`,
        url,
        images: [new URL(`${config.siteUrl}/maison-de-lautisme.png`)],
        modifiedTime,
        publishedTime,
      },
      alternates: noCanonicalLink
        ? {}
        : {
            canonical: url.toString(),
          },
    };
  };
