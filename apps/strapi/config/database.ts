import { type DatabaseConfig, type StrapiConfigSetter } from "./types";

const database: StrapiConfigSetter<DatabaseConfig> = ({ env }) => ({
  connection: {
    client: "postgres",
    connection: {
      host: env("DATABASE_HOST", "127.0.0.1"),
      port: env.int("DATABASE_PORT", 5432),
      database: env("DATABASE_NAME", "strapi"),
      user: env("DATABASE_USERNAME", "postgres"),
      password: env("DATABASE_PASSWORD", "postgres"),
      ssl: !!env("DATABASE_SSL", false),
    },
  },
});

export default database;
