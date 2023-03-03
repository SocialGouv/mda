import {
  type Attribute,
  type ComponentAttribute,
  type DynamicZoneAttribute,
  type GetAttribute,
  type GetAttributesKey,
  type GetAttributesOptionalKeys,
  type GetAttributesRequiredKeys,
  type GetAttributeValue,
  type GetComponentAttributeValue,
  type GetDynamicZoneAttributeValue,
  type GetMediaAttributeValue,
  type GetRelationAttributeValue,
  type utils,
} from "@strapi/strapi";

// Helper used to add an ID attribute to another type
type WithID = { id: number };

// Values resolvers that we need to replace by custom ones & remove from the base GetAttributesValues implementation
type ExcludedValuesResolvers<T extends Attribute> =
  | GetComponentAttributeValue<T>
  | GetDynamicZoneAttributeValue<T>
  | GetMediaAttributeValue<T>
  | GetRelationAttributeValue<T>;

// Custom GetComponentAttributeValue implementation for the content api
type ContentAPIComponentValue<T extends Attribute> = T extends ComponentAttribute<infer U, infer R>
  ? WithID & (R extends true ? Array<GetAttributesValues<U>> : GetAttributesValues<U>)
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
type ContentAPIValueResolvers<T extends Attribute> = ContentAPIComponentValue<T> | ContentAPIDynamicZoneValue<T>;

// Custom GetAttributeValue implementation based on specific content api rules
// If the given attribute isn't handled by the custom resolvers, then it'll fallback
// to the base implementation and its resolvers
type GetValue<T extends utils.SchemaUID, U extends GetAttributesKey<T>> = GetAttribute<T, U> extends infer P
  ? P extends Attribute
    ? ContentAPIValueResolvers<P> | Exclude<GetAttributeValue<P>, ExcludedValuesResolvers<P>>
    : never
  : never;

export type GetAttributesValues<T extends utils.SchemaUID> = WithID & {
  // Handle optional attributes
  [key in GetAttributesOptionalKeys<T>]?: GetValue<T, key>;
} & {
  // Handle required attributes
  [key in GetAttributesRequiredKeys<T>]-?: GetValue<T, key>;
};
