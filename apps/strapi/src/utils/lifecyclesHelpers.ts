import { noop } from "./noopHelper";
import { isPromiseRejected, PromiseSettledError } from "./promiseSettledHelper";
import {
  type ContentTypeLifecyle,
  type ContentTypeLifecyleAfterHookHandler,
  type ContentTypeLifecyleAfterType,
  type ContentTypeLifecyleBeforeHookHandler,
  type ContentTypeLifecyleBeforeType,
} from "./types";

interface LifeCycleParams<T extends keyof Strapi.Schemas, S> {
  /**
   * This is used to not replicate the same implementation of an handler
   * for an after hook
   */
  afterHook?: {
    events: ContentTypeLifecyleAfterType[];
    handler: ContentTypeLifecyleAfterHookHandler<T, S>;
  };
  /**
   * This is used to not replicate the same implementation of an handler
   * for a before hook
   */
  beforeHook?: {
    events: ContentTypeLifecyleBeforeType[];
    handler: ContentTypeLifecyleBeforeHookHandler<T, S>;
  };
  /**
   * Specific hooks to apply.
   *
   * Please note that default hooks will override specific implementation
   *
   */
  hooks?: ContentTypeLifecyle<T, S>;
}

const genericHandler =
  <T extends keyof Strapi.Schemas, S>(
    handler: ContentTypeLifecyleAfterHookHandler<T, S> | ContentTypeLifecyleBeforeHookHandler<T, S>,
  ) =>
  async (...args: Parameters<typeof handler>) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await (handler as any)(...args);
    if (Array.isArray(result)) {
      const errors = result.filter(isPromiseRejected).map(r => r.reason);
      if (errors.length) {
        console.warn(new PromiseSettledError(errors));
      }
    }
    return result;
  };

export const lifecycles = {
  createLifeCycle<T extends keyof Strapi.Schemas, S = object>({
    afterHook = { events: [], handler: noop },
    beforeHook = { events: [], handler: noop },
    hooks = {},
  }: LifeCycleParams<T, S>): ContentTypeLifecyle<T, S> {
    for (const event of beforeHook.events) {
      hooks[event] = genericHandler(beforeHook.handler);
    }

    for (const event of afterHook.events) {
      hooks[event] = genericHandler(afterHook.handler);
    }

    return hooks;
  },
};
