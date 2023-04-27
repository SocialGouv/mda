import { type StrapiLifecycle } from "../../utils/types";

const configureIndex: StrapiLifecycle = async ({ strapi }) => {
  const plugin = strapi.plugin("meilisearch");
  const indexSettingsService = plugin.service("indexSettingsService");

  await indexSettingsService.updateMeilisearch();
};

export default configureIndex;
