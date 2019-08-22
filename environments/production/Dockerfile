FROM node:10.16-alpine AS builder

WORKDIR /opt/pcengine
COPY package.json yarn.lock ./
RUN yarn

COPY . .
RUN yarn build

# Prod Stage
FROM node:10.16-alpine

ARG NODE_ENV
ENV NODE_ENV=$NODE_ENV

WORKDIR /opt/pcengine
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production && \
    yarn cache clean

COPY --from=builder /opt/pcengine/dist ./dist
COPY environments/production/.env .

EXPOSE 4000
CMD ["yarn", "start"]
