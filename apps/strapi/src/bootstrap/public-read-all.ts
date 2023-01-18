import { type StrapiLifecycle } from "../utils/types";

const publicReadAll: StrapiLifecycle = async ({ strapi }) => {
  try {
    const publicRole = await strapi.db.query("plugin::users-permissions.role").findOne({
      where: { type: "public" },
      populate: true as any,
    });

    console.log(publicRole.permissions);
  } catch (e) {
    console.error("Didn't find many =>", e);
  }
};

export default publicReadAll;
