import { config } from "@common/config";
import { type Metadata, type ResolvingMetadata } from "next";
import { type TemplateString } from "next/dist/lib/metadata/types/metadata-types";

interface ResolvedMetadatas {
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
    const { title, slug } = await resolveMetadata(params);
    const { alternates } = await parent;
    const baseUrl = alternates?.canonical?.url.toString() || config.siteUrl;

    return {
      title,
      alternates: noCanonicalLink
        ? {}
        : {
            canonical: slug ? `${baseUrl}/${slug}` : baseUrl,
          },
    };
  };
