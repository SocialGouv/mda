// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../index.d.ts" />

import { bootstraps } from "./bootstrap";
import { type StrapiApp } from "./utils/types";

const StrapiInit: StrapiApp = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi: _ }) {
    return;
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    for await (const { default: boostrapFunction } of bootstraps) {
      strapi.log.info(`[MDA] Bootstrap executing [${boostrapFunction.name}]`);
      await boostrapFunction({ strapi });
    }
  },
};

export default StrapiInit;
