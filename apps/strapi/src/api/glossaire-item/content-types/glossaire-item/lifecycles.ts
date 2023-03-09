import { lifecycles } from "../../../../utils/lifecyclesHelpers";

const glossaireItemLifecycle = lifecycles.createLifeCycle<"api::glossaire-item.glossaire-item">({
  afterHook: {
    events: ["afterCreate", "afterUpdate"],
    handler: event => {
      if (!strapi.isLoaded || !event.result.title) return;
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

export default glossaireItemLifecycle;
