FROM node:10.16-alpine

WORKDIR /opt/pcengine
COPY package.json yarn.lock ./
RUN yarn

COPY . .
COPY environments/production/.env .

EXPOSE 4000
CMD ["yarn", "dev"]
