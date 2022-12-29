import { ensureEnvVar } from "@common/utils/os";

// eslint-disable-next-line unused-imports/no-unused-vars -- used when api is set
const ensureOsEnvVar: typeof ensureEnvVar<ProcessEnvCustomKeys> = (key, defaultValue) => {
  if (typeof window === "undefined") {
    return ensureEnvVar(key, defaultValue);
  }
  return "";
};

export const config = {
  siteTitle: "Maison de l'Austisme",
  env: (process.env.MDA_ENV ?? "dev") as "dev" | "preprod" | "prod",
  matomo: {
    url: process.env.NEXT_PUBLIC_MATOMO_URL ?? "",
    siteId: process.env.NEXT_PUBLIC_MATOMO_SITE_ID ?? "",
  },
} as const;

interface ServicesConfig {
  db: "mock" | "postgres" | "prisma";
}

export const services: ServicesConfig = {
  db: "postgres",
};
