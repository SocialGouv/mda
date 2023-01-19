import "@mda/strapi";

import { config } from "@common/config";
import { type UnknownMapping } from "@common/utils/types";
import {
  type CollectionTypeSchema,
  type GetAttributesKey,
  type GetAttributesValues,
  type SingleTypeSchema,
  type utils,
} from "@strapi/strapi";
import { stringify as qsStringify } from "qs";

type NeverKey<T> = { [P in keyof T]: T[P] extends never ? P : never }[keyof T];
type OmitNever<T> = Pick<T, Exclude<keyof T, NeverKey<T>>>;
type Model = OmitNever<{
  [Id in utils.SchemaUID]: Id extends `api::${string}`
    ? Strapi.Schemas[Id] extends SingleTypeSchema
      ? Strapi.Schemas[Id]["info"]["singularName"]
      : Strapi.Schemas[Id] extends CollectionTypeSchema
      ? Strapi.Schemas[Id]["info"]["pluralName"]
      : Strapi.Schemas[Id]["info"]["displayName"]
    : never;
}>;

type ReverseModel = {
  [Id in keyof Model as Model[Id]]: Id;
};

type LogicalOperators<T> = {
  /** Joins the filters in an "and" expression */
  $and?: Array<WhereParams<T>>;
  /** Joins the filters in an "or" expression */
  $or?: Array<WhereParams<T>>;
};

type AttributeOperators<T, K extends keyof T> = {
  /** Is between */
  $between?: [T[K], T[K]];
  /** Contains */
  $contains?: T[K];
  /** Contains (case-insensitive) */
  $containsi?: T[K];
  /** Ends with */
  $endsWith?: T[K];
  /** Equal */
  $eq?: Array<T[K]> | T[K];
  /** Equal (case-insensitive) */
  $eqi?: Array<T[K]> | T[K];
  /** Greater than */
  $gt?: T[K];
  /** Greater than or equal to */
  $gte?: T[K];
  /** Included in an array */
  $in?: Array<T[K]>;
  /** Less than */
  $lt?: T[K];
  /** Less than or equal to */
  $lte?: T[K];
  /** Not equal */
  $ne?: Array<T[K]> | T[K];
  /** Does not contain */
  $notContains?: T[K];
  /** Does not contain (case-insensitive) */
  $notContainsi?: T[K];
  /** Not included in an array */
  $notIn?: Array<T[K]>;
  /** Is not null */
  $notNull?: boolean;
  /** Is null */
  $null?: boolean;
  /** Starts with */
  $startsWith?: T[K];
};

type WhereParams<T> = LogicalOperators<T> & {
  [K in keyof T]?: Array<T[K]> | AttributeOperators<T, K> | T[K];
};

interface PaginationByPage {
  page: number;
  pageSize: number;
  withCount?: boolean;
}

interface PaginationByOffset {
  limit: number;
  start: number;
  withCount?: boolean;
}

interface _MetaPagination {
  page: number;
  pageCount: number;
  pageSize: number;
  total: number;
}

interface FetchParam<T extends keyof Model, Dto extends GetAttributesValues<T> = GetAttributesValues<T>> {
  fields?: Array<GetAttributesKey<T>>;
  filters?: WhereParams<Dto>;
  pagination?: PaginationByOffset | PaginationByPage;
  populate?: UnknownMapping | "*";
  /** @default "live" */
  publicationState?: "live" | "preview";
  sort?: Array<GetAttributesKey<T>> | GetAttributesKey<T>;
}

export const fetchStrapi = async <T extends keyof ReverseModel, TParams extends FetchParam<ReverseModel[T]>>(
  modelPath: T,
  params?: TParams,
): Promise<GetAttributesValues<ReverseModel[T]>> => {
  const query = params ? qsStringify(params) : null;

  const url = new URL(`/api/${modelPath}${query ? `?${query}` : ""}`, config.strapi.apiUrl);
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      // TODO: better building with ISR
      revalidate: 0,
    },
  });

  const payload = (await response.json()) as {
    data: { attributes: GetAttributesValues<ReverseModel[T]> };
    meta: unknown;
  };

  if (response.ok) {
    return payload.data.attributes;
  }

  console.error(response.statusText);
  throw new Error("Fetch Strapi error", { cause: response });
};
