import { type Context } from "koa";
import { parse } from "querystring";

import { ctxParams } from "../../../utils/ctxParamsHelper";

/**
 * This is supposed to work with a POST request but for some reason
 * Promise is never resolved
 */
const getBody = async (rawrequest: Context["req"]) => {
  return new Promise((resolve, reject) => {
    let bodycontent = "";
    rawrequest.on("data", chunk => (bodycontent += chunk.toString()));
    rawrequest.on("end", () => resolve(bodycontent));
    rawrequest.on("error", err => reject(err));
  });
};

/**
 * This controller is responsible of searching on meilisearch
 */
const searchController = () => {
  return {
    /**
     * This will perform the search on melisearch
     * Params need to be passed in the url search
     */
    async search(ctx: Context) {
      const params = ctxParams(ctx);

      try {
        /**
         * This is because fetch is not in node typings yet
         * And we don't want to import lib.dom.d.ts
         */
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const res = await fetch(`${process.env.MEILISEARCH_HOST}/indexes/pages/search`, {
          method: "POST",
          body: JSON.stringify(parse(params.toString())),
          headers: {
            Authorization: `Bearer ${process.env.MEILISEARCH_MASTER_KEY}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          ctx.status = res.status;
          ctx.body = {
            message: res.statusText,
          };
          return;
        }

        ctx.send(await res.json());
      } catch (err) {
        console.error(err);
        ctx.status = 500;
        ctx.body = {
          message: "Internal Server Error",
        };
      }
    },
  };
};

export default searchController;
