import { config } from "@common/config";
import { type UnknownMapping } from "@common/utils/types";
import {
  type Model,
  type PaginationByOffset,
  type PaginationByPage,
  type Response,
  type ResponseCollection,
  type ReverseModel,
  type ReversePluralModel,
  type ReverseSingularModel,
  type WhereParams,
} from "@mda/strapi-types";
import { type GetAttributesKey, type GetAttributesValues } from "@strapi/strapi";
import { stringify as qsStringify } from "qs";

interface FetchParam<T extends keyof Model, Dto extends GetAttributesValues<T> = GetAttributesValues<T>> {
  fields?: Array<GetAttributesKey<T>>;
  filters?: WhereParams<Dto>;
  pagination?: PaginationByOffset | PaginationByPage;
  populate?: UnknownMapping | "*" | "deep";
  /** @default "live" */
  publicationState?: "live" | "preview";
  revalidate?: number;
  sort?: Array<GetAttributesKey<T> | "id"> | GetAttributesKey<T> | "id";
}

export async function fetchStrapi<
  T extends `${keyof ReversePluralModel}/${number}`,
  TModel extends T extends `${infer InferT extends keyof ReversePluralModel}/${number}` ? InferT : never,
  TParams extends FetchParam<ReverseModel[TModel]>,
>(ressource: T, params?: TParams): Promise<Response<ReverseModel[TModel]>>;
export async function fetchStrapi<
  T extends keyof ReversePluralModel,
  TParams extends FetchParam<ReversePluralModel[T]>,
>(ressource: T, params?: TParams): Promise<ResponseCollection<ReverseModel[T]>>;
export async function fetchStrapi<
  T extends keyof ReverseSingularModel,
  TParams extends FetchParam<ReverseSingularModel[T]>,
>(ressource: T, params?: TParams): Promise<Response<ReverseModel[T]>>;
export async function fetchStrapi<
  T extends keyof ReverseModel,
  TResPath extends T | `${T}/${number}`,
  TParams extends FetchParam<ReverseModel[T]>,
  Ret extends Response<ReverseModel[T]> | ResponseCollection<ReverseModel[T]>,
>(ressource: TResPath, { revalidate, ...params } = {} as TParams): Promise<Ret> {
  const query = params ? qsStringify(params) : null;
  if (typeof revalidate === "undefined") revalidate = config.fetchRevalidate;

  const url = new URL(`/api/${ressource}${query ? `?${query}` : ""}`, config.strapi.apiUrl);
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      revalidate,
    },
  });

  const payload = (await response.json()) as Ret;

  if (response.ok) {
    return payload;
  }

  console.error(response.statusText);
  throw new Error("Fetch Strapi error", { cause: response });
}
