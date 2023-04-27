import { type Strapi } from "@strapi/strapi";
import { type Context } from "koa";

import { ctxParams } from "../../../utils/ctxParamsHelper";

/**
 * This controller is responsible of the settings CRUD
 */
const indexSettingsController = ({ strapi }: { strapi: Strapi }) => {
  const plugin = strapi.plugin("meilisearch");
  return {
    /**
     * This will fetch the settings in database
     */
    fetch() {
      return plugin.service("indexSettingsService").get();
    },
    /**
     * This will store the settings in database
     */
    update(ctx: Context) {
      // Cannot have a proper JSON body in extensions ???
      const settings = ctxParams(ctx).get("settings");

      if (!settings) {
        ctx.status = 400;
        ctx.body = {
          message: "Missing settings in query",
        };
        return;
      }

      let validSettings;
      try {
        validSettings = JSON.parse(settings);
      } catch {
        ctx.status = 400;
        ctx.body = {
          message: "Invalid settings in query",
        };
        return;
      }

      return plugin.service("indexSettingsService").set(validSettings);
    },
  };
};

export default indexSettingsController;
