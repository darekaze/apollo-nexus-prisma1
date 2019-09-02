/* eslint-disable import/prefer-default-export */
import { prismaExtendType, prismaObjectType } from 'nexus-prisma'

export const PropertySaleAtomFilter = prismaExtendType({
  type: 'Query',
  definition(t) {
    t.string('testing', () => process.env.DB_NAME)
  },
})

// Aggregate gots issue so opt it out first
export const PropertySaleAtomConnection = prismaObjectType({
  name: 'PropertySaleAtomConnection',
  definition(t) {
    t.prismaFields(['pageInfo', 'edges'])
  },
})
