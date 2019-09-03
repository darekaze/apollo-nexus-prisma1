import { prismaObjectType } from 'nexus-prisma'

export default prismaObjectType({
  name: 'Query',
  definition(t) {
    t.prismaFields([
      'propertyRentAtom',
      'propertyRentAtoms',
      'propertyRentAtomsConnection',
      'propertySaleAtom',
      'propertySaleAtoms',
      'propertySaleAtomsConnection',
    ])
    //* Define custom query below, or use extendType somewhere else
    t.string('env', () => process.env.NODE_ENV)
  },
})
