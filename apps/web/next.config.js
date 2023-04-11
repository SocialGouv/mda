const ContentSecurityPolicy = require("./src/common/config/csp.config");
const { version } = require("./package.json");
const path = require("path");

const strapiUrl = new URL(process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337");

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
  output: "standalone",
  transpilePackages: ["@codegouvfr/react-dsfr"],
  experimental: {
    appDir: true,
    outputFileTracingRoot: path.join(__dirname, "../../"),
  },
  env: {
    NEXT_PUBLIC_APP_VERSION: version,
    NEXT_PUBLIC_APP_VERSION_COMMIT: process.env.GITHUB_SHA,
    NEXT_PUBLIC_IS_PRODUCTION_DEPLOYMENT: process.env.PRODUCTION === "true",
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: config => {
    config.module.rules.push({
      test: /\.woff2$/,
      type: "asset/resource",
    });
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: strapiUrl.protocol.replace(/:/g, ""),
        hostname: strapiUrl.hostname,
        port: strapiUrl.port,
        pathname: "/uploads/**",
      },
    ],
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: process.env.NEXT_PUBLIC_IS_PRODUCTION_DEPLOYMENT ? "all" : "noindex, nofollow, nosnippet",
          },
          ...(process.env.NEXT_PUBLIC_IS_PRODUCTION_DEPLOYMENT
            ? [
                {
                  key: "X-Frame-Options",
                  value: "deny",
                },
                {
                  key: "X-XSS-Protection",
                  value: "1; mode=block",
                },
                {
                  key: "X-Content-Type-Options",
                  value: "nosniff",
                },
                {
                  key: "Content-Security-Policy",
                  value: ContentSecurityPolicy,
                },
              ]
            : []),
        ],
      },
    ];
  },
  async rewrites() {
    return {
      fallback: [
        {
          source: "/uploads/:path*",
          destination: `${strapiUrl.toString()}/uploads/:path*`,
        },
      ],
    };
  },
  // Uncomment to debug dsfr script in node_modules with reload / nocache
  //   webpack(config, context) {
  //     if (!context.dev) return config;
  //     config.snapshot = {
  //       managedPaths: [/^(.+?[\\/]node_modules[\\/](?!(@gouvfr[\\/]dsfr))(@.+?[\\/])?.+?)[\\/]/],
  //     };

  //     return config;
  //   },
};

module.exports = nextConfig;
