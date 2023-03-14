// TODO change for actual domain
// TODO change to strict CSP or nonce with predefined value
const ContentSecurityPolicy = `
  default-src 'self' https://*.gouv.fr;
  img-src 'self' data: https://*.gouv.fr https://www.googletagmanager.com https://unpkg.com;
  script-src 'self' https://*.gouv.fr https://www.googletagmanager.com https://unpkg.com 'unsafe-inline' 'unsafe-eval';
  frame-src 'self' https://*.gouv.fr https://www.youtube.com;
  style-src 'self' https://unpkg.com 'unsafe-inline';
  font-src 'self' data: blob: https://unpkg.com;
`
  .replace(/\n/g, " ")
  .trim();

module.exports = ContentSecurityPolicy;
