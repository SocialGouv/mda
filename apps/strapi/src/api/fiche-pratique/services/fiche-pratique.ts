/**
 * fiche-pratique service
 */

import { type DbEntry } from "@mda/strapi-types";
import { factories } from "@strapi/strapi";
import { type Response } from "node-fetch";

const MOST_VIEWD_PAGE_SIZE = 6;

interface MatomoEntryPageUrl {
  label: string;
}

const isMatomoData = (data: unknown): data is MatomoEntryPageUrl[] => {
  return Array.isArray(data);
};

export default factories.createCoreService("api::fiche-pratique.fiche-pratique", ({ strapi }) => {
  const matomoSiteId = strapi.config.get("matomo.siteId");
  const matomoUrl = strapi.config.get("matomo.url");
  const matomoToken = strapi.config.get("matomo.token");

  return {
    async mostViewed() {
      let data: Array<DbEntry<"api::fiche-pratique.fiche-pratique">> = [];
      if (!matomoUrl || !matomoToken || !matomoSiteId) {
        strapi.log.warn("No matomo config found ! Fallback on id sort");
        data = await strapi.entityService.findMany("api::fiche-pratique.fiche-pratique", {
          sort: "id",
          limit: MOST_VIEWD_PAGE_SIZE,
        });
      } else {
        const params = new URLSearchParams({
          date: "today",
          filter_pattern: "fiches-pratiques/.*",
          flat: "1",
          format: "json",
          idSite: matomoSiteId,
          method: "Actions.getEntryPageUrls",
          module: "API",
          period: "year",
          token_auth: matomoToken,
        });

        try {
          /**
           * This is because fetch is not in node typings yet
           * And we don't want to import lib.dom.d.ts
           */
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const matomoRequest: Response = await fetch(`${matomoUrl}?${params.toString()}`);

          if (!matomoRequest.ok) {
            throw new Error(await matomoRequest.text());
          }

          const matomoData = await matomoRequest.json();

          if (!isMatomoData(matomoData)) {
            throw matomoData;
          }

          while (!!matomoData.length && data.length < 6) {
            const [{ label }] = matomoData.splice(0, 1);
            const [fiche] = (await strapi.entityService.findMany("api::fiche-pratique.fiche-pratique", {
              filters: { slug: label.split("/").pop() },
            })) as Array<DbEntry<"api::fiche-pratique.fiche-pratique">>;

            if (fiche) {
              data.push(fiche);
            } else {
              strapi.log.warn(`Cannot find fiche pratique for label ${label}`);
            }
          }
        } catch (e) {
          strapi.log.error("Cannot retrieve data on matomo", e);
        }
      }

      return {
        data: data.map(({ id, ...attributes }) => ({ id, attributes })),
        meta: {
          pagination: {
            page: 1,
            pageSize: data.length,
            pageCount: 1,
            total: data.length,
          },
        },
      };
    },
  };
});
