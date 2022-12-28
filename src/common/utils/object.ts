import { type SimpleObject } from "./types";

/**
 * Return true if the object has no property.
 */
export const isEmpty = (obj: SimpleObject) => {
  for (const prop in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) return false;
  }

  return true;
};
