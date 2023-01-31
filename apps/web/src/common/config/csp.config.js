// TODO change for actual domain
// TODO change to strict CSP or nonce with predefined value
const ContentSecurityPolicy = `
  default-src 'self' https://*.gouv.fr https://unpkg.com;
  img-src 'self' data: https://*.gouv.fr https://www.googletagmanager.com;
  script-src 'self' https://*.gouv.fr https://www.googletagmanager.com 'unsafe-inline' 'unsafe-eval';
  frame-src 'self' https://*.gouv.fr;
  style-src 'self' 'unsafe-inline';
  font-src 'self' data: blob:;
`
  .replace(/\n/g, " ")
  .trim();

module.exports = ContentSecurityPolicy;
