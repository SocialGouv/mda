import { type GetAttributesValues, type Strapi as BaseStrapi } from "@strapi/strapi";

export interface StrapiLifecycleEvent {
  strapi: BaseStrapi;
}
export type StrapiLifecycle = (event: StrapiLifecycleEvent) => Promise<void> | void;
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

export interface ContentTypeLifecyleHookEvent<T extends keyof Strapi.Schemas, S> {
  action: ContentTypeLifecyleType;
  model: object & { uid: T };
  params: object;
  state: S;
}

export interface ContentTypeLifecyleAfterHookEvent<T extends keyof Strapi.Schemas, S>
  extends ContentTypeLifecyleHookEvent<T, S> {
  result: GetAttributesValues<T>;
}

export type ContentTypeLifecyleType = `${"after" | "before"}${
  | "Count"
  | "FindMany"
  | "FindOne"
  | `${"Create" | "Delete" | "Update"}${"" | "Many"}`}`;

export type ContentTypeLifecyle<T extends keyof Strapi.Schemas, S = object> = {
  [P in ContentTypeLifecyleType]?: (
    event: P extends `after${string}` ? ContentTypeLifecyleAfterHookEvent<T, S> : ContentTypeLifecyleHookEvent<T, S>,
  ) => Promise<void> | void;
};
