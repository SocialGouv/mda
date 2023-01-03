import { type ServerConfig, type StrapiConfigSetter } from "./types";

const server: StrapiConfigSetter<ServerConfig> = ({ env }) => ({
  host: env("HOST", "127.0.0.1"),
  port: env.int("PORT", 1337),
  app: {
    keys: env.array("APP_KEYS", ["DEV1", "DEV2"]),
  },
});

export default server;
