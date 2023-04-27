import contentTypes from "./content-types";
import searchController from "./controllers/search";

/**
 * This extension creates the /meilisearch/search PUBLIC route
 * This is used to proxy the meilisearch instance and to
 * not have credentials on front end
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const strapiServer = (plugin: any) => {
  plugin.controllers.searchController = searchController;

  plugin.contentTypes = {
    ...plugin.contentTypes,
    ...contentTypes,
  };

  plugin.routes.push({
    method: "GET",
    path: "/search",
    handler: "searchController.search",
    config: {
      auth: false,
    },
  });

  return plugin;
};

export default strapiServer;
