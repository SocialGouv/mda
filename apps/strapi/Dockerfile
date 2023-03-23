ARG NODE_VERSION=18-alpine

########
# Pre install
FROM node:$NODE_VERSION AS builder
RUN apk add --no-cache --update libc6-compat && \
    rm -rf /var/cache/apk/* > /dev/null 2>&1
WORKDIR /app

RUN yarn global add turbo
COPY . .
# COPY apps/strapi/package.json apps/strapi/
# COPY packages/config/package.json packages/config/
# COPY packages/eslint-config/package.json packages/eslint-config/
# COPY package.json yarn.lock turbo.json ./
# COPY .monorepo-build/json yarn.lock turbo.json ./ => DREAM (TODO BEFORE yarn turbo prune --scope=@mda/strapi --docker --out-dir .monorepo-build)
RUN turbo prune --scope=@mda/strapi --docker

FROM node:$NODE_VERSION AS tmp-json
COPY --from=builder /app/out/yarn.lock /app/out/json /tmp-json/

FROM node:$NODE_VERSION AS tmp-full
COPY --from=builder /app/out/full/ /tmp-full/

########
# Installer from pruned monorepo
FROM node:$NODE_VERSION AS installer

# Installing libvips-dev for sharp Compatibility
RUN apk add --no-cache --update \
      libc6-compat \
      build-base \
      gcc \
      autoconf \
      automake \
      zlib-dev \
      libpng-dev \
      vips-dev && \
    rm -rf /var/cache/apk/* > /dev/null 2>&1

WORKDIR /app

COPY .gitignore .gitignore
COPY --from=tmp-json /tmp-json/ .
RUN yarn install --frozen-lockfile

COPY --from=tmp-full /tmp-full/ .
COPY turbo.json turbo.json
RUN yarn turbo run build --filter=strapi

########
# Runner
FROM node:$NODE_VERSION AS runner
ENV NODE_ENV production

RUN apk add vips-dev
RUN rm -rf /var/cache/apk/*
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 strapi
USER 1001

COPY --from=installer --chown=strapi:nodejs /app/node_modules ./node_modules
COPY --from=installer --chown=strapi:nodejs /app/packages/strapi-types/node_modules ./packages/strapi-types/node_modules
COPY --from=installer --chown=strapi:nodejs /app/apps/strapi/node_modules ./apps/strapi/node_modules
ENV PATH /app/node_modules/.bin:/app/apps/strapi/node_modules/.bin:$PATH
COPY --from=installer --chown=strapi:nodejs /app/packages/strapi-types/ ./packages/strapi-types/
COPY --from=installer --chown=strapi:nodejs /app/apps/strapi/ ./apps/strapi/

EXPOSE 1337

ENV PORT 1337

WORKDIR /app/apps/strapi
CMD ["strapi", "start"]
