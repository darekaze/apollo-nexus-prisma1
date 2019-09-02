import { prismaObjectType } from 'nexus-prisma'

export default prismaObjectType({
  name: 'Mutation',
  definition(t) {
    t.prismaFields([
      'createPropertyRentAtom',
      'updatePropertyRentAtom',
      'updateManyPropertyRentAtoms',
      'upsertPropertyRentAtom',
      'createPropertySaleAtom',
      'updatePropertySaleAtom',
      'updateManyPropertySaleAtoms',
      'upsertPropertySaleAtom',
      'createPropertyDBLoadHistory',
    ])
  },
})
