/**
 * maison-de-l-autisme controller
 */

import { factories } from "@strapi/strapi";
import { type Context } from "koa";

export default factories.createCoreController("api::maison-de-l-autisme.maison-de-l-autisme", ({ strapi }) => ({
  upcomingEvents(ctx: Context) {
    return strapi.services["api::maison-de-l-autisme.maison-de-l-autisme"].upcomingEvents(ctx);
  },
}));
