ARG NODE_VERSION=18-alpine

########
# Pre install
FROM node:$NODE_VERSION AS builder
# Installing libvips-dev for sharp Compatibility
RUN apk update && \
    apk add build-base gcc autoconf automake zlib-dev libpng-dev vips-dev && \
    rm -rf /var/cache/apk/* > /dev/null 2>&1
WORKDIR /app

COPY . .
RUN yarn turbo prune --scope=strapi --docker

########
# Installer from pruned monorepo
FROM node:$NODE_VERSION AS installer
ENV NODE_ENV production

# Installing libvips-dev for sharp Compatibility
RUN apk update && \
    apk add build-base gcc autoconf automake zlib-dev libpng-dev vips-dev && \
    rm -rf /var/cache/apk/* > /dev/null 2>&1
WORKDIR /app

COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock
RUN yarn install --frozen-lockfile

COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json
RUN yarn turbo run build --filter=strapi

########
# Runner
FROM node:$NODE_VERSION AS runner
ENV NODE_ENV production
ARG GITHUB_SHA
ENV GITHUB_SHA $GITHUB_SHA

RUN apk add vips-dev
RUN rm -rf /var/cache/apk/*
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 strapi
USER strapi

COPY --from=installer --chown=strapi:nodejs /app/node_modules ./node_modules
COPY --from=installer --chown=strapi:nodejs /app/apps/strapi/node_modules ./apps/strapi/node_modules
ENV PATH /app/node_modules/.bin:/app/apps/strapi/node_modules/.bin:$PATH
COPY --from=installer --chown=strapi:nodejs /app/apps/strapi/ ./apps/strapi/

EXPOSE 1337

ENV PORT 1337

CMD yarn workspace @mda/strapi start
