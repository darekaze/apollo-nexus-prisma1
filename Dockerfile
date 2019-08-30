FROM node:10.16-alpine AS builder

WORKDIR /opt/ctr
COPY package.json yarn.lock ./
RUN yarn

COPY . .
RUN yarn build

# Real app
FROM node:10.16-alpine

ARG NODE_ENV
ENV NODE_ENV=$NODE_ENV

WORKDIR /opt/pcengine
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production && \
    yarn cache clean

COPY --from=builder /opt/ctr/dist ./dist

EXPOSE 4000
CMD ["yarn", "start"]
