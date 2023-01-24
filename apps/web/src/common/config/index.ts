import { ensureEnvVar } from "@common/utils/os";

const ensureOsEnvVar: typeof ensureEnvVar<ProcessEnvCustomKeys> = (key, defaultValue) => {
  if (typeof window === "undefined") {
    return ensureEnvVar(key, defaultValue);
  }
  return "";
};

export const config = {
  siteTitle: "Maison de l'Autisme",
  env: (process.env.MDA_ENV ?? "dev") as "dev" | "preprod" | "prod",
  matomo: {
    url: process.env.NEXT_PUBLIC_MATOMO_URL ?? "",
    siteId: process.env.NEXT_PUBLIC_MATOMO_SITE_ID ?? "",
  },
  strapi: {
    apiUrl: process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://127.0.0.1:1337",
    token: ensureOsEnvVar("STRAPI_TOKEN"),
  },
  githubSha: process.env.NEXT_PUBLIC_GITHUB_SHA?.substring(0, 7) ?? "<dev>",
  webhookRevalidateToken: ensureOsEnvVar("WEBHOOK_REVALIDATE_TOKEN"),
} as const;
