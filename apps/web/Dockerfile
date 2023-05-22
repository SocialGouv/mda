ARG NODE_VERSION=18

FROM node:$NODE_VERSION AS base
RUN apk add --no-cache libc6-compat && \
    rm -rf /var/cache/apk/* > /dev/null 2>&1
WORKDIR /app

########
# Pre install
FROM base AS builder

RUN yarn global add turbo
COPY . .
# COPY apps/web/package.json apps/web/
# COPY apps/strapi/package.json apps/strapi/
# COPY packages/config/package.json packages/config/
# COPY packages/eslint-config/package.json packages/eslint-config/
# COPY package.json yarn.lock turbo.json ./
# COPY .monorepo-build/json yarn.lock turbo.json ./ => DREAM (TODO BEFORE yarn turbo prune --scope=@mda/web --docker --out-dir .monorepo-build)
RUN turbo prune --scope=@mda/web --docker

FROM node:$NODE_VERSION AS tmp-json
COPY --from=builder /app/out/yarn.lock /app/out/json /tmp-json/

FROM node:$NODE_VERSION AS tmp-full
COPY --from=builder /app/out/full/ /tmp-full/

########
# Installer from pruned monorepo
FROM base AS installer
ENV NEXT_TELEMETRY_DISABLED 1

ARG NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_SITE_URL $NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_STRAPI_API_URL
ENV NEXT_PUBLIC_STRAPI_API_URL $NEXT_PUBLIC_STRAPI_API_URL

COPY .gitignore .gitignore
COPY --from=tmp-json /tmp-json/ .
RUN yarn install --frozen-lockfile

ARG NEXT_PUBLIC_GITHUB_SHA
ENV NEXT_PUBLIC_GITHUB_SHA $NEXT_PUBLIC_GITHUB_SHA
ARG MDA_ENV
ENV MDA_ENV $MDA_ENV

COPY --from=tmp-full /tmp-full/ .
COPY turbo.json turbo.json
RUN yarn turbo run build --filter=web

########
# Runner
FROM base AS runner
ENV NODE_ENV production
ENV NODE_OPTIONS="--max-old-space-size=8192"
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

COPY --from=installer /app/apps/web/next.config.js .
COPY --from=installer /app/apps/web/package.json .
COPY --from=installer /app/apps/web/.env.production .

COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/standalone/ ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public

USER 1001

EXPOSE 3000

CMD ["node", "apps/web/server.js"]
