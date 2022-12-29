// TODO change for actual domain
const ContentSecurityPolicy = `
  default-src 'self' https://*.gouv.fr;
  img-src 'self' data: https://*.gouv.fr https://www.googletagmanager.com;
  script-src 'self' https://*.gouv.fr https://www.googletagmanager.com ${
    process.env.PRODUCTION !== "true" ? "'unsafe-inline' 'unsafe-eval'" : ""
  };
  frame-src 'self' https://*.gouv.fr;
  style-src 'self' 'unsafe-inline';
  font-src 'self' data: blob:;
`
  .replace(/\n/g, " ")
  .trim();

module.exports = ContentSecurityPolicy;
