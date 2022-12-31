import { type ServerConfig, type StrapiConfigSetter } from "./types";

const server: StrapiConfigSetter<ServerConfig> = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  app: {
    keys: env.array("APP_KEYS"),
  },
});

export default server;
