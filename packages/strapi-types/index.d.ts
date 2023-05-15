import {
  type CollectionTypeSchema,
  type StringAttribute,
  type BooleanAttribute,
  type RequiredAttribute,
  type SetMinMaxLength,
  type DefaultTo,
  type DateTimeAttribute,
  type IntegerAttribute,
  type TextAttribute,
  type Attribute,
  type ComponentAttribute,
  type DynamicZoneAttribute,
  type GetAttribute,
  type GetAttributes,
  type GetAttributesKey,
  type GetAttributesOptionalKeys,
  type GetAttributesRequiredKeys,
  type GetAttributeValue,
  type GetComponentAttributeValue,
  type GetDynamicZoneAttributeValue,
  type GetMediaAttributeValue,
  type GetRelationAttributeValue,
  type MediaAttribute,
  type PasswordAttribute,
  type PrivateAttribute,
  type RelationAttribute,
  type SingleTypeSchema,
  type utils,
  ComponentSchema,
} from "@strapi/strapi";

export * from "./strapi"

// Helper used to add an ID attribute to another type
type WithID = { id: number };

type WithMeilisearchID<T extends utils.SchemaUID> = { _meilisearch_id: `${Strapi.Schemas[T]["info"]["singularName"]}-${string}` };

type APISchemaUID<T extends utils.SchemaUID> = T extends `api::${string}` ? T : never;

// Values resolvers that we need to replace by custom ones & remove from the base GetAttributesValues implementation
type ExcludedValuesResolvers<T extends Attribute> =
  | GetComponentAttributeValue<T>
  | GetDynamicZoneAttributeValue<T>
  | GetMediaAttributeValue<T>
  | GetRelationAttributeValue<T>;

// Custom GetRelationAttributeValue implementation for the content api
type ContentAPIRelationValue<T extends Attribute> = T extends RelationAttribute<infer _S, infer R, infer G>
  ? R extends `${string}Many`
    ? Omit<ResponseCollection<G>, "meta">
    : Response<G>
  : never;

// Custom GetComponentAttributeValue implementation for the content api
type ContentAPIComponentValue<T extends Attribute> = T extends ComponentAttribute<infer U, infer R>
  ? R extends true ? Array<WithID & GetAttributesValues<U>> : (WithID & GetAttributesValues<U>)
  : never;

// Custom GetMediaAttributeValue implementation for the content api
type ContentAPIMediaValue<T extends Attribute> = T extends MediaAttribute<infer _, infer R>
  ? {
      data: (R extends true ? Array<DataWrapper<"plugin::upload.file">> : DataWrapper<"plugin::upload.file">) | null;
    }
  : never;

// Custom GetDynamicZoneAttributeValue implementation for the content api
type ContentAPIDynamicZoneValue<T extends Attribute> = T extends DynamicZoneAttribute<infer C>
  ? Array<
      utils.GetArrayValues<C> extends infer P
        ? P extends utils.SchemaUID
          ? GetAttributesValues<P> & WithID & { __component: P }
          : never
        : never
    >
  : never;

// Aggregation of all the custom content api's custom value resolvers
type ContentAPIValueResolvers<T extends Attribute> =
  | ContentAPIComponentValue<T>
  | ContentAPIDynamicZoneValue<T>
  | ContentAPIMediaValue<T>
  | ContentAPIRelationValue<T>;

// Custom GetAttributeValue implementation based on specific content api rules
// If the given attribute isn't handled by the custom resolvers, then it'll fallback
// to the base implementation and its resolvers
type GetValue<T extends utils.SchemaUID, U extends GetAttributesKey<T>> = GetAttribute<T, U> extends infer P
  ? P extends Attribute
    ? ContentAPIValueResolvers<P> | Exclude<GetAttributeValue<P>, ExcludedValuesResolvers<P>>
    : never
  : never;

// Get the list of allowed attributes' names for the content api
// Removes privates and password fields for now
// note: creatorsFields are already handled since their private value is dynamic (set at content-type loading & dumped into the schemas typings)
type _GetAllowedAttributesKey<T extends utils.SchemaUID> = GetAttributes<T> extends infer A
  ? keyof Omit<A, utils.KeysBy<A, PasswordAttribute | PrivateAttribute>>
  : never;

// Custom GetAttributesValues implementation which includes specific
// content API logic (sanitation, custom value resolvers, etc...)
// type GetAttributesValues<T extends utils.SchemaUID> = {
//   [key in GetAllowedAttributesKey<T>]?: GetValue<T, key>;
// };

export type GetAttributesValues<T extends utils.SchemaUID> = {
  // Handle optional attributes
  [key in GetAttributesOptionalKeys<T>]?: GetValue<T, key>;
} & {
  // Handle required attributes
  [key in GetAttributesRequiredKeys<T>]-?: GetValue<T, key>;
};

// Wrapper which contains the id/attributes couple, used to type the responses' data property
// interface DataWrapper<T extends utils.SchemaUID | null = null> extends WithID {
//   attributes: T extends utils.SchemaUID ? GetAttributesValues<T> : unknown;
// }

export interface DataWrapper<T extends utils.SchemaUID | null = null> extends WithID {
  attributes: T extends utils.SchemaUID ? GetAttributesValues<T> : unknown;
}

// Represent a response structure for a single entity
export interface Response<T extends utils.SchemaUID> {
  data: DataWrapper<T> | null;
}

// Represent a response structure for an entity collection
export interface ResponseCollection<T extends utils.SchemaUID> {
  data: Array<DataWrapper<T>> | null;
  meta: CollectionMetadata;
}

export interface CollectionMetadata {
  pagination: {
    page: number;
    pageCount: number;
    pageSize: number;
    total: number;
  };
}

type NeverKey<T> = { [P in keyof T]: T[P] extends never ? P : never }[keyof T];
type OmitNever<T> = Pick<T, Exclude<keyof T, NeverKey<T>>>;
type SingularModel = OmitNever<{
  [Id in APISchemaUID<utils.SchemaUID>]: Strapi.Schemas[Id] extends SingleTypeSchema
    ? Strapi.Schemas[Id]["info"]["singularName"]
    : never;
}>;
type PluralModel = OmitNever<{
  [Id in APISchemaUID<utils.SchemaUID>]: Strapi.Schemas[Id] extends CollectionTypeSchema
    ? Strapi.Schemas[Id]["info"]["pluralName"]
    : never;
}>;

export type Model = PluralModel & SingularModel;

type Reverse<T extends Record<string, string>> = {
  [Id in keyof T as T[Id]]: Id;
};

export type ReverseSingularModel = Reverse<SingularModel>;
export type ReversePluralModel = Reverse<PluralModel>;
export type ReverseModel = Reverse<Model>;

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

export type WhereParams<T> = LogicalOperators<T> & {
  [K in keyof T]?: Array<T[K]> | AttributeOperators<T, K> | T[K];
};

export interface PaginationByPage {
  page?: number;
  pageSize?: number;
  withCount?: boolean;
};

export interface PaginationByOffset {
  limit?: number;
  start?: number;
  withCount?: boolean;
};

export type MeillisearchPluginEntry<T extends utils.SchemaUID> = {
  entry: DbEntry<T>;
};

export type DbEntry<T extends utils.SchemaUID> = GetAttributesValues<T> & WithID;

export type MeilisearchIndexModel = OmitNever<{
  [Id in APISchemaUID<utils.SchemaUID>]: Strapi.Schemas[Id]["info"]["singularName"];
}>;

export type ReverseMeilisearchIndexModel = Reverse<MeilisearchIndexModel>;

export type MeilisearchApiHit<T extends utils.SchemaUID> = GetAttributesValues<T> & WithID & WithMeilisearchID<T>;

export type MeilisearchApiHits<T extends utils.SchemaUID> = MeilisearchApiHit<APISchemaUID<T>>;

export interface ResponseSearch<T> {
  estimatedTotalHits: number;
  hits: Array<T>
  limit: number;
  offset: number;
  processingTimeMs: number;
  query: string;
};

export interface DiagnosticRootNodeData {
  content: string;
}

export interface DiagnosticQuestionNodeData extends DiagnosticRootNodeData {
  displayInfoUp: boolean;
  info?: string;
}

export interface DiagnosticAnswerNodeData extends DiagnosticQuestionNodeData {
  order?: number;
}

export type DiagnosticSubanswerNodeData = DiagnosticAnswerNodeData

export type DiagnosticNodeData =
  | DiagnosticRootNodeData
  | DiagnosticQuestionNodeData
  | DiagnosticAnswerNodeData
  | DiagnosticSubanswerNodeData;

export type DiagnosticRootNodeType = "mda-root-question"

export type DiagnosticQuestionNodeType = "mda-question"

export type DiagnosticAnswerNodeType = "mda-answer"

export type DiagnosticSubAnswerNodeType = "mda-subanswer"

export interface ApiDiagnosticQuestion extends SingleTypeSchema {
  info: {
    singularName: "diagnostic/question";
    pluralName: "diagnostics/question";
    displayName: "Diagnostic";
    description: "Une question est une \u00E9tape du parcours de diagnostic.";
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    content: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
        maxLength: 255;
      }>;
    answers: ComponentAttribute<"diagnostic.question.answer", true>;
    displayInfoUp: BooleanAttribute & DefaultTo<false>;
    info: TextAttribute;
    order: IntegerAttribute & RequiredAttribute & DefaultTo<0>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      "api::diagnostic.question",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      "api::diagnostic.question",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
  };
}

export interface DiagnosticQuestionAnswer extends ComponentSchema {
  info: {
    displayName: "answer";
    description: "Une r\u00E9ponse potentielle \u00E0 une question menant soit \u00E0 une sous r\u00E9ponse, soit a une nouvelle question.";
  };
  attributes: {
    content: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
        maxLength: 255;
      }>;
    destination: RelationAttribute<
      "diagnostic.question.answer",
      "oneToOne",
      "api::diagnostic.question"
    >;
    displayInfoUp: BooleanAttribute & DefaultTo<false>;
    info: TextAttribute;
    order: IntegerAttribute & RequiredAttribute & DefaultTo<0>;
    subanswers: ComponentAttribute<"diagnostic.question.sub-answer", true>;
  };
}

export interface DiagnosticQuestionSubAnswer extends ComponentSchema {
  info: {
    displayName: "subanswer";
    description: "Une sous r\u00E9ponse suit une r\u00E9ponse et m\u00E8ne obligatoirement vers une nouvelle question.";
  };
  attributes: {
    content: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
        maxLength: 255;
      }>;
    destination: RelationAttribute<
      "diagnostic.question.sub-answer",
      "oneToOne",
      "api::diagnostic.question"
    > &
    RequiredAttribute;
    displayInfoUp: BooleanAttribute & DefaultTo<false>;
    info: TextAttribute;
    order: IntegerAttribute & RequiredAttribute & DefaultTo<0>;
  };
}

declare global {
  namespace Strapi {
    interface Schemas {
      "api::diagnostic.question": ApiDiagnosticQuestion;
      "diagnostic.question.answer": DiagnosticQuestionAnswer;
      "diagnostic.question.sub-answer": DiagnosticQuestionSubAnswer
    }
  }
}
