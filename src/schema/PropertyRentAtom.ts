/* eslint-disable import/prefer-default-export */
import { prismaObjectType } from 'nexus-prisma'

// Aggregate gots issue so opt it out first
export const PropertyRentAtomConnection = prismaObjectType({
  name: 'PropertyRentAtomConnection',
  definition(t) {
    t.prismaFields(['pageInfo', 'edges'])
  },
})
