import { config } from "@common/config";
import { type Metadata, type ResolvingMetadata } from "next";
import { type TemplateString } from "next/dist/lib/metadata/types/metadata-types";

interface MetadataFactoryParams {
  noCanonicalLink?: true;
  resolveSlug?(params?: unknown): Promise<string> | string;
  resolveTitle(params?: unknown): Promise<string> | Promise<TemplateString> | TemplateString | string;
}

export const generateMetadataFactory =
  ({ noCanonicalLink, resolveSlug, resolveTitle }: MetadataFactoryParams) =>
  async (params: unknown, parent: ResolvingMetadata): Promise<Metadata> => {
    const title = await resolveTitle(params);
    const slug = resolveSlug ? await resolveSlug(params) : "";
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
