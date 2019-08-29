import path from 'path'
import microCors from 'micro-cors'
import { ApolloServer } from 'apollo-server-micro'
import { prismaObjectType, makePrismaSchema } from 'nexus-prisma'
import { prisma } from './generated/prisma-client'
import datamodelInfo from './generated/nexus-prisma'
import { IS_DEV } from './configs/env'

// Setup cors methods and origin so in production mode
// others can't access this API, default set to all(*)
const cors = microCors({
  allowMethods: ['GET', 'POST'],
  origin: process.env.ORIGIN || '*',
})

const Query = prismaObjectType({
  name: 'Query',
  definition: t => t.prismaFields(['*']),
})

const Mutation = prismaObjectType({
  name: 'Mutation',
  definition: t => t.prismaFields(['*']),
})

const schema = makePrismaSchema({
  types: [Query, Mutation],

  prisma: {
    datamodelInfo,
    client: prisma,
  },

  outputs: {
    schema: path.join(__dirname, './generated/schema.graphql'),
    typegen: path.join(__dirname, './generated/nexus.ts'),
  },
})

const server = new ApolloServer({
  schema,
  context: { prisma },
  playground: IS_DEV, // keep it or else hot reload won't work
})

export default cors(server.createHandler({ path: '/api' }))
