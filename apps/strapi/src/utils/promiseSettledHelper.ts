export const isPromiseRejected = (result: PromiseSettledResult<unknown>): result is PromiseRejectedResult =>
  result.status === "rejected";

export const isPromiseFullfilled = <T>(result: PromiseSettledResult<T>): result is PromiseFulfilledResult<T> =>
  result.status === "fulfilled";

export class PromiseSettledError extends Error {
  constructor(reasons: unknown[]) {
    super(`[PromiseSettledError] please check the reasons ${JSON.stringify(reasons)}`);
  }
}
