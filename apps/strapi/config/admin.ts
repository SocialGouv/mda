import { type AdminPanelConfig, type StrapiConfigSetter } from "./types";

const admin: StrapiConfigSetter<AdminPanelConfig> = ({ env }) => ({
  autoOpen: false,
  auth: {
    secret: env("ADMIN_JWT_SECRET"),
  },
  apiToken: {
    salt: env("API_TOKEN_SALT"),
  },
  watchIgnoreFiles: ["**/config/sync/**"],
});

export default admin;
