import { type GetAttributesValues, type Strapi } from "@strapi/strapi";

import { type StrapiLifecycle } from "../../utils/types";

const hasData = async (strapi: Strapi) => {
  const fiches = await strapi.db.query("api::fiche-pratique.fiche-pratique").findMany({});
  return fiches.length > 0;
};

const devSeedDb: StrapiLifecycle = async ({ strapi }) => {
  if (process.env.MDA_ENV !== "dev") {
    return;
  }

  if (await hasData(strapi)) {
    strapi.log.info(`[MDA devSeedDb] At least one "fiche pratique" is already existing.`);
    return;
  }

  const defaultAdmin: GetAttributesValues<"admin::user"> = {
    username: "admin",
    password: "admin",
    email: "admin@strapi.dev",
    blocked: false,
    isActive: true,
  };

  //   const superAdminRole = await getSuperAdminRole(strapi);
  //   defaultAdmin.roles = [superAdminRole.id];
  //   defaultAdmin.password = await strapi.service("admin::auth")?.hashPassword(defaultAdmin.password);

  //   try {
  //     await strapi.db.query("admin::user").create({ data: { ...defaultAdmin } });
  //     strapi.log.info(`[MDA devCreateAdmin] Created admin (E-Mail: ${defaultAdmin.email}, Password: "admin").`);
  //   } catch (e) {
  //     strapi.log.error(`[MDA devCreateAdmin] Couldn't create admin (${defaultAdmin.email}):`, e);
  //   }
};

export default devSeedDb;
