import { type StrapiLifecycle } from "../../utils/types";

const seeds = {
  "api::fiche-pratique.fiche-pratique": import("../../utils/seed/fiche-pratique.json"),
  "api::question.question": import("../../utils/seed/question.json"),
  "api::glossaire-item.glossaire-item": import("../../utils/seed/glossaire-item.json"),
  "api::maison-de-l-autisme.maison-de-l-autisme": import("../../utils/seed/maison-de-l-autisme.json"),
  "api::mes-aides.mes-aides": import("../../utils/seed/mes-aides.json"),
  "api::annuaire.annuaire": import("../../utils/seed/annuaire.json"),
  "api::accueil.accueil": import("../../utils/seed/accueil.json"),
  "api::mentions-legales.mentions-legales": import("../../utils/seed/mentions-legales.json"),
  "api::plan-du-site.plan-du-site": import("../../utils/seed/plan-du-site.json"),
};

const devSeedDb: StrapiLifecycle = async ({ strapi }) => {
  if (process.env.MDA_ENV !== "dev") {
    return;
  }

  const importService = strapi.plugin("import-export-entries").service("import");

  for (const [slug, json] of Object.entries(seeds)) {
    try {
      const entries = await strapi.db.query(slug).findMany({});
      if (entries.length > 0) {
        strapi.log.warn(`[MDA devSeedDb] Entries found for ${slug}. No seeding.`);
        continue;
      }
      await importService.importData((await json).default, { format: "jso", slug });
      strapi.log.info(`[MDA devSeedDb] 🌱 => ${slug}`);
    } catch (error) {
      strapi.log.error(`[MDA devSeedDb] FAILED ${slug}`);
      console.log(error);
    }
  }
};

export default devSeedDb;
