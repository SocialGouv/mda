import { type Strapi as BaseStrapi } from "@strapi/strapi";

export type StrapiLifecycleProps = { strapi: BaseStrapi };
export type StrapiLifecycle = (props: StrapiLifecycleProps) => Promise<void> | void;
export interface StrapiApp {
  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap: StrapiLifecycle;
  /**
   * An asynchronous destroy function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to stop services that are
   * running, or clean up plugin actions (e.g. close connections,
   * remove listeners, etc.)
   */
  destroy?: StrapiLifecycle;
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register?: StrapiLifecycle;
}
