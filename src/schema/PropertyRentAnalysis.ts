import { prismaExtendType } from 'nexus-prisma'
import { objectType, arg, inputObjectType } from 'nexus/dist'
import { reduce, min, max } from 'rambda'
import { mean, median } from '../utils/statistic'
import { validateRange, validateNonNegative } from '../utils/validate'
import getYearRange from '../utils/year-range'
import { RentAtomFragment } from '../types'

const rentAtomFragment = `
  fragment RentAtomFragment on PropertyRentAtom {
    canonicalStation
    yearBuilt
    area
    unitRent
    basicRent
    rentPlusAlpha
    maintenanceFee
    totalRent
    guaranteeMoneyMultiple
    keyMoneyMultiple
  }
`

export const RentAnalysis = objectType({
  name: 'RentAnalysis',
  definition(t) {
    t.float('averageRent', { description: 'Average rent per metersquare' })
    t.float('medianRent', { description: 'Median rent per metersquare' })
    t.float('minRent', { description: 'Minimum rent per metersquare' })
    t.float('maxRent', { description: 'Maximum rent per metersquare' })
    t.int('count')
    // can return the list here later...
  },
})

export const RentAnalysisInput = inputObjectType({
  name: 'RentAnalysisInput',
  definition(t) {
    t.string('stationName', { required: true })
    t.int('minWalkingTime', { default: 0 })
    t.int('minBuildingAge', { default: 0 })
    t.int('maxWalkingTime', { required: true })
    t.int('maxBuildingAge', { required: true })
  },
})

export const PropertyRentAnalysis = prismaExtendType({
  type: 'Query',
  definition(t) {
    t.field('propertyRentAnalysis', {
      type: 'RentAnalysis',
      args: {
        input: arg({
          type: 'RentAnalysisInput',
          required: true,
          description: 'Input for calculating rent statistics',
        }),
      },
      resolve: async (_, { input }, ctx) => {
        const {
          stationName,
          minBuildingAge,
          maxBuildingAge,
          minWalkingTime,
          maxWalkingTime,
        } = input

        validateNonNegative([minBuildingAge, maxBuildingAge, minWalkingTime, maxWalkingTime])
        validateRange(minBuildingAge, maxBuildingAge)
        validateRange(minWalkingTime, maxWalkingTime)

        const [fromYear, toYear] = getYearRange(minBuildingAge, maxBuildingAge)
        const rentData: RentAtomFragment[] = await ctx.prisma
          .propertyRentAtoms({
            where: {
              yearBuilt_gte: fromYear,
              yearBuilt_lte: toYear,
              nearbyStations_some: {
                name: stationName,
                duration_gte: minWalkingTime,
                duration_lte: maxWalkingTime,
              },
            },
          })
          .$fragment(rentAtomFragment)

        if (!rentData.length) throw Error('No Results...')

        let minRent = Infinity
        let maxRent = 0
        const unitRentArr = reduce(
          (acc: number[], { unitRent }: RentAtomFragment) => {
            minRent = min(minRent, unitRent)
            maxRent = max(maxRent, unitRent)
            acc.push(unitRent)
            return acc
          },
          [],
          rentData
        )

        return {
          averageRent: mean(unitRentArr),
          medianRent: median(unitRentArr),
          minRent,
          maxRent,
          count: rentData.length,
        }
      },
    })
  },
})
