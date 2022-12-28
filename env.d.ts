// Auto-generated with "generateEnvDeclaration" script
/* eslint-disable */
declare namespace NodeJS {
    interface ProcessEnv {
        /**
         * Dist: `1`  
         * {@link [Local Env Dist](.env.development)}
         */
        NEXT_TELEMETRY_DISABLED?: string;
        /**
         * Dist: `https://67a92c8c0f70486d9f36f2352eff1d19@sentry.fabrique.social.gouv.fr/xx`  
         * {@link [Local Env Dist](.env.development)}
         */
        NEXT_PUBLIC_SENTRY_DSN?: string;
        /**
         * Dist: `dev`  
         * {@link [Local Env Dist](.env.development)}
         */
        NEXT_PUBLIC_SENTRY_ENV?: string;
        /**
         * No dist value.  
         * {@link [Local Env Dist](.env.development)}
         */
        NEXT_PUBLIC_MATOMO_URL?: string;
        /**
         * No dist value.  
         * {@link [Local Env Dist](.env.development)}
         */
        NEXT_PUBLIC_MATOMO_SITE_ID?: string;
        /**
         * Dist: `dev`  
         * {@link [Local Env Dist](.env.development)}
         */
        MDA_ENV?: string;
    }
}
declare type ProcessEnvCustomKeys = 
    | 'NEXT_TELEMETRY_DISABLED'
    | 'NEXT_PUBLIC_SENTRY_DSN'
    | 'NEXT_PUBLIC_SENTRY_ENV'
    | 'NEXT_PUBLIC_MATOMO_URL'
    | 'NEXT_PUBLIC_MATOMO_SITE_ID'
    | 'MDA_ENV';