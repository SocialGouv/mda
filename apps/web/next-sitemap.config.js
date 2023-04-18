/** @type {import('next-sitemap').IConfig} */
const sitemapConfig = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://maisondelautisme.gouv.fr/",
  generateRobotsTxt: process.env.ROBOT === "true",
  exclude: ["/healthz", "/recherche"],
};

module.exports = sitemapConfig;
