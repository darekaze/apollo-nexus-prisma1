import path from 'path'
import microCors from 'micro-cors'
import { ApolloServer } from 'apollo-server-micro'
import { makePrismaSchema } from 'nexus-prisma'
import { prisma } from './generated/prisma-client'
import datamodelInfo from './generated/nexus-prisma'
import * as types from './schema'

// Setup cors methods and origin so in production mode
// others can't access this API, default set to all(*)
const cors = microCors({
  allowMethods: ['GET', 'POST'],
  origin: process.env.ORIGIN || '*',
})

const schema = makePrismaSchema({
  types,
  prisma: {
    datamodelInfo,
    client: prisma,
  },
  outputs: {
    schema: path.join(__dirname, './generated/schema.graphql'),
    typegen: path.join(__dirname, './generated/nexus.ts'),
  },
})

// TODO: setup redis in the final
const server = new ApolloServer({
  schema,
  context: { prisma },
  playground: process.env.NODE_ENV === 'development', // keep it or else hot reload won't work
})

export default cors(server.createHandler({ path: '/api' }))
