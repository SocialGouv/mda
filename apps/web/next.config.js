const ContentSecurityPolicy = require("./src/common/config/csp.config");
const { version } = require("./package.json");
const path = require("path");

const strapiUrl = new URL(process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: "standalone",
  experimental: {
    appDir: true,
    outputFileTracingRoot: path.join(__dirname, "../../"),
  },
  env: {
    NEXT_PUBLIC_APP_VERSION: version,
    NEXT_PUBLIC_APP_VERSION_COMMIT: process.env.GITHUB_SHA,
    NEXT_PUBLIC_IS_PRODUCTION_DEPLOYMENT: process.env.PRODUCTION === "true",
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
};

module.exports = nextConfig;
