import { type PluginsConfig } from "./types";

const plugins: PluginsConfig = {
  "config-sync": {
    enabled: true,
    config: {
      syncDir: "config/sync/",
      importOnBootstrap: true,
      excludedConfig: [
        "core-store.plugin_users-permissions_grant",
        "core-store.plugin_content_manager_configuration_content_types::admin::api-token-permission",
        "core-store.plugin_content_manager_configuration_content_types::admin::api-token",
        "core-store.plugin_content_manager_configuration_content_types::admin::permission",
        "core-store.plugin_content_manager_configuration_content_types::admin::role",
        "core-store.plugin_content_manager_configuration_content_types::admin::user",
        "core-store.plugin_content_manager_configuration_content_types::plugin::upload.file",
        "core-store.plugin_content_manager_configuration_content_types::plugin::upload.folder",
        "core-store.plugin_content_manager_configuration_content_types::plugin::users-permissions.permission",
        "core-store.plugin_upload_settings",
        "core-store.plugin_upload_view_configuration",
        "core-store.plugin_users-permissions_email",
        "core-store.strapi_content_types_schema",
        "core-store.plugin_upload_metrics",
        "core-store.plugin_content_manager_configuration_content_types::plugin::slugify.slug",
      ],
    },
  },
  "strapi-plugin-populate-deep": {
    enabled: true,
    config: {
      defaultDepth: 10,
    },
  },
  slugify: {
    enabled: true,
    config: {
      contentTypes: {
        "fiche-pratique": {
          field: "slug",
          references: "title",
        },
      },
    },
  },
};

export default plugins;
