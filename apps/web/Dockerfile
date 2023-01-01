ARG NODE_VERSION=18-alpine

########
# Pre install
FROM node:$NODE_VERSION AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY . .
RUN yarn turbo prune --scope=web --docker

########
# Installer from pruned monorepo
FROM node:$NODE_VERSION AS installer
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
ENV NEXTJS_IGNORE_ESLINT=1

RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock
RUN yarn install --frozen-lockfile

COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json
RUN yarn turbo run build --filter=web

########
# Runner
FROM node:$NODE_VERSION AS runner

ENV NODE_OPTIONS="--max-old-space-size=8192"
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
ARG GITHUB_SHA
ENV GITHUB_SHA $GITHUB_SHA

WORKDIR /app

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=installer /app/apps/web/public ./apps/web/public
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static


EXPOSE 3000

ENV PORT 3000

CMD node apps/web/server.js
