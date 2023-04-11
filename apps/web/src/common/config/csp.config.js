// TODO change for actual domain
// TODO change to strict CSP or nonce with predefined value
/**
 * @param {string} nonce
 */
const ContentSecurityPolicy = nonce =>
  `
  default-src 'none';
  connect-src 'self' https://*.gouv.fr;
  media-src 'self' https://*.gouv.fr;
  img-src 'self' data: https://*.gouv.fr;
  prefetch-src 'self' https://*.gouv.fr;
  script-src 'self' https://*.gouv.fr 'nonce-${nonce}';
  style-src 'self' https://*.gouv.fr 'nonce-${nonce}';
  frame-src 'self' https://*.gouv.fr https://www.youtube.com;
  frame-ancestors 'self' https://*.gouv.fr;
  font-src 'self' data: blob:;
  base-uri 'self' https://*.gouv.fr;
  form-action 'self' https://*.gouv.fr;
`
    .replace(/\n/g, " ")
    .trim();

module.exports = ContentSecurityPolicy;
