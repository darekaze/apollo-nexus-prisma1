/* eslint-disable import/prefer-default-export */
import { prismaExtendType, prismaObjectType } from 'nexus-prisma'

export const PropertyRentAtomFilter = prismaExtendType({
  type: 'Query',
  definition(t) {
    t.string('dbname', () => process.env.DB_NAME)
  },
})

// Aggregate gots issue so opt it out first
export const PropertyRentAtomConnection = prismaObjectType({
  name: 'PropertyRentAtomConnection',
  definition(t) {
    t.prismaFields(['pageInfo', 'edges'])
  },
})
