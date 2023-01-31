import { ensureEnvVar } from "@common/utils/os";
import { isTruthy } from "@common/utils/string";

const ensureOsEnvVar: typeof ensureEnvVar<ProcessEnvCustomKeys> = (key, defaultValue) => {
  if (typeof window === "undefined") {
    return ensureEnvVar(key, defaultValue);
  }
  return "";
};

export const config = {
  siteTitle: "Maison de l'autisme",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "",
  matomo: {
    url: process.env.NEXT_PUBLIC_MATOMO_URL ?? "",
    siteId: process.env.NEXT_PUBLIC_MATOMO_SITE_ID ?? "",
  },
  strapi: {
    apiUrl: process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://127.0.0.1:1337",
  },
  githubSha: process.env.NEXT_PUBLIC_GITHUB_SHA?.substring(0, 7) ?? "<dev>",
  /** In seconds */
  fetchRevalidate: 60 * 3,
  server: {
    env: ensureOsEnvVar("MDA_ENV") as "dev" | "preprod" | "prod",
    webhookRevalidateToken: ensureOsEnvVar("WEBHOOK_REVALIDATE_TOKEN"),
    mailer: {
      enable: isTruthy(ensureOsEnvVar("MAILER_ENABLE", "false")),
      host: ensureOsEnvVar("MAILER_SMTP_HOST", "127.0.0.1"),
      smtp: {
        port: +ensureOsEnvVar("MAILER_SMTP_PORT", "1025"),
        password: ensureOsEnvVar("MAILER_SMTP_PASSWORD", ""),
        login: ensureOsEnvVar("MAILER_SMTP_LOGIN", ""),
        ssl: isTruthy(ensureOsEnvVar("MAILER_SMTP_SSL", "false")),
      },
      from: ensureOsEnvVar("MAILER_FROM_EMAIL", "Maison de l'autisme <maisondelautisme@fabrique.social.gouv.fr>"),
      signature: ensureOsEnvVar("MAILER_EMAIL_SIGNATURE", "L'équipe Maison de l'autisme"),
    },
  },
} as const;
