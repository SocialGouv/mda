import { ensureEnvVar } from "@common/utils/os";

const ensureOsEnvVar: typeof ensureEnvVar<ProcessEnvCustomKeys> = (key, defaultValue) => {
  if (typeof window === "undefined") {
    return ensureEnvVar(key, defaultValue);
  }
  return "";
};

export const config = {
  siteTitle: "Maison de l'autisme",
  matomo: {
    url: process.env.NEXT_PUBLIC_MATOMO_URL ?? "",
    siteId: process.env.NEXT_PUBLIC_MATOMO_SITE_ID ?? "",
  },
  strapi: {
    apiUrl: process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://127.0.0.1:1337",
  },
  mailer: {
    enable: process.env.MAILER_ENABLE,
    host: process.env.MAILER_SMTP_HOST,
    smtp: {
      port: process.env.MAILER_SMTP_PORT || 1025,
      password: process.env.MAILER_SMTP_PASSWORD,
      login: process.env.MAILER_SMTP_LOGIN,
      ssl: process.env.MAILER_SMTP_SSL || false,
    },
    from: process.env.MAILER_FROM_EMAIL,
    signature: process.env.MAILER_EMAIL_SIGNATURE,
  },
  githubSha: process.env.NEXT_PUBLIC_GITHUB_SHA?.substring(0, 7) ?? "<dev>",
  /** In seconds */
  fetchRevalidate: 60 * 3,
  server: {
    env: ensureOsEnvVar("MDA_ENV") as "dev" | "preprod" | "prod",
    webhookRevalidateToken: ensureOsEnvVar("WEBHOOK_REVALIDATE_TOKEN"),
  },
} as const;
