const ContentSecurityPolicy = require("./src/common/config/csp.config");
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
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config, _context) => {
    config.module.rules.push({
      test: /\.woff2$/,
      type: "asset/resource",
    });
    // Uncomment to debug dsfr script in node_modules with reload / nocache
    //     if (!_context.dev) return config;
    //     config.snapshot = {
    //       managedPaths: [/^(.+?[\\/]node_modules[\\/](?!(@gouvfr[\\/]dsfr))(@.+?[\\/])?.+?)[\\/]/],
    //     };

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
            value: process.env.MDA_ENV === "production" ? "all" : "noindex, nofollow, nosnippet",
          },
          ...(process.env.NODE_ENV === "production"
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
                  key: "Referrer-Policy",
                  value: "no-referrer, strict-origin-when-cross-origin",
                },
                {
                  key: "Content-Security-Policy",
                  value: ContentSecurityPolicy(process.env.NEXT_PUBLIC_GITHUB_SHA),
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
