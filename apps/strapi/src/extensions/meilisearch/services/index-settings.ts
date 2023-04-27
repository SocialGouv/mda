import { type DbEntry } from "@mda/strapi-types";
import { type Strapi } from "@strapi/strapi";
import { MeiliSearch, type TypoTolerance } from "meilisearch";

const CONTENT_TYPE = "plugin::meilisearch.meilisearch-index";

type MeilisearchIndexSettings = DbEntry<"plugin::meilisearch.meilisearch-index"> & {
  settings: {
    typoTolerance: TypoTolerance;
  };
};

const indexSettings = ({ strapi: { entityService } }: { strapi: Strapi }) => {
  const { apiKey, host } = strapi.config.get("plugin.meilisearch");

  const client = new MeiliSearch({
    apiKey,
    host,
  });

  return {
    get(): Promise<MeilisearchIndexSettings> {
      return entityService.findMany(CONTENT_TYPE);
    },
    async set(settings: Partial<MeilisearchIndexSettings>) {
      const previousSettings = await this.get();

      const nextSettings = previousSettings
        ? await entityService.update(CONTENT_TYPE, previousSettings.id, {
            data: {
              settings,
            },
          })
        : await entityService.create(CONTENT_TYPE, {
            data: {
              settings,
            },
          });

      await this.updateMeilisearch();

      return nextSettings;
    },
    async updateMeilisearch() {
      const entry = await this.get();

      if (!entry || !entry.settings || !entry.settings.typoTolerance) {
        return;
      }

      await client.index("pages").updateTypoTolerance(entry.settings.typoTolerance);
    },
  };
};

export default indexSettings;
