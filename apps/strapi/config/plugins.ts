import { type PluginsConfig, type StrapiConfigSetter } from "./types";

const plugins: StrapiConfigSetter<PluginsConfig> = ({ env }) => ({
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
  mda: {
    enabled: true,
    config: {},
  },
  meilisearch: {
    config: {
      host: env("MEILISEARCH_HOST"),
      apiKey: env("MEILISEARCH_MASTER_KEY"),
      annuaire: {
        indexName: "pages",
        transformEntry: ({ entry }) => {
          return {
            id: entry.id,
            title: entry.title,
            content: entry.content,
            links: entry.links,
          };
        },
        entriesQuery: {
          limit: 1000,
        },
      },
      "etape-de-vie": {
        indexName: "pages",
        transformEntry: ({ entry }) => {
          return {
            id: entry.id,
            excerpt: entry.excerpt,
            recapContent: entry.recap.content,
            recapTitle: entry.recap.title,
            slug: entry.slug,
            title: entry.title,
            sections: (entry.section ?? []).map(section => ({
              id: section.id,
              title: section.title,
              content: section.content,
            })),
          };
        },
        entriesQuery: {
          limit: 1000,
        },
      },
      "fiche-pratique": {
        indexName: "pages",
        transformEntry: ({ entry }) => {
          return {
            id: entry.id,
            excerpt: entry.excerpt,
            recapContent: entry.recap.content,
            recapTitle: entry.recap.title,
            slug: entry.slug,
            title: entry.title,
            sections: (entry.section ?? []).map(section => ({
              id: section.id,
              title: section.title,
              content: section.content,
            })),
          };
        },
        entriesQuery: {
          limit: 1000,
        },
      },
      "glossaire-item": {
        entriesQuery: {
          limit: 1000,
        },
        indexName: "pages",
        transformEntry: ({ entry }) => {
          return {
            id: entry.id,
            description: entry.description,
            title: entry.title,
            url: entry.url,
          };
        },
      },
      "je-donne-mon-avis": {
        indexName: "pages",
        transformEntry: ({ entry }) => {
          return {
            id: entry.id,
            title: entry.title,
            content: entry.content,
            alerts: entry.alerts,
          };
        },
        entriesQuery: {
          limit: 1000,
        },
      },
      "maison-de-l-autisme": {
        indexName: "pages",
        transformEntry: ({ entry }) => {
          return {
            id: entry.id,
            title: entry.title,
            content: entry.content,
            sections: (entry.sections ?? []).map(section => ({
              id: section.id,
              title: section.title,
              content: section.content,
            })),
          };
        },
        entriesQuery: {
          limit: 1000,
        },
      },
      "mes-aides": {
        indexName: "pages",
        transformEntry: ({ entry }) => {
          return {
            id: entry.id,
            title: entry.title,
            content: entry.content,
            sections: entry.sections,
          };
        },
        entriesQuery: {
          limit: 1000,
        },
      },
      parcours: {
        indexName: "pages",
        transformEntry: ({ entry }) => {
          return {
            id: entry.id,
            description: entry.description,
            slug: entry.slug,
            title: entry.title,
            items: (entry.items ?? []).map(item => ({
              id: item.id,
              title: item.title,
              description: item.description,
            })),
          };
        },
        entriesQuery: {
          limit: 1000,
        },
      },
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
  "import-export-entries": true,
});

export default plugins;
