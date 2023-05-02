import { fetchWebhook } from "../../../../utils/fetchWebhookHelper";
import { lifecycles } from "../../../../utils/lifecyclesHelpers";

const lifecycle = lifecycles.createLifeCycle<"api::fiche-pratique.fiche-pratique">({
  afterHook: {
    events: ["afterCreate", "afterUpdate"],
    handler: async event => {
      if (!strapi.isLoaded || !event.result.slug) return;
      strapi.log.info(`[MDA][${event.model.uid}][${event.action}] Call webhook for "${event.result.slug}"`);
      strapi.log.info(
        `[MDA][${event.model.uid}][${event.action}] Update index "${event.model.singularName}" in meilisearch"`,
      );
      await fetchWebhook(event.model.uid, event.result.slug);
    },
  },
});

export default lifecycle;
