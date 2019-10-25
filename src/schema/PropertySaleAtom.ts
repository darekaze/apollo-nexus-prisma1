/* eslint-disable import/prefer-default-export */
import { prismaObjectType } from 'nexus-prisma'

// Aggregate gots issue so opt it out first
export const PropertySaleAtomConnection = prismaObjectType<'PropertySaleAtomConnection'>({
  name: 'PropertySaleAtomConnection',
  definition(t) {
    t.prismaFields(['pageInfo', 'edges'])
  },
})
