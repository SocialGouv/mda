/**
 * fiche-pratique controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::fiche-pratique.fiche-pratique", ({ strapi }) => ({
  mostViewed(ctx) {
    return strapi.services["api::fiche-pratique.fiche-pratique"].mostViewed(ctx);
  },
}));
