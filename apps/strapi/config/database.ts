import { type DatabaseConfig, type EnvHelper, type StrapiConfigSetter } from "./types";

const database: StrapiConfigSetter<DatabaseConfig> = ({ env }) => ({
  connection: {
    client: "postgres",
    connection: {
      host: env("DATABASE_HOST", "127.0.0.1"),
      port: env.int("DATABASE_PORT", 5432),
      database: env("DATABASE_NAME", "strapi"),
      user: env("DATABASE_USERNAME", "postgres"),
      password: env("DATABASE_PASSWORD", "postgres"),
      ssl: getSslConfig(env),
    },
  },
});

function getSslConfig(env: EnvHelper) {
  if (env.bool("DATABASE_SSL", false)) {
    return { rejectUnauthorized: false }; // For self-signed certificates
  }
  return false;
}

export default database;
