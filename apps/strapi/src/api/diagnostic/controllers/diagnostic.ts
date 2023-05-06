/**
 * diagnostic controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::diagnostic.diagnostic", ({ strapi }) => ({
  question(ctx) {
    return strapi.services["api::diagnostic.diagnostic"].question(ctx);
  },
}));
