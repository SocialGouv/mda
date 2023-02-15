# Global / CI / CD
- [x] switch from "main/dev" branches with auto releases to "main" only with manual releases
- [ ] auto ci cache cleanup
- [ ] change releaserc config to adapt for monorepo (needed for sub package.json version sync)
- [ ] regenerate sitemap after asked revalidate

# Strapi
- fork `strapi-plugin-import-export-entries`
  - [ ] fix recursive relations import
  - [ ] remove "yup" validation
  - [ ] handle full db import
  - [ ] make import/export v2 more constistant
- add a "mda" dedicated plugin
  - [ ] parcours diag builder (mind map / flow chart builder, save in db and as json)
  - [ ] button for manual nextjs revalidate
  - [ ] button in dev or preprod for "sync data from prod"
- [ ] ajouter `strapi-sentry-plugin`

# Web
- [ ] finish SEO (display and title)
- [ ] define and add plublic stat page (evaluate if this https://github.com/SocialGouv/matomoboard is revelant)
- [ ] ajouter Sentry
- [ ] better logging
