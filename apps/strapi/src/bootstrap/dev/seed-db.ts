import { type Strapi } from "@strapi/strapi";

import { type StrapiLifecycle } from "../../utils/types";

const seeds = {
  "api::fiche-pratique.fiche-pratique": import("../../utils/seed/fiche-pratique.json"),
  "api::question.question": import("../../utils/seed/question.json"),
  "api::glossaire-item.glossaire-item": import("../../utils/seed/glossaire-item.json"),
};

const hasData = async (strapi: Strapi) => {
  for (const uid of Object.keys(seeds)) {
    const entries = await strapi.db.query(uid).findMany({});
    if (entries.length > 0) {
      return true;
    }
  }
  return false;
};

const devSeedDb: StrapiLifecycle = async ({ strapi }) => {
  if (process.env.MDA_ENV !== "dev") {
    return;
  }

  if (await hasData(strapi)) {
    strapi.log.warn(`[MDA devSeedDb] Entries found. No seeding.`);
    return;
  }

  const importService = strapi.plugin("import-export-entries").service("import");

  for (const [slug, json] of Object.entries(seeds)) {
    try {
      await importService.importData((await json).default, { format: "jso", slug });
      strapi.log.info(`[MDA devSeedDb] 🌱 => ${slug}`);
    } catch (error) {
      strapi.log.error(`[MDA devSeedDb] FAILED ${slug}`);
      console.log(error);
    }
  }
};

export default devSeedDb;
