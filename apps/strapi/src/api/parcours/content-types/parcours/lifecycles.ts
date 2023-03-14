import { lifecycles } from "../../../../utils/lifecyclesHelpers";

const parcoursLifecycle = lifecycles.createLifeCycle<"api::parcours.parcours">({
  afterHook: {
    events: ["afterCreate", "afterUpdate"],
    handler: event => {
      if (!strapi.isLoaded || !event.result.slug) return;
      strapi.log.info(
        `[MDA][${event.model.uid}][${event.action}] Update index "${event.model.singularName}" in meilisearch"`,
      );
      return strapi
        .plugin("meilisearch")
        .service("meilisearch")
        .updateContentTypeInMeiliSearch(event.model.singularName);
    },
  },
});

export default parcoursLifecycle;
