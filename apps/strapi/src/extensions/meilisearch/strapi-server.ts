import contentTypes from "./content-types";
import indexSettingsController from "./controllers/index-settings";
import searchController from "./controllers/search";
import indexSettingsService from "./services/index-settings";

/**
 * This extension creates the /meilisearch/search PUBLIC route
 * This is used to proxy the meilisearch instance and to
 * not have credentials on front end
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const strapiServer = (plugin: any) => {
  plugin.contentTypes = {
    ...plugin.contentTypes,
    ...contentTypes,
  };

  // SEARCH
  plugin.controllers.searchController = searchController;

  plugin.routes.push({
    method: "GET",
    path: "/search",
    handler: "searchController.search",
    config: {
      auth: false,
    },
  });

  // INDEXES
  plugin.controllers.indexSettingsController = indexSettingsController;
  plugin.services.indexSettingsService = indexSettingsService;

  plugin.routes.push({
    method: "GET",
    path: "/index/settings",
    handler: "indexSettingsController.fetch",
  });

  plugin.routes.push({
    method: "PUT",
    path: "/index/settings",
    handler: "indexSettingsController.update",
  });

  return plugin;
};

export default strapiServer;
