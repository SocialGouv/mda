import { type GetAttributesValues, type Strapi } from "@strapi/strapi";

import { type StrapiLifecycle } from "../../utils/types";

const getSuperAdminRole = async (strapi: Strapi) => {
  let superAdminRole = await strapi.db.query("admin::role").findOne({
    select: [],
    where: { code: "strapi-super-admin" },
    orderBy: {},
  });

  if (!superAdminRole) {
    superAdminRole = await strapi.db.query("admin::role").create({
      data: {
        name: "Super Admin",
        code: "strapi-super-admin",
        description: "Super Admins can access and manage all features and settings.",
      },
    });
  }

  return superAdminRole;
};

const createAdmin: StrapiLifecycle = async ({ strapi }) => {
  if (process.env.MDA_ENV !== "dev") {
    return;
  }

  const users = await strapi.db.query("admin::user").findMany({});
  if (users.length !== 0) {
    strapi.log.info(`[MDA devCreateAdmin] At least one super admin is already existing (E-Mail: ${users[0].email}).`);
    return;
  }

  const defaultAdmin: GetAttributesValues<"admin::user"> = {
    username: "admin",
    password: "admin",
    email: "admin@strapi.dev",
    blocked: false,
    isActive: true,
  };

  const superAdminRole = await getSuperAdminRole(strapi);
  defaultAdmin.roles = [superAdminRole.id];
  defaultAdmin.password = await strapi.service("admin::auth")?.hashPassword(defaultAdmin.password);

  try {
    await strapi.db.query("admin::user").create({ data: { ...defaultAdmin } });
    strapi.log.info(`[MDA devCreateAdmin] Created admin (E-Mail: ${defaultAdmin.email}, Password: "admin").`);
  } catch (e) {
    strapi.log.error(`[MDA devCreateAdmin] Couldn't create admin (${defaultAdmin.email}):`, e);
  }
};

export default createAdmin;
