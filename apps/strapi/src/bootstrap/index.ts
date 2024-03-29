import { type StrapiLifecycle } from "../utils/types";

const MDA_ENV = (process.env.MDA_ENV || "dev") as "dev" | "preprod" | "prod";

export const bootstraps: Array<Promise<{ default: StrapiLifecycle }>> = [];

if (MDA_ENV === "dev") {
  strapi.log.info(`[MDA] Load dev bootstraps`);
  bootstraps.push(import("./dev/create-admin"));
  bootstraps.push(import("./dev/seed-db"));
}

bootstraps.push(import("./meilisearch/seed-pages"));
bootstraps.push(import("./meilisearch/configure-index"));

strapi.log.info(`[MDA] Load common bootstraps`);
// bootstraps.push(import("./*")); // replace "*" by common bootstrap file
