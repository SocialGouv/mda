import { ensureApiEnvVar, ensureNextEnvVar } from "@common/utils/os";
import { isTruthy } from "@common/utils/string";

export const config = {
  siteTitle: "Maison de l'autisme",
  siteUrl: ensureNextEnvVar(process.env.NEXT_PUBLIC_SITE_URL, ""),
  matomo: {
    url: ensureNextEnvVar(process.env.NEXT_PUBLIC_MATOMO_URL, ""),
    siteId: ensureNextEnvVar(process.env.NEXT_PUBLIC_MATOMO_SITE_ID, ""),
  },
  strapi: {
    apiUrl: ensureNextEnvVar(process.env.NEXT_PUBLIC_STRAPI_API_URL, "http://127.0.0.1:1337"),
  },
  githubSha: ensureNextEnvVar(process.env.NEXT_PUBLIC_GITHUB_SHA?.substring(0, 7), "<dev>"),
  /** In seconds */
  get fetchRevalidate() {
    return this.env === "dev" ? 5 : 60 * 3;
  },
  get ff() {
    return { maintenance: this.env === "prod" };
    // return { maintenance: false }; // disable maintenance
  },
  env: ensureApiEnvVar<"dev" | "preprod" | "prod">(process.env.MDA_ENV, "dev"),
  server: {
    webhookRevalidateToken: ensureApiEnvVar(process.env.WEBHOOK_REVALIDATE_TOKEN, ""),
    mailer: {
      enable: ensureApiEnvVar(process.env.MAILER_ENABLE, isTruthy, false),
      host: ensureApiEnvVar(process.env.MAILER_SMTP_HOST, "127.0.0.1"),
      smtp: {
        port: ensureApiEnvVar(process.env.MAILER_SMTP_PORT, Number, 1025),
        password: ensureApiEnvVar(process.env.MAILER_SMTP_PASSWORD, ""),
        login: ensureApiEnvVar(process.env.MAILER_SMTP_LOGIN, ""),
        ssl: ensureApiEnvVar(process.env.MAILER_SMTP_SSL, isTruthy, false),
      },
      from: ensureApiEnvVar(
        process.env.MAILER_FROM_EMAIL,
        "Maison de l'autisme <maisondelautisme@fabrique.social.gouv.fr>",
      ),
      signature: ensureApiEnvVar(process.env.MAILER_EMAIL_SIGNATURE, "L'équipe Maison de l'autisme"),
    },
  },
} as const;
