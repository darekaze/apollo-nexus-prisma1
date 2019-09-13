# Minato

```
apollo-server-micro + typescript + prisma-nexus => ⚡️
```

Some random awesome project made with `apollo-server-micro` with Typescript feat. `nexus` & `prisma`.

To further describe what I've made, this is a graphql microservice which is part of a property pricing engine that determines whether the renting or housing price is reasonable.

:laughing: Feel free to take this as a reference and start implementing your own graphql microservice!

## Development

### `docker-compose` for `prisma` and `redis`

Install [DockStation](https://dockstation.io/) for running docker compose. Trust me, it's easier to manage the whole thing.

Alternatively, you can still use cli to run `docker-compose`..

### `micro-dev` for local server

Then, run this locally with `yarn dev`. For production testing, use Docker (defined in `docker-compse` and `Dockerfile`).

## Deployment

Deploy this to a server that can run Docker compose.
