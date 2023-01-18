import { type StrapiLifecycle } from "../utils/types";

const MDA_ENV = (process.env.MDA_ENV || "dev") as "dev" | "preprod" | "prod";

export const bootstraps: Array<Promise<{ default: StrapiLifecycle }>> = [];

if (MDA_ENV === "dev") {
  strapi.log.info(`[MDA] Load dev bootstraps`);
  bootstraps.push(import("./dev/create-admin"));
}

strapi.log.info(`[MDA] Load common bootstraps`);
bootstraps.push(import("./public-read-all"));
