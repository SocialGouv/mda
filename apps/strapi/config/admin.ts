import { type AdminPanelConfig, type StrapiConfigSetter } from "./types";

const admin: StrapiConfigSetter<AdminPanelConfig> = ({ env }) => ({
  autoOpen: false,
  auth: {
    secret: env("ADMIN_JWT_SECRET"),
  },
  apiToken: {
    salt: env("API_TOKEN_SALT"),
  },
  transfer: {
    token: {
      salt: env("TRANSFER_TOKEN_SALT"),
    },
  },
  watchIgnoreFiles: ["**/config/sync/**", "**/src/utils/seed/**"],
  host: env("HOST", "127.0.0.1"),
  port: "8080",
});

export default admin;
