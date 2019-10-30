# Minato template - `apollo-nexus-prisma1`

```
apollo-server-micro + typescript + nexus-prisma => ⚡️
```

Some random awesome project made with `apollo-server-micro` with Typescript feat. `nexus` & `prisma1`.

To further describe what I've made, this is a graphql microservice which is part of a property pricing engine that determines whether the renting or housing price is reasonable.

:laughing: Feel free to take this as a reference and start implementing your own graphql microservice!

## Development

### `docker-compose` for `prisma` and `redis`

Use cli to run `docker-compose`, make sure `docker-compose` is installed.
```bash
# Run docker-compose up --build -d with yarn
yarn dc
```

ProTip: You can view and manage your docker container using [`lazydocker`](https://github.com/jesseduffield/lazydocker).

Or if you prefer a fancy GUI, use [DockStation](https://dockstation.io/) instead.

### `micro-dev` for local server

Then, run this locally with `yarn dev`. For production testing, use Docker (defined in `docker-compose` and `Dockerfile`).

## Environment Variables (`env`)

> `.env.local` for local dev
> `.env.production` for production docker
> `.env` is for prisma and docker-compose (also need for building to production)

Instructions are inside `.env.example`

### Local specific setting

put the belows code in both `.env` and `.env.local`

```
PRISMA_HOST=localhost
REDIS_HOST=localhost
```

## Deployment

Deploy this to any server that can run Docker compose. Additionally, you can further config it to use Docker Swarm.
