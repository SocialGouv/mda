import {
  type CollectionTypeSchema,
  type ComponentSchema,
  type GetAttributesKey,
  type SingleTypeSchema,
  type Strapi,
} from "@strapi/strapi";
import { type SignOptions } from "jsonwebtoken";
import { type Knex } from "knex";
import type Koa from "koa";
import { type RateLimitOptions } from "koa2-ratelimit";
import { type Timezone } from "node-schedule";

type UniqueString<T extends string = string> = Record<never, never> & T;

export interface EnvHelper {
  (key: keyof NodeJS.ProcessEnv, defaultValue?: unknown): string;
  array(key: keyof NodeJS.ProcessEnv, defaultValue?: string[]): string[];
  bool(key: keyof NodeJS.ProcessEnv, defaultValue?: boolean): boolean;
  date(key: keyof NodeJS.ProcessEnv, defaultValue?: Date): Date;
  float(key: keyof NodeJS.ProcessEnv, defaultValue?: number): number;
  int(key: keyof NodeJS.ProcessEnv, defaultValue?: number): number;
  json<T extends object>(key: keyof NodeJS.ProcessEnv, defaultValue?: T): T;
}

export type StrapiConfigSetter<T> = (helpers: { env: EnvHelper }) => T;

export interface AdminPanelConfig {
  apiToken?: {
    /**
     * Salt used to generate API tokens
     */
    salt: string;
  };
  /**
   * Authentication configuration
   */
  auth?: {
    /**
     * Record of all the events subscribers registered for the authentication
     */
    events?: {
      /**
       * Function called when an admin user fails to log in to the administration panel
       */
      onConnectionError?: (result: { error: unknown; provider: string }) => void;
      /**
       * Function called when an admin user log in successfully to the administration panel
       */
      onConnectionSuccess?: (result: { provider: string; user: unknown }) => void;
    };
    /**
     * Options object passed to `jsonwebtoken`
     */
    options?: SignOptions;
    /**
     * Secret used to encode JWT tokens
     */
    secret?: string;
  };
  /**
   * Enable or disabled administration opening on start.
   * @default true
   */
  autoOpen?: boolean;
  /**
   * Settings to customize the forgot password email
   */
  forgotPassword?: {
    /**
     * Email template as defined in email plugin
     */
    emailTemplate?: {
      html?: string;
      subject?: string;
      text?: string;
    };
    /**
     * Sender mail address
     */
    from?: string;
    /**
     * Settings to customize the rate limiting of the admin panel's authentication
     * endpoints, additional configuration options come from `koa2-ratelimit``
     */
    rateLimit?: RateLimitOptions;
    /**
     * Default address or addresses the receiver is asked to reply to
     */
    replyTo?: string;
  };
  /**
   * Use a different host for the admin panel.
   * Only used along with `strapi develop --watch-admin`
   * @default "localhost"
   */
  host?: string;
  /**
   * Use a different port for the admin panel.
   * Only used along with `strapi develop --watch-admin`
   * @default "8000"
   */
  port?: string;
  /**
   * If false, the admin panel won't be served.
   * Note: the `index.html` will still be served.
   * @default true
   */
  serveAdminPanel?: boolean;
  /**
   * Url of your admin panel. Default value: `/admin`. Note: If the url is relative,
   * it will be concatenated with `url`.
   * @default "/admin"
   */
  url?: string;
  /**
   * Add custom files that should not be watched during development.
   * @default []
   */
  watchIgnoreFiles?: string[];
}

export interface DatabaseConfig {
  connection: Knex.Config;
  settings?: {
    /**
     * Enable or disable the forced database migration.
     * @default true
     */
    forceMigration?: boolean;
    /**
     * Enable or disable database migrations from running on start up.
     * @default true
     */
    runMigrations?: boolean;
  };
}

export interface CronTask {
  options: {
    /**
     * Cron expression string.
     */
    rule: string;
    /**
     * Timezone
     */
    tz?: Timezone;
  };
  task: (param: { strapi: Strapi }) => void;
}

type SocketExt = UniqueString<".socket">;
export interface ServerConfig {
  app: {
    /**
     * Declare session keys (based on Koa session), which is used by the `session`
     * middleware for the Users & Permissions plugin and the Documentation plugin.
     */
    keys: Koa["keys"];
  };
  /**
   * Cron configuration (powered by `node-schedule`)
   */
  cron?: {
    /**
     * Enable or disable `CRON jobs` to schedule jobs at specific dates.
     * @default false
     */
    enable?: boolean;
    /**
     * Declare `CRON jobs` to be run at specific dates.
     */
    tasks?: Record<string, CronTask | CronTask["task"]>;
  };
  /**
   * Path configuration of different directories Strapi uses.
   */
  dirs?: Partial<{
    [P: string]: string;
    /**
     * Customize the path of the public folder.
     * @default "./public"
     */
    public: string;
  }>;
  /**
   * Enable errors to be emitted to `koa` when they happen in order to attach custom
   * logic or use error reporting services.
   * @default false
   */
  emitErrors?: boolean;
  /**
   * Host name
   */
  host: string;
  /**
   * Port on which the server should be running.
   */
  port: number;
  /**
   * Set the koa variable `app.proxy`. When true, proxy header fields will be trusted.
   * @default false
   */
  proxy?: Koa["proxy"];
  /**
   * Listens on a socket. Host and port are cosmetic when this option is provided and
   * likewise use `url` to generate proper urls when using this option.
   * This option is useful for running a server without exposing a port and using
   * proxy servers on the same machine (e.g Heroku nginx buildpack)
   * @default "/tmp/nginx.socket"
   */
  socket?: SocketExt | number | `${string}${SocketExt}`;
  /**
   * Public url of the server. Required for many different features (ex: reset password,
   * third login providers etc.).
   * Also enables proxy support such as Apache or Nginx, example: `https://mywebsite.com/api`.
   * The url can be relative, if so, it is used with `http://${host}:${port}` as the base url.
   * An absolute url is however recommended.
   * @default ""
   */
  url?: string;
  webhooks?: {
    defaultHeaders?: Record<string, string>;
  };
}

type MiddlewareName =
  | `api::${string}.${string}`
  | `global::${string}`
  | `plugin::${string}.${string}`
  | `strapi::${string}`;

interface MiddlewareOptions {
  // TODO add types for config https://docs.strapi.io/developer-docs/latest/setup-deployment-guides/configurations/required/middlewares.html#loading-order
  config?: object;
  name?: MiddlewareName;
  resolve?: string;
}

type MandatoryMiddlewaresConfig = [
  ["strapi::errors", never],
  ["strapi::security", never],
  ["strapi::cors", never],
  ["strapi::poweredBy", never],
  ["strapi::logger", never],
  ["strapi::query", never],
  [
    "strapi::body",
    {
      encoding?: string;
      formLimit?: number | string;
      formidable?: unknown;
      jsonLimit?: number | string;
      multipart?: boolean;
      patchKoa?: boolean;
      textLimit?: number | string;
    },
  ],
  ["strapi::session", never],
  ["strapi::favicon", never],
  ["strapi::public", never],
];

type MapConfig<T extends MandatoryMiddlewaresConfig> = {
  [P in keyof T]: T[P][1] extends never
    ? T[P][0]
    :
        | T[P][0]
        | {
            config: T[P][1];
            name: T[P][0];
          };
};
type MandatoryMiddlewares = MapConfig<MandatoryMiddlewaresConfig>;

export type MiddlewaresConfig = Array<MiddlewareName | MiddlewareOptions> & MandatoryMiddlewares;

export interface ApiConfig {
  /**
   * Global API response configuration
   */
  responses?: {
    /**
     * Set of globally defined attributes to be treated as private.
     * @default []
     */
    privateAttributes?: string[];
  };
  /**
   * REST API configuration
   */
  rest: {
    /**
     * Default `limit` parameter used in API calls
     * @default 25
     */
    defaultLimit?: number;
    /**
     * Maximum allowed number that can be requested as `limit`
     * @default 100
     */
    maxLimit?: number;
    /**
     * The API prefix
     * @default "/api"
     */
    prefix?: string;
    withCount?: boolean;
  };
}

interface StrapiConfigSyncSettings {
  customTypes?: Array<{ configName: string; jsonFields?: string[]; queryString: string; uid: string[] | string }>;
  excludedConfig?: SchemaNames[];
  excludedTypes?: string[];
  importOnBootstrap?: boolean;
  minify?: boolean;
  soft?: boolean;
  syncDir: string;
}

interface PopulateDeepSettings {
  defaultDepth?: number;
}

interface SlugifySettings {
  contentTypes: {
    [P in keyof ReverseModelSingularName]?: {
      field: string;
      references: Array<GetAttributesKey<ReverseModelSingularName[P]>> | GetAttributesKey<ReverseModelSingularName[P]>;
    };
  };
  shouldUpdateSlug?: boolean;
  skipUndefinedReferences?: boolean;
  slugifyOptions?: unknown;
  slugifyWithCount?: boolean;
}

type PluginEntry<T = unknown> =
  | boolean
  | {
      config: T;
      enabled?: boolean;
      resolve?: string;
    };

export type PluginsConfig = {
  [P: string]: PluginEntry;
  "config-sync": PluginEntry<StrapiConfigSyncSettings>;
  "import-export-entries": PluginEntry;
  slugify: PluginEntry<SlugifySettings>;
  "strapi-plugin-populate-deep": PluginEntry<PopulateDeepSettings>;
};

// --- strapi-config-sync-plugin
type SchemaNames =
  | "admin-role.strapi-super-admin"
  | "core-store.core_admin_auth"
  | "core-store.plugin_content_manager_configuration_content_types::plugin::slugify.slug"
  | "core-store.plugin_upload_metrics"
  | "core-store.plugin_upload_settings"
  | "core-store.plugin_upload_view_configuration"
  | "core-store.plugin_users-permissions_advanced"
  | "core-store.plugin_users-permissions_email"
  | "core-store.plugin_users-permissions_grant"
  | "core-store.strapi_content_types_schema"
  | "user-role.authenticated"
  | "user-role.public"
  | `core-store.plugin_content_manager_configuration_${{
      [Id in keyof Strapi.Schemas]: Strapi.Schemas[Id] extends ComponentSchema
        ? `components::${Id}`
        : `content_types::${Id}`;
    }[keyof Strapi.Schemas]}`;
// ---

// --- slugify
type NeverKey<T> = { [P in keyof T]: T[P] extends never ? P : never }[keyof T];
type OmitNever<T> = Pick<T, Exclude<keyof T, NeverKey<T>>>;
type ModelSingularName = OmitNever<{
  [Id in keyof Strapi.Schemas]: Strapi.Schemas[Id] extends CollectionTypeSchema | SingleTypeSchema
    ? Strapi.Schemas[Id]["info"]["singularName"]
    : never;
}>;
type ReverseModelSingularName = {
  [Id in keyof ModelSingularName as ModelSingularName[Id]]: Id;
};
// ---
