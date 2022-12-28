/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  experimental: {
    appDir: true,
  },
  rewrites: async () => {
    return [
      {
        source: "/healthz",
        destination: "/api/health",
      },
    ];
  },
};

module.exports = nextConfig;
