import { type StrapiLifecycle } from "../../utils/types";

const seedMeilisearchPages: StrapiLifecycle = async ({ strapi }) => {
  const plugin = strapi.plugin("meilisearch");
  const contentTypeService = plugin.service("contentType");
  const meilisearchService = plugin.service("meilisearch");

  for (const contentType of await contentTypeService.getContentTypesUid()) {
    const indexUid: string = meilisearchService.getIndexNameOfContentType({ contentType });
    if (indexUid === "pages") {
      await meilisearchService.updateContentTypeInMeiliSearch({ contentType });
      strapi.log.info(`[MDA seedMeilisearchPages] 🌱 => ${contentType}`);
    }
  }
};

export default seedMeilisearchPages;
