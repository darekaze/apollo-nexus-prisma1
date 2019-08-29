import microCors from 'micro-cors'
import { ApolloServer, gql } from 'apollo-server-micro'
import { IS_DEV } from './configs/env'

// Setup cors methods and origin so in production mode
// others can't access this API
const cors = microCors({
  allowMethods: ['GET', 'POST'],
  origin: process.env.ORIGIN || '*',
})

const typeDefs = gql`
  type Query {
    hello: String
    environment: String
  }
`

const resolvers = {
  Query: {
    hello: (): string => {
      return 'Hello world! gg'
    },
    environment: (): string => {
      return process.env.NODE_ENV
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: IS_DEV, // keep it or else hot reload won't work
})

export default cors(server.createHandler({ path: '/api' }))
