const ContentSecurityPolicy = require("./src/common/config/csp.config");
const { version } = require("./package.json");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: "standalone",
  experimental: {
    appDir: true,
  },
  env: {
    NEXT_PUBLIC_APP_VERSION: version,
    NEXT_PUBLIC_APP_VERSION_COMMIT: process.env.GITHUB_SHA,
    NEXT_PUBLIC_IS_PRODUCTION_DEPLOYMENT: process.env.PRODUCTION === "true",
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: ContentSecurityPolicy,
          },
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
              ]
            : []),
        ],
      },
    ];
  },
};

module.exports = nextConfig;
