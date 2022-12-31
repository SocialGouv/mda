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
         * Dist: `http://localhost:3000`  
         * {@link [Local Env Dist](.env.development)}
         */
        NEXT_PUBLIC_SITE_URL?: string;
        /**
         * Dist: `http://localhost:1337`  
         * {@link [Local Env Dist](.env.development)}
         */
        NEXT_PUBLIC_STRAPI_API_URL?: string;
        /**
         * No dist value.  
         * {@link [Local Env Dist](.env.development)}
         */
        STRAPI_TOKEN?: string;
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
    }
}
declare type ProcessEnvCustomKeys = 
    | 'NEXT_TELEMETRY_DISABLED'
    | 'NEXT_PUBLIC_MATOMO_URL'
    | 'NEXT_PUBLIC_MATOMO_SITE_ID'
    | 'NEXT_PUBLIC_SITE_URL'
    | 'NEXT_PUBLIC_STRAPI_API_URL'
    | 'STRAPI_TOKEN'
    | 'MDA_ENV'
    | 'PRODUCTION';