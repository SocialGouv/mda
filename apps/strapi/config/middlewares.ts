import { type MiddlewaresConfig } from "./types";

const middlewares: MiddlewaresConfig = [
  "strapi::errors",
  "strapi::security",
  "strapi::cors",
  "strapi::poweredBy",
  "strapi::logger",
  "strapi::query",
  {
    name: "strapi::body",
    config: {
      jsonLimit: "50mb",
    },
  },
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];

export default middlewares;
