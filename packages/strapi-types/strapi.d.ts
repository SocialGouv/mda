/* eslint-disable */
import {
  CollectionTypeSchema,
  StringAttribute,
  RequiredAttribute,
  SetMinMaxLength,
  JSONAttribute,
  DefaultTo,
  RelationAttribute,
  DateTimeAttribute,
  PrivateAttribute,
  EmailAttribute,
  UniqueAttribute,
  PasswordAttribute,
  BooleanAttribute,
  EnumerationAttribute,
  BigIntegerAttribute,
  IntegerAttribute,
  DecimalAttribute,
  SetMinMax,
  SingleTypeSchema,
  TextAttribute,
  RichTextAttribute,
  DynamicZoneAttribute,
  ComponentAttribute,
  MediaAttribute,
  ComponentSchema,
} from '@strapi/strapi';

export interface AdminPermission extends CollectionTypeSchema {
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    subject: StringAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: JSONAttribute & DefaultTo<{}>;
    conditions: JSONAttribute & DefaultTo<[]>;
    role: RelationAttribute<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface AdminUser extends CollectionTypeSchema {
  info: {
    name: 'User';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    firstname: StringAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: StringAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    username: StringAttribute;
    email: EmailAttribute &
      RequiredAttribute &
      PrivateAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 6;
      }>;
    password: PasswordAttribute &
      PrivateAttribute &
      SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: StringAttribute & PrivateAttribute;
    registrationToken: StringAttribute & PrivateAttribute;
    isActive: BooleanAttribute & PrivateAttribute & DefaultTo<false>;
    roles: RelationAttribute<'admin::user', 'manyToMany', 'admin::role'> &
      PrivateAttribute;
    blocked: BooleanAttribute & PrivateAttribute & DefaultTo<false>;
    preferedLanguage: StringAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<'admin::user', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
    updatedBy: RelationAttribute<'admin::user', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
  };
}

export interface AdminRole extends CollectionTypeSchema {
  info: {
    name: 'Role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute &
      RequiredAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    code: StringAttribute &
      RequiredAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    description: StringAttribute;
    users: RelationAttribute<'admin::role', 'manyToMany', 'admin::user'>;
    permissions: RelationAttribute<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<'admin::role', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
    updatedBy: RelationAttribute<'admin::role', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
  };
}

export interface AdminApiToken extends CollectionTypeSchema {
  info: {
    name: 'Api Token';
    singularName: 'api-token';
    pluralName: 'api-tokens';
    displayName: 'Api Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute &
      RequiredAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    description: StringAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }> &
      DefaultTo<''>;
    type: EnumerationAttribute<['read-only', 'full-access', 'custom']> &
      RequiredAttribute &
      DefaultTo<'read-only'>;
    accessKey: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: DateTimeAttribute;
    permissions: RelationAttribute<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    expiresAt: DateTimeAttribute;
    lifespan: BigIntegerAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface AdminApiTokenPermission extends CollectionTypeSchema {
  info: {
    name: 'API Token Permission';
    description: '';
    singularName: 'api-token-permission';
    pluralName: 'api-token-permissions';
    displayName: 'API Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    token: RelationAttribute<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface AdminTransferToken extends CollectionTypeSchema {
  info: {
    name: 'Transfer Token';
    singularName: 'transfer-token';
    pluralName: 'transfer-tokens';
    displayName: 'Transfer Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute &
      RequiredAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    description: StringAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }> &
      DefaultTo<''>;
    accessKey: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: DateTimeAttribute;
    permissions: RelationAttribute<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    expiresAt: DateTimeAttribute;
    lifespan: BigIntegerAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface AdminTransferTokenPermission extends CollectionTypeSchema {
  info: {
    name: 'Transfer Token Permission';
    description: '';
    singularName: 'transfer-token-permission';
    pluralName: 'transfer-token-permissions';
    displayName: 'Transfer Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    token: RelationAttribute<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface PluginUploadFile extends CollectionTypeSchema {
  info: {
    singularName: 'file';
    pluralName: 'files';
    displayName: 'File';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute & RequiredAttribute;
    alternativeText: StringAttribute;
    caption: StringAttribute;
    width: IntegerAttribute;
    height: IntegerAttribute;
    formats: JSONAttribute;
    hash: StringAttribute & RequiredAttribute;
    ext: StringAttribute;
    mime: StringAttribute & RequiredAttribute;
    size: DecimalAttribute & RequiredAttribute;
    url: StringAttribute & RequiredAttribute;
    previewUrl: StringAttribute;
    provider: StringAttribute & RequiredAttribute;
    provider_metadata: JSONAttribute;
    related: RelationAttribute<'plugin::upload.file', 'morphToMany'>;
    folder: RelationAttribute<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      PrivateAttribute;
    folderPath: StringAttribute &
      RequiredAttribute &
      PrivateAttribute &
      SetMinMax<{
        min: 1;
      }>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface PluginUploadFolder extends CollectionTypeSchema {
  info: {
    singularName: 'folder';
    pluralName: 'folders';
    displayName: 'Folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute &
      RequiredAttribute &
      SetMinMax<{
        min: 1;
      }>;
    pathId: IntegerAttribute & RequiredAttribute & UniqueAttribute;
    parent: RelationAttribute<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    children: RelationAttribute<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    files: RelationAttribute<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    path: StringAttribute &
      RequiredAttribute &
      SetMinMax<{
        min: 1;
      }>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface PluginMeilisearchMeilisearchIndex extends SingleTypeSchema {
  info: {
    singularName: 'meilisearch-index';
    pluralName: 'meilisearch-indexes';
    displayName: 'Meilisearch Indexes';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    settings: JSONAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'plugin::meilisearch.meilisearch-index',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'plugin::meilisearch.meilisearch-index',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface PluginSlugifySlug extends CollectionTypeSchema {
  info: {
    singularName: 'slug';
    pluralName: 'slugs';
    displayName: 'slug';
  };
  options: {
    draftAndPublish: false;
    comment: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    slug: TextAttribute;
    count: IntegerAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'plugin::slugify.slug',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'plugin::slugify.slug',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface PluginMdaDiagnosticTree extends SingleTypeSchema {
  info: {
    singularName: 'diagnostic-tree';
    pluralName: 'diagnostic-trees';
    displayName: 'Arbre de Diagnostic';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    tree: JSONAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'plugin::mda.diagnostic-tree',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'plugin::mda.diagnostic-tree',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface PluginUsersPermissionsPermission extends CollectionTypeSchema {
  info: {
    name: 'permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: StringAttribute & RequiredAttribute;
    role: RelationAttribute<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface PluginUsersPermissionsRole extends CollectionTypeSchema {
  info: {
    name: 'role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 3;
      }>;
    description: StringAttribute;
    type: StringAttribute & UniqueAttribute;
    permissions: RelationAttribute<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: RelationAttribute<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface PluginUsersPermissionsUser extends CollectionTypeSchema {
  info: {
    name: 'user';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
  };
  attributes: {
    username: StringAttribute &
      RequiredAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 3;
      }>;
    email: EmailAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: StringAttribute;
    password: PasswordAttribute &
      PrivateAttribute &
      SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: StringAttribute & PrivateAttribute;
    confirmationToken: StringAttribute & PrivateAttribute;
    confirmed: BooleanAttribute & DefaultTo<false>;
    blocked: BooleanAttribute & DefaultTo<false>;
    role: RelationAttribute<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiAccessibiliteAccessibilite extends SingleTypeSchema {
  info: {
    singularName: 'accessibilite';
    pluralName: 'accessibilites';
    displayName: 'Accessibilit\u00E9';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    title: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
        maxLength: 255;
      }>;
    content: RichTextAttribute & RequiredAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::accessibilite.accessibilite',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::accessibilite.accessibilite',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiAccueilAccueil extends SingleTypeSchema {
  info: {
    singularName: 'accueil';
    pluralName: 'accueils';
    displayName: 'Accueil';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    widgets: DynamicZoneAttribute<
      [
        'common.grid-tiles',
        'common.articles',
        'common.most-viewed-cards',
        'common.carousels'
      ]
    > &
      RequiredAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::accueil.accueil',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::accueil.accueil',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiAnnuaireAnnuaire extends SingleTypeSchema {
  info: {
    singularName: 'annuaire';
    pluralName: 'annuaires';
    displayName: 'Annuaire';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    title: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
        maxLength: 255;
      }>;
    content: RichTextAttribute & RequiredAttribute;
    links: ComponentAttribute<'common.links', true>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::annuaire.annuaire',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::annuaire.annuaire',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiDiagnosticDiagnostic extends SingleTypeSchema {
  info: {
    singularName: 'diagnostic';
    pluralName: 'diagnostics';
    displayName: 'Diagnostic';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    title: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
        maxLength: 255;
      }>;
    content: RichTextAttribute;
    bottom_content: RichTextAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::diagnostic.diagnostic',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::diagnostic.diagnostic',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiEtapeDeVieEtapeDeVie extends CollectionTypeSchema {
  info: {
    singularName: 'etape-de-vie';
    pluralName: 'etape-de-vies';
    displayName: '\u00C9tapes de vie';
    description: "Une \u00E9tape de vie est un ensemble d'informations regroup\u00E9 par cat\u00E9gorie.";
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    title: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
        maxLength: 255;
      }>;
    recap: ComponentAttribute<'fiche-pratique-content.encart'> &
      RequiredAttribute;
    type: EnumerationAttribute<['pro', 'perso']> &
      RequiredAttribute &
      DefaultTo<'perso'>;
    section: ComponentAttribute<'fiche-pratique-content.encart', true>;
    slug: StringAttribute &
      RequiredAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 1;
        maxLength: 255;
      }>;
    excerpt: TextAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
        maxLength: 200;
      }>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::etape-de-vie.etape-de-vie',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::etape-de-vie.etape-de-vie',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiEventEvent extends CollectionTypeSchema {
  info: {
    singularName: 'event';
    pluralName: 'events';
    displayName: '\u00C9v\u00E8nements';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
        maxLength: 255;
      }>;
    description: RichTextAttribute;
    start_date: DateTimeAttribute & RequiredAttribute;
    end_date: DateTimeAttribute & RequiredAttribute;
    connection_link: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
        maxLength: 255;
      }>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::event.event',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::event.event',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiFichePratiqueFichePratique extends CollectionTypeSchema {
  info: {
    singularName: 'fiche-pratique';
    pluralName: 'fiche-pratiques';
    displayName: 'Fiches Pratiques';
    description: "Une fiche pratique est un ensemble d'informations regroup\u00E9 par cat\u00E9gorie.";
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    title: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
        maxLength: 255;
      }>;
    recap: ComponentAttribute<'fiche-pratique-content.encart'> &
      RequiredAttribute;
    section: ComponentAttribute<'fiche-pratique-content.encart', true>;
    slug: StringAttribute &
      RequiredAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 1;
        maxLength: 255;
      }>;
    excerpt: TextAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
        maxLength: 200;
      }>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::fiche-pratique.fiche-pratique',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::fiche-pratique.fiche-pratique',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiFooterFooter extends SingleTypeSchema {
  info: {
    singularName: 'footer';
    pluralName: 'footers';
    displayName: 'Footer';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    content: RichTextAttribute & RequiredAttribute;
    link: ComponentAttribute<'common.links', true>;
    banner_title: StringAttribute &
      SetMinMaxLength<{
        minLength: 1;
        maxLength: 255;
      }>;
    banner_icons: ComponentAttribute<'common.icons', true>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::footer.footer',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::footer.footer',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiGlossaireItemGlossaireItem extends CollectionTypeSchema {
  info: {
    singularName: 'glossaire-item';
    pluralName: 'glossaire-items';
    displayName: 'Glossaire';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    title: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
        maxLength: 255;
      }>;
    description: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
        maxLength: 255;
      }>;
    url: StringAttribute &
      SetMinMaxLength<{
        minLength: 1;
        maxLength: 255;
      }>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::glossaire-item.glossaire-item',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::glossaire-item.glossaire-item',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiJeDonneMonAvisJeDonneMonAvis extends SingleTypeSchema {
  info: {
    singularName: 'je-donne-mon-avis';
    pluralName: 'je-donne-mon-aviss';
    displayName: 'Je donne mon avis';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
        maxLength: 255;
      }>;
    content: RichTextAttribute;
    alerts: ComponentAttribute<'common.alerts', true>;
    feedbackForm: ComponentAttribute<'je-donne-mon-avis.feedback-form'> &
      RequiredAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::je-donne-mon-avis.je-donne-mon-avis',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::je-donne-mon-avis.je-donne-mon-avis',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiMaisonDeLAutismeMaisonDeLAutisme extends SingleTypeSchema {
  info: {
    singularName: 'maison-de-l-autisme';
    pluralName: 'maison-de-l-autismes';
    displayName: "Maison de l'autisme";
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    title: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
        maxLength: 255;
      }>;
    content: RichTextAttribute & RequiredAttribute;
    sections: ComponentAttribute<'common.sections', true>;
    events: RelationAttribute<
      'api::maison-de-l-autisme.maison-de-l-autisme',
      'oneToMany',
      'api::event.event'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::maison-de-l-autisme.maison-de-l-autisme',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::maison-de-l-autisme.maison-de-l-autisme',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiMentionsLegalesMentionsLegales extends SingleTypeSchema {
  info: {
    singularName: 'mentions-legales';
    pluralName: 'mentions-legaless';
    displayName: 'Mentions l\u00E9gales';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    title: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
        maxLength: 255;
      }>;
    content: RichTextAttribute & RequiredAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::mentions-legales.mentions-legales',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::mentions-legales.mentions-legales',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiMenuMenu extends SingleTypeSchema {
  info: {
    singularName: 'menu';
    pluralName: 'menus';
    displayName: 'Menu';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    item: DynamicZoneAttribute<['menu.dropdown-menu-item', 'menu.menu-item']>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<'api::menu.menu', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
    updatedBy: RelationAttribute<'api::menu.menu', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
  };
}

export interface ApiMesAidesMesAides extends SingleTypeSchema {
  info: {
    singularName: 'mes-aides';
    pluralName: 'mes-aidess';
    displayName: 'Mes aides';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    title: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
        maxLength: 255;
      }>;
    content: RichTextAttribute & RequiredAttribute;
    sections: ComponentAttribute<'common.sections', true>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::mes-aides.mes-aides',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::mes-aides.mes-aides',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiModelesDeCourrierModelesDeCourrier
  extends SingleTypeSchema {
  info: {
    singularName: 'modeles-de-courrier';
    pluralName: 'modeles-de-courriers';
    displayName: 'Mod\u00E8les de courriers';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
        maxLength: 255;
      }>;
    content: RichTextAttribute;
    files: MediaAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::modeles-de-courrier.modeles-de-courrier',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::modeles-de-courrier.modeles-de-courrier',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiParcoursParcours extends CollectionTypeSchema {
  info: {
    singularName: 'parcours';
    pluralName: 'parcourss';
    displayName: 'Parcours';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
        maxLength: 255;
      }>;
    slug: StringAttribute &
      RequiredAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 1;
        maxLength: 255;
      }>;
    description: RichTextAttribute & RequiredAttribute;
    items: ComponentAttribute<'parcours-content.item', true>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::parcours.parcours',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::parcours.parcours',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiPlanDuSitePlanDuSite extends SingleTypeSchema {
  info: {
    singularName: 'plan-du-site';
    pluralName: 'plan-du-sites';
    displayName: 'Plan du site';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    title: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
        maxLength: 255;
      }>;
    content: RichTextAttribute & RequiredAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::plan-du-site.plan-du-site',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::plan-du-site.plan-du-site',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiPolitiqueDeConfidentialitePolitiqueDeConfidentialite
  extends SingleTypeSchema {
  info: {
    singularName: 'politique-de-confidentialite';
    pluralName: 'politique-de-confidentialites';
    displayName: 'Politique de confidentialit\u00E9';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    title: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
        maxLength: 255;
      }>;
    content: RichTextAttribute & RequiredAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::politique-de-confidentialite.politique-de-confidentialite',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::politique-de-confidentialite.politique-de-confidentialite',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface CommonAlerts extends ComponentSchema {
  info: {
    displayName: 'Alerts';
  };
  attributes: {
    title: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
        maxLength: 255;
      }>;
    content: RichTextAttribute & RequiredAttribute;
    type: EnumerationAttribute<['info', 'success', 'warning', 'error']> &
      DefaultTo<'info'>;
  };
}

export interface CommonArticles extends ComponentSchema {
  info: {
    displayName: 'Articles';
    description: '';
  };
  attributes: {
    title: StringAttribute &
      PrivateAttribute &
      SetMinMaxLength<{
        minLength: 1;
        maxLength: 255;
      }>;
    section: ComponentAttribute<'common.sections'>;
    image: MediaAttribute;
    image_position: EnumerationAttribute<['right', 'left']> &
      RequiredAttribute &
      DefaultTo<'right'>;
    image_width: IntegerAttribute;
    image_height: IntegerAttribute;
    buttons: ComponentAttribute<'common.links', true>;
    buttons_position: EnumerationAttribute<['left', 'center', 'right']> &
      RequiredAttribute &
      DefaultTo<'left'>;
    theme: EnumerationAttribute<['home']>;
  };
}

export interface CommonCarousels extends ComponentSchema {
  info: {
    displayName: 'Carousels';
  };
  attributes: {
    articles: ComponentAttribute<'common.articles', true>;
  };
}

export interface CommonGridTiles extends ComponentSchema {
  info: {
    displayName: 'GridTiles';
  };
  attributes: {
    title: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
        maxLength: 255;
      }>;
    tiles: ComponentAttribute<'common.tiles', true>;
  };
}

export interface CommonIcons extends ComponentSchema {
  info: {
    displayName: 'Icons';
    description: '';
  };
  attributes: {
    link: ComponentAttribute<'common.links'>;
    svg: EnumerationAttribute<
      [
        'fr-btn--facebook',
        'fr-btn--instagram',
        'fr-btn--linkedin',
        'fr-fi-information-line',
        'fr-icon-add-line',
        'fr-icon-arrow-down-s-line',
        'fr-icon-arrow-left-line',
        'fr-icon-arrow-right-line',
        'fr-icon-arrow-up-fill',
        'fr-icon-arrow-up-s-line',
        'fr-icon-calendar-line',
        'fr-icon-edit-fill',
        'fr-icon-error-fill',
        'fr-icon-information-fill',
        'fr-icon-line-fill',
        'fr-icon-mail-line',
        'fr-icon-printer-line',
        'fr-icon-success-fill',
        'fr-icon-success-line',
        'fr-icon-user-fill',
        'fr-icon-warning-fill',
        'fr-icon-warning-line'
      ]
    > &
      RequiredAttribute;
  };
}

export interface CommonInputs extends ComponentSchema {
  info: {
    displayName: 'Inputs';
    description: '';
  };
  attributes: {
    label: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
        maxLength: 255;
      }>;
    hint: TextAttribute & RequiredAttribute;
    type: EnumerationAttribute<['email', 'tel']> & RequiredAttribute;
    autocomplete: EnumerationAttribute<['email', 'tel']> & RequiredAttribute;
  };
}

export interface CommonLinks extends ComponentSchema {
  info: {
    displayName: 'links';
    description: '';
  };
  attributes: {
    text: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
        maxLength: 255;
      }>;
    title: StringAttribute &
      SetMinMaxLength<{
        minLength: 1;
        maxLength: 255;
      }>;
    url: StringAttribute &
      SetMinMaxLength<{
        minLength: 1;
        maxLength: 255;
      }>;
    theme: EnumerationAttribute<['primary', 'secondary']> &
      RequiredAttribute &
      DefaultTo<'primary'>;
  };
}

export interface CommonMostViewedCards extends ComponentSchema {
  info: {
    displayName: 'MostViewedCards';
    description: '';
  };
  attributes: {
    title: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
        maxLength: 255;
      }>;
    collection: EnumerationAttribute<['fiche-pratiques']> &
      RequiredAttribute &
      DefaultTo<'fiche-pratiques'>;
    button: ComponentAttribute<'common.links'>;
  };
}

export interface CommonOptions extends ComponentSchema {
  info: {
    displayName: 'Options';
  };
  attributes: {
    label: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
        maxLength: 255;
      }>;
    value: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
        maxLength: 255;
      }>;
  };
}

export interface CommonSections extends ComponentSchema {
  info: {
    displayName: 'sections';
    description: '';
  };
  attributes: {
    title: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
        maxLength: 255;
      }>;
    subtitle: TextAttribute;
    content: RichTextAttribute & RequiredAttribute;
  };
}

export interface CommonSelects extends ComponentSchema {
  info: {
    displayName: 'Selects';
  };
  attributes: {
    label: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
        maxLength: 255;
      }>;
    options: ComponentAttribute<'common.options', true>;
  };
}

export interface CommonTextareas extends ComponentSchema {
  info: {
    displayName: 'Textareas';
  };
  attributes: {
    label: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
        maxLength: 255;
      }>;
    hint: TextAttribute & RequiredAttribute;
  };
}

export interface CommonTiles extends ComponentSchema {
  info: {
    displayName: 'Tiles';
    description: '';
  };
  attributes: {
    title: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
        maxLength: 255;
      }>;
    slug: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
        maxLength: 255;
      }>;
    description: TextAttribute;
    picto: EnumerationAttribute<
      [
        'cityHall',
        'factory',
        'house',
        'nuclearPlant',
        'school',
        'application',
        'avatar',
        'calendar',
        'coding',
        'dataVisualization',
        'internet',
        'mailSend',
        'search',
        'contract',
        'documentDownload',
        'documentSignature',
        'document',
        'drivingLicence',
        'nationalIdentityCard',
        'passport',
        'taxStamp',
        'vehicleRegistration',
        'environment',
        'food',
        'grocery',
        'humanCooperation',
        'leaf',
        'moon',
        'mountain',
        'sun',
        'tree',
        'health',
        'hospital',
        'vaccine',
        'virus',
        'firefighter',
        'gendarmerie',
        'justice',
        'money',
        'police',
        'book',
        'community',
        'culture',
        'digitalArt',
        'paint',
        'airport',
        'locationFrance',
        'luggage',
        'map',
        'connectionLost',
        'error',
        'information',
        'notification',
        'padlock',
        'success',
        'system',
        'technicalError',
        'warning'
      ]
    > &
      RequiredAttribute &
      DefaultTo<'documentDownload'>;
  };
}

export interface FichePratiqueContentEncart extends ComponentSchema {
  info: {
    displayName: 'encart';
    description: '';
  };
  attributes: {
    title: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
        maxLength: 255;
      }>;
    content: RichTextAttribute & RequiredAttribute;
  };
}

export interface JeDonneMonAvisFeedbackForm extends ComponentSchema {
  info: {
    displayName: 'FeedbackForm';
    description: '';
  };
  attributes: {
    opinion_title: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
        maxLength: 255;
      }>;
    profile: ComponentAttribute<'common.selects'> & RequiredAttribute;
    opinion: ComponentAttribute<'common.textareas'> & RequiredAttribute;
    contact_details_title: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
        maxLength: 255;
      }>;
    contact_details_content: TextAttribute;
    contact_details_phone: ComponentAttribute<'common.inputs'> &
      RequiredAttribute;
    contact_details_email: ComponentAttribute<'common.inputs'> &
      RequiredAttribute;
    success_message: ComponentAttribute<'common.alerts'> & RequiredAttribute;
    error_message: ComponentAttribute<'common.alerts'> & RequiredAttribute;
    submit_message: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
        maxLength: 255;
      }>;
    loading_message: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
        maxLength: 255;
      }>;
  };
}

export interface MenuDropdownMenuItem extends ComponentSchema {
  info: {
    displayName: 'Dropdown menu item';
    description: '';
  };
  attributes: {
    text: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
        maxLength: 255;
      }>;
    dropdown: ComponentAttribute<'menu.menu-item', true> & RequiredAttribute;
  };
}

export interface MenuMenuItem extends ComponentSchema {
  info: {
    displayName: 'Menu item';
    description: '';
  };
  attributes: {
    text: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
        maxLength: 255;
      }>;
    url: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
        maxLength: 255;
      }>;
  };
}

export interface ParcoursContentItem extends ComponentSchema {
  info: {
    displayName: 'Item';
    description: '';
  };
  attributes: {
    title: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
        maxLength: 255;
      }>;
    description: RichTextAttribute & RequiredAttribute;
    timeline: BooleanAttribute & RequiredAttribute & DefaultTo<false>;
    order: IntegerAttribute & RequiredAttribute & DefaultTo<0>;
    links: ComponentAttribute<'common.links', true>;
  };
}

declare global {
  namespace Strapi {
    interface Schemas {
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::meilisearch.meilisearch-index': PluginMeilisearchMeilisearchIndex;
      'plugin::slugify.slug': PluginSlugifySlug;
      'plugin::mda.diagnostic-tree': PluginMdaDiagnosticTree;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'api::accessibilite.accessibilite': ApiAccessibiliteAccessibilite;
      'api::accueil.accueil': ApiAccueilAccueil;
      'api::annuaire.annuaire': ApiAnnuaireAnnuaire;
      'api::diagnostic.diagnostic': ApiDiagnosticDiagnostic;
      'api::etape-de-vie.etape-de-vie': ApiEtapeDeVieEtapeDeVie;
      'api::event.event': ApiEventEvent;
      'api::fiche-pratique.fiche-pratique': ApiFichePratiqueFichePratique;
      'api::footer.footer': ApiFooterFooter;
      'api::glossaire-item.glossaire-item': ApiGlossaireItemGlossaireItem;
      'api::je-donne-mon-avis.je-donne-mon-avis': ApiJeDonneMonAvisJeDonneMonAvis;
      'api::maison-de-l-autisme.maison-de-l-autisme': ApiMaisonDeLAutismeMaisonDeLAutisme;
      'api::mentions-legales.mentions-legales': ApiMentionsLegalesMentionsLegales;
      'api::menu.menu': ApiMenuMenu;
      'api::mes-aides.mes-aides': ApiMesAidesMesAides;
      'api::modeles-de-courrier.modeles-de-courrier': ApiModelesDeCourrierModelesDeCourrier;
      'api::parcours.parcours': ApiParcoursParcours;
      'api::plan-du-site.plan-du-site': ApiPlanDuSitePlanDuSite;
      'api::politique-de-confidentialite.politique-de-confidentialite': ApiPolitiqueDeConfidentialitePolitiqueDeConfidentialite;
      'common.alerts': CommonAlerts;
      'common.articles': CommonArticles;
      'common.carousels': CommonCarousels;
      'common.grid-tiles': CommonGridTiles;
      'common.icons': CommonIcons;
      'common.inputs': CommonInputs;
      'common.links': CommonLinks;
      'common.most-viewed-cards': CommonMostViewedCards;
      'common.options': CommonOptions;
      'common.sections': CommonSections;
      'common.selects': CommonSelects;
      'common.textareas': CommonTextareas;
      'common.tiles': CommonTiles;
      'fiche-pratique-content.encart': FichePratiqueContentEncart;
      'je-donne-mon-avis.feedback-form': JeDonneMonAvisFeedbackForm;
      'menu.dropdown-menu-item': MenuDropdownMenuItem;
      'menu.menu-item': MenuMenuItem;
      'parcours-content.item': ParcoursContentItem;
    }
  }
}
