import path from 'path'
import microCors from 'micro-cors'
import { ApolloServer } from 'apollo-server-micro'
import { RedisCache } from 'apollo-server-cache-redis'
import responseCachePlugin from 'apollo-server-plugin-response-cache'
import { makePrismaSchema } from 'nexus-prisma'
import { prisma } from './generated/prisma-client'
import datamodelInfo from './generated/nexus-prisma'
import * as allTypes from './schema'

// Setup cors methods and origin so in production mode
// others can't access this API, default set to all(*)
const cors = microCors({
  allowMethods: ['GET', 'POST'],
  origin: process.env.ORIGIN || '*',
})

const schema = makePrismaSchema({
  types: allTypes,
  prisma: {
    datamodelInfo,
    client: prisma,
  },
  outputs: {
    schema: path.join(__dirname, './generated/schema.graphql'),
    typegen: path.join(__dirname, './generated/nexus.ts'),
  },
  typegenAutoConfig: {
    sources: [
      {
        source: path.join(__dirname, './types.ts'),
        alias: 't',
      },
    ],
    contextType: 't.Context',
  },
})

const cache = new RedisCache({
  host: process.env.REDIS_HOST || 'localhost',
})

const server = new ApolloServer({
  schema,
  context: { prisma },
  cache,
  cacheControl: {
    defaultMaxAge: 180, // 2 minutes
  },
  persistedQueries: { cache },
  plugins: [responseCachePlugin()],
  playground: process.env.NODE_ENV === 'development', // for dev hot reload
})

export default cors(server.createHandler({ path: '/api' }))
