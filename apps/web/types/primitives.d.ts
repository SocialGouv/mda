/**
 * Widened expression of nothingness.
 */
declare type nothing = never | 0 | null | undefined;

/**
 * Simpler and shorter `Promise<void>`.
 */
declare type pvoid = Promise<void> | void;

/**
 * Stub to trick eslint.
 * @deprecated
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare type Any = any;

/**
 * Force expand a type for debug purpose. Don't work on every type.
 * @deprecated
 */
// eslint-disable-next-line @typescript-eslint/ban-types
declare type __DEBUG_TYPE__<T> = { [P in keyof T]: T[P] } & {};

declare module "@codegouvfr/react-dsfr/*.svg" {
  export interface SVG {
    height: number;
    src: string;
    width: number;
  }

  const content: SVG;

  export = content;
}
