// TODO change for actual domain
// TODO change to strict CSP or nonce with predefined value
// See https://github.com/vercel/next.js/issues/43743
/**
 * @param {string} nonce
 */
const ContentSecurityPolicy = _nonce =>
  `
  default-src 'self';
  connect-src 'self' https://*.gouv.fr;
  media-src 'self' https://*.gouv.fr;
  img-src 'self' data: https://*.gouv.fr;
  prefetch-src 'self' https://*.gouv.fr;
  script-src 'self' https://*.gouv.fr https://*.google.com 'unsafe-inline';
  style-src 'self' https://*.gouv.fr 'unsafe-inline';
  frame-src 'self' https://*.gouv.fr https://www.youtube.com https://*.google.com;
  frame-ancestors 'self' https://*.gouv.fr;
  font-src 'self' data: blob:;
  base-uri 'self' https://*.gouv.fr;
  form-action 'self' https://*.gouv.fr;
`
    .replace(/\n/g, " ")
    .trim();

module.exports = ContentSecurityPolicy;
