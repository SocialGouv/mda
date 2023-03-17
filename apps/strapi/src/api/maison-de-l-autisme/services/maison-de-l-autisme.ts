/**
 * maison-de-l-autisme service
 */

import { type DbEntry } from "@mda/strapi-types";
import { factories } from "@strapi/strapi";
import { type Context } from "koa";

import { ctxParams } from "../../../utils/ctxParamsHelper";

const pageSize = 25;
const currentPage = (params: URLSearchParams) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  if (params.has("page") && !isNaN(+params.get("page")!)) {
    return +(params.get("page") as string);
  }
  return 0;
};

export default factories.createCoreService("api::maison-de-l-autisme.maison-de-l-autisme", ({ strapi }) => {
  const upcomingEventsQuery = () =>
    strapi.db
      .connection({ events: "events", mdaEvents: "maison_de_l_autismes_events_links" })
      .whereRaw("?? = ??", ["events.id", "mdaEvents.event_id"])
      .whereNotNull("events.published_at")
      .andWhereRaw("events.end_date > now()");

  return {
    async upcomingEvents(ctx: Context) {
      const page = currentPage(ctxParams(ctx));

      const [[{ count }], events] = (await Promise.all([
        upcomingEventsQuery().count("events.id"),
        upcomingEventsQuery()
          .select({
            id: "events.id",
            title: "events.title",
            description: "events.description",
            start_date: "events.start_date",
            end_date: "events.end_date",
            createdAt: "events.created_at",
            updatedAt: "events.updated_at",
            publishedAt: "events.published_at",
            connection_link: "events.connection_link",
          })
          .offset(page ? (page - 1) * pageSize : 0)
          .limit(pageSize)
          .orderBy("events.start_date"),
      ])) as unknown as [[{ count: number }], Array<DbEntry<"api::event.event">>];

      return {
        data: events.map(({ id, ...attributes }) => ({ id, attributes })),
        meta: {
          pagination: {
            page,
            pageSize,
            pageCount: Math.ceil(count / pageSize),
            total: count,
          },
        },
      };
    },
  };
});
