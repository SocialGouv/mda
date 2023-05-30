import { config } from "@common/config";
import { type Thing } from "schema-dts";

type JsonLdThing = Exclude<Thing, string>;

export type JsonLdProps<T extends JsonLdThing> = Omit<T, "@id" | "@type"> & {
  slug?: string;
  type: T["@type"];
};

export const JsonLd = <T extends JsonLdThing>({ slug, type, ...rest }: JsonLdProps<T>) => {
  const baseUrl = new URL(config.siteUrl);
  const url = slug ? new URL(`${baseUrl.origin}/${slug}`) : baseUrl;

  const jsonLd = {
    "@context": "https://schema.org",
    "@id": url.toString(),
    "@type": type,
    image: new URL(`${config.siteUrl}/maison-de-lautisme.png`).toString(),
    ...rest,
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
};
