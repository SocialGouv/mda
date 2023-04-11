import { type MatomoConfig, type StrapiConfigSetter } from "./types";

const matomo: StrapiConfigSetter<MatomoConfig> = ({ env }) => ({
  siteId: env("MATOMO_SITE_ID"),
  token: env("MATOMO_TOKEN"),
  url: env("MATOMO_URL"),
});

export default matomo;
