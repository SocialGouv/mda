import { fetchWebhook } from "../../../../utils/fetchWebhookHelper";
import { type ContentTypeLifecyle } from "../../../../utils/types";

const lifecycles: ContentTypeLifecyle<"api::fiche-pratique.fiche-pratique"> = {
  async afterCreate(event) {
    if (!strapi.isLoaded || !event.result.slug) return;
    strapi.log.info(`[MDA][${event.model.uid}][${event.action}] Call webhook for "${event.result.slug}"`);
    await fetchWebhook(event.model.uid, event.result.slug);
  },
  async afterUpdate(event) {
    if (!strapi.isLoaded || !event.result.slug) return;
    strapi.log.info(`[MDA][${event.model.uid}][${event.action}] Call webhook for "${event.result.slug}"`);
    await fetchWebhook(event.model.uid, event.result.slug);
  },
};

export default lifecycles;
