/** @type {import('next-sitemap').IConfig} */
const sitemapConfig = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://maisondelautisme.fabrique.social.gouv.fr/",
  generateRobotsTxt: process.env.ROBOT === "true",
};

module.exports = sitemapConfig;
