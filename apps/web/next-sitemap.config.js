/** @type {import('next-sitemap').IConfig} */
const sitemapConfig = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://maisonaustisme.gouv.fr",
  generateRobotsTxt: process.env.ROBOT === "true",
};

module.exports = sitemapConfig;
