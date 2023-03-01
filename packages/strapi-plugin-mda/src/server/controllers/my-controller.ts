import { type Strapi } from "@strapi/strapi";

export default ({ strapi }: { strapi: Strapi }) => ({
  index(ctx: any) {
    ctx.body = strapi.plugin("strapi-plugin-mda").service("myService").getWelcomeMessage();
  },
});
