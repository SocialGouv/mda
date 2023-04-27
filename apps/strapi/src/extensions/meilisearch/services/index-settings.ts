import { type Strapi } from "@strapi/strapi";

const CONTENT_TYPE = "plugin::meilisearch.meilisearch-index";

const indexSettingsService = ({ strapi: { entityService } }: { strapi: Strapi }) => {
  return {
    get() {
      return entityService.findMany(CONTENT_TYPE);
    },
    async set(settings: unknown) {
      const previousSettings = await this.get();

      if (!previousSettings) {
        return entityService.create(CONTENT_TYPE, {
          data: {
            settings,
          },
        });
      }

      return entityService.update(CONTENT_TYPE, previousSettings.id, {
        data: {
          settings,
        },
      });
    },
  };
};

export default indexSettingsService;
