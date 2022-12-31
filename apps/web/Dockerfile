ARG NODE_VERSION=18-alpine

FROM node:NODE_VERSION AS prepare
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json yarn.lock* ./

# Keep yarn install cache when bumping version and dependencies still the sames
RUN node -e " \
  const package = JSON.parse(fs.readFileSync('/app/package.json')); \
  const packageZero = { ...package, version: '0.0.0' };  \
  fs.writeFileSync('/app/package.json', JSON.stringify(packageZero));"

########
FROM node:$NODE_VERSION as deps
WORKDIR /app
COPY --from=prepare /app/package.json /app/yarn.lock ./
RUN yarn install --frozen-lockfile


########
# Rebuild the source code only when needed
FROM node:$NODE_VERSION AS builder
ENV NODE_OPTIONS="--max-old-space-size=8192"
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
ARG GITHUB_SHA
ENV GITHUB_SHA $GITHUB_SHA

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN yarn build

########
# Runner
FROM node:$NODE_VERSION AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
