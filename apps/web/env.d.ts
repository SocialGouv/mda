// Auto-generated with "generateEnvDeclaration" script
/* eslint-disable */
declare namespace NodeJS {
    interface ProcessEnv {
       /**
         * Dist: `false`
         * {@link [Local Env Dist](.env.development)}
         */
        MAILER_ENABLE?: string;
        /**
         * Dist: `127.0.0.1`
         * {@link [Local Env Dist](.env.development)}
         */
        MAILER_SMTP_HOST?: string;
        /**
         * Dist: `1025`
         * {@link [Local Env Dist](.env.development)}
         */
        MAILER_SMTP_PORT?: number;
        /**
         * No dist value.
         * {@link [Local Env Dist](.env.development)}
         */
        MAILER_SMTP_PASSWORD?: string;
        /**
         * No dist value.
         * {@link [Local Env Dist](.env.development)}
         */
        MAILER_SMTP_LOGIN?: string;
        /**
         * Dist: `false`
         * {@link [Local Env Dist](.env.development)}
         */
        MAILER_SMTP_SSL?: boolean;
        /**
         * Dist: `EgaPro <index@travail.gouv.fr>`
         * {@link [Local Env Dist](.env.development)}
         */
        MAILER_FROM_EMAIL?: string;
        /**
         * Dist: `L’équipe Egapro`
         * {@link [Local Env Dist](.env.development)}
         */
        MAILER_EMAIL_SIGNATURE?: string;
        /**
         * Dist: `1`
         * {@link [Local Env Dist](.env.development)}
         */
        NEXT_TELEMETRY_DISABLED?: string;
        /**
         * Dist: `<dev>`
         * {@link [Local Env Dist](.env.development)}
         */
        NEXT_PUBLIC_MATOMO_URL?: string;
        /**
         * Dist: `<dev>`
         * {@link [Local Env Dist](.env.development)}
         */
        NEXT_PUBLIC_MATOMO_SITE_ID?: string;
        /**
         * Dist: `http://127.0.0.1:3000`
         * {@link [Local Env Dist](.env.development)}
         */
        NEXT_PUBLIC_SITE_URL?: string;
        /**
         * Dist: `http://127.0.0.1:1337`
         * {@link [Local Env Dist](.env.development)}
         */
        NEXT_PUBLIC_STRAPI_API_URL?: string;
        /**
         * Dist: `<dev>`
         * {@link [Local Env Dist](.env.development)}
         */
        NEXT_PUBLIC_GITHUB_SHA?: string;
        /**
         * Dist: `dev`
         * {@link [Local Env Dist](.env.development)}
         */
        MDA_ENV?: string;
        /**
         * Dist: `false`
         * {@link [Local Env Dist](.env.development)}
         */
        PRODUCTION?: string;
        /**
         * Dist: `sekret`
         * {@link [Local Env Dist](.env.development)}
         */
        WEBHOOK_REVALIDATE_TOKEN?: string;
    }
}
declare type ProcessEnvCustomKeys =
    | 'MAILER_ENABLE'
    | 'MAILER_SMTP_HOST'
    | 'MAILER_SMTP_PORT'
    | 'MAILER_SMTP_PASSWORD'
    | 'MAILER_SMTP_LOGIN'
    | 'MAILER_SMTP_SSL'
    | 'MAILER_FROM_EMAIL'
    | 'MAILER_EMAIL_SIGNATURE'
    | 'NEXT_TELEMETRY_DISABLED'
    | 'NEXT_PUBLIC_MATOMO_URL'
    | 'NEXT_PUBLIC_MATOMO_SITE_ID'
    | 'NEXT_PUBLIC_SITE_URL'
    | 'NEXT_PUBLIC_STRAPI_API_URL'
    | 'NEXT_PUBLIC_GITHUB_SHA'
    | 'MDA_ENV'
    | 'PRODUCTION'
    | 'WEBHOOK_REVALIDATE_TOKEN';
