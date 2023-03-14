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

export interface ContentTypeLifecyleBeforeHookEvent<T extends keyof Strapi.Schemas, S> {
  action: ContentTypeLifecyleType;
  model: object & { singularName: string; uid: T };
  params: object;
  state: S;
}

export interface ContentTypeLifecyleAfterHookEvent<T extends keyof Strapi.Schemas, S>
  extends ContentTypeLifecyleBeforeHookEvent<T, S> {
  result: GetAttributesValues<T>;
}

export type ContentTypeLifecyleType = `${"after" | "before"}${
  | "Count"
  | "FindMany"
  | "FindOne"
  | `${"Create" | "Delete" | "Update"}${"" | "Many"}`}`;

export type ContentTypeLifecyleBeforeType = Exclude<ContentTypeLifecyleType, `after${string}`>;

export type ContentTypeLifecyleAfterType = Exclude<ContentTypeLifecyleType, `before${string}`>;

export type ContentTypeLifecyleBeforeHookHandler<T extends keyof Strapi.Schemas, S> = (
  event: ContentTypeLifecyleBeforeHookEvent<T, S>,
) => Promise<void> | ReturnType<(typeof Promise)["allSettled"]> | void;

export type ContentTypeLifecyleAfterHookHandler<T extends keyof Strapi.Schemas, S> = (
  event: ContentTypeLifecyleAfterHookEvent<T, S>,
) => Promise<void> | ReturnType<(typeof Promise)["allSettled"]> | void;

export type ContentTypeLifecyleHandler<
  P extends ContentTypeLifecyleType,
  T extends keyof Strapi.Schemas,
  S,
> = P extends `after${string}` ? ContentTypeLifecyleAfterHookHandler<T, S> : ContentTypeLifecyleBeforeHookHandler<T, S>;

export type ContentTypeLifecyle<T extends keyof Strapi.Schemas, S> = {
  [P in ContentTypeLifecyleType]?: ContentTypeLifecyleHandler<P, T, S>;
};
