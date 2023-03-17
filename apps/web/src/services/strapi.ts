import { config } from "@common/config";
import { type UnknownMapping } from "@common/utils/types";
import {
  type MeilisearchApiHit,
  type MeilisearchApiHits,
  type Model,
  type PaginationByOffset,
  type PaginationByPage,
  type Response,
  type ResponseCollection,
  type ResponseSearch,
  type ReverseMeilisearchIndexModel,
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

interface FetchMethodParams {
  page: number;
}

export class FetchStrapiError extends Error {
  constructor(public message: string, public cause?: globalThis.Response) {
    super(message, { cause });
  }
}

export async function fetchStrapi<
  TModel extends keyof Model,
  TParams extends FetchMethodParams = FetchMethodParams,
  T extends `${keyof ReverseSingularModel}/${string}` = `${keyof ReverseSingularModel}/${string}`,
>(resource: T, params?: TParams): Promise<ResponseCollection<TModel>>;
export async function fetchStrapi<
  T extends `${keyof ReversePluralModel}/${number}`,
  TModel extends T extends `${infer InferT extends keyof ReversePluralModel}/${number}` ? InferT : never,
  TParams extends FetchParam<ReverseModel[TModel]>,
>(resource: T, params?: TParams): Promise<Response<ReverseModel[TModel]>>;
export async function fetchStrapi<
  T extends keyof ReversePluralModel,
  TParams extends FetchParam<ReversePluralModel[T]>,
>(resource: T, params?: TParams): Promise<ResponseCollection<ReverseModel[T]>>;
export async function fetchStrapi<
  T extends keyof ReverseSingularModel,
  TParams extends FetchParam<ReverseSingularModel[T]>,
>(resource: T, params?: TParams): Promise<Response<ReverseModel[T]>>;
export async function fetchStrapi<
  T extends keyof ReverseModel,
  TResPath extends T | `${T}/${number}` | `${T}/${string}`,
  TParams extends FetchParam<ReverseModel[T]>,
  Ret extends Response<ReverseModel[T]> | ResponseCollection<ReverseModel[T]>,
>(resource: TResPath, { revalidate, ...params } = {} as TParams): Promise<Ret> {
  const query = params ? qsStringify(params) : null;
  if (typeof revalidate === "undefined") revalidate = config.fetchRevalidate;

  const url = new URL(`/api/${resource}${query ? `?${query}` : ""}`, config.strapi.apiUrl);
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

  console.error(`Fetch failed for ${resource}`, response.status, response.statusText);
  return { data: null } as Ret;
}

type MeilisearchHit = MeilisearchApiHits<keyof Strapi.Schemas>;

export interface SearchHit {
  id: string;
  title: string;
  url: string;
}

export async function searchStrapi(query: string): Promise<MeilisearchHit[]> {
  const url = new URL(`/meilisearch/search?q=${query}`, config.strapi.apiUrl);
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const payload = (await response.json()) as ResponseSearch<MeilisearchHit>;

  if (response.ok) {
    return payload.hits;
  }

  console.error(`Search failed for query "${query}"`, response.status, response.statusText);
  return [];
}

const isMeilisearchHitOf = <T extends keyof ReverseMeilisearchIndexModel>(
  hit: MeilisearchApiHit<keyof Strapi.Schemas>,
  of: T,
): hit is MeilisearchApiHit<ReverseMeilisearchIndexModel[T]> => {
  return hit._meilisearch_id.startsWith(of as string);
};

export function mapMeilisearchHit(hit: MeilisearchHit): SearchHit | undefined {
  if (isMeilisearchHitOf(hit, "fiche-pratique") && hit.slug) {
    return {
      id: hit._meilisearch_id,
      title: hit.title,
      url: `/fiches-pratiques/${hit.slug}`,
    };
  }

  if (isMeilisearchHitOf(hit, "glossaire-item") && hit.title) {
    return {
      id: hit._meilisearch_id,
      title: hit.title,
      url: `/glossaire#${hit.title}`,
    };
  }

  if (isMeilisearchHitOf(hit, "maison-de-l-autisme")) {
    return {
      id: hit._meilisearch_id,
      title: hit.title,
      url: `/la-maison-de-l-autisme`,
    };
  }

  if (isMeilisearchHitOf(hit, "parcours") && hit.slug) {
    return {
      id: hit._meilisearch_id,
      title: hit.title,
      url: `/mon-parcours/${hit.slug}`,
    };
  }

  console.warn("Unknown hit", hit);
  return;
}
