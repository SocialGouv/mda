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
type SingularModel = OmitNever<{
  [Id in utils.SchemaUID]: Id extends `api::${string}`
    ? Strapi.Schemas[Id] extends SingleTypeSchema
      ? Strapi.Schemas[Id]["info"]["singularName"]
      : never
    : never;
}>;
type PluralModel = OmitNever<{
  [Id in utils.SchemaUID]: Id extends `api::${string}`
    ? Strapi.Schemas[Id] extends CollectionTypeSchema
      ? Strapi.Schemas[Id]["info"]["pluralName"]
      : never
    : never;
}>;
type Model = PluralModel & SingularModel;
type Reverse<T extends Record<string, string>> = {
  [Id in keyof T as T[Id]]: Id;
};
type ReverseSingularModel = Reverse<SingularModel>;
type ReversePluralModel = Reverse<PluralModel>;
type ReverseModel = Reverse<Model>;

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

interface FetchParam<T extends keyof Model, Dto extends GetAttributesValues<T> = GetAttributesValues<T>> {
  fields?: Array<GetAttributesKey<T>>;
  filters?: WhereParams<Dto>;
  pagination?: PaginationByOffset | PaginationByPage;
  populate?: UnknownMapping | "*" | "deep";
  /** @default "live" */
  publicationState?: "live" | "preview";
  sort?: Array<GetAttributesKey<T>> | GetAttributesKey<T>;
}

interface StrapiData<T extends keyof Model> {
  attributes: GetAttributesValues<T>;
  id: number;
}

export async function fetchStrapi<
  T extends `${keyof ReversePluralModel}/${number}`,
  TModel extends T extends `${infer InferT extends keyof ReversePluralModel}/${number}` ? InferT : never,
  TParams extends FetchParam<ReverseModel[TModel]>,
>(ressource: T, params?: TParams): Promise<StrapiData<ReverseModel[TModel]>>;
export async function fetchStrapi<
  T extends keyof ReversePluralModel,
  TParams extends FetchParam<ReversePluralModel[T]>,
>(ressource: T, params?: TParams): Promise<Array<StrapiData<ReverseModel[T]>>>;
export async function fetchStrapi<
  T extends keyof ReverseSingularModel,
  TParams extends FetchParam<ReverseSingularModel[T]>,
>(ressource: T, params?: TParams): Promise<StrapiData<ReverseModel[T]>>;
export async function fetchStrapi<
  T extends keyof ReverseModel,
  TResPath extends T | `${T}/${number}`,
  TParams extends FetchParam<ReverseModel[T]>,
  Elt extends StrapiData<ReverseModel[T]>,
  Ret extends Elt | Elt[],
>(ressource: TResPath, params?: TParams): Promise<Ret> {
  const query = params ? qsStringify(params) : null;

  const url = new URL(`/api/${ressource}${query ? `?${query}` : ""}`, config.strapi.apiUrl);
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      revalidate: 3600, // seconds
    },
  });

  const payload = (await response.json()) as {
    data: Ret;
    meta: unknown;
  };

  if (response.ok) {
    return payload.data;
  }

  console.error(response.statusText);
  throw new Error("Fetch Strapi error", { cause: response });
}
