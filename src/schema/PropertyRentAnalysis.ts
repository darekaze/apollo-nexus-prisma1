import { prismaExtendType } from 'nexus-prisma'
import { objectType, arg, inputObjectType } from 'nexus/dist'
import { reduce, min, max } from 'rambda'
import { mean, median } from '../utils/statistic'
import { validateRange, validateNonNegative } from '../utils/validate'
import getYearRange from '../utils/year-range'
import { PropertyRentAtom } from '../generated/prisma-client'

export const RentAnalysis = objectType<'RentAnalysis'>({
  name: 'RentAnalysis',
  definition(t) {
    t.float('averageRent', { description: 'Average rent per metersquare' })
    t.float('medianRent', { description: 'Median rent per metersquare' })
    t.float('minRent', { description: 'Minimum rent per metersquare' })
    t.float('maxRent', { description: 'Maximum rent per metersquare' })
    t.int('count', { description: 'Count of the properties' })
    t.list.field('properties', { type: 'PropertyRentAtom' })
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

export const PropertyRentAnalysis = prismaExtendType<'Query'>({
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
        const rentData = await ctx.prisma.propertyRentAtoms({
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

        if (!rentData.length) throw Error('No Results...')

        let minRent = Infinity
        let maxRent = 0
        const unitRentArr = reduce(
          (acc: number[], { unitRent }: PropertyRentAtom) => {
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
          properties: rentData,
        }
      },
    })
  },
})
