import { Prisma } from './generated/prisma-client'

export interface Context {
  prisma: Prisma
}

export interface RentAtomFragment {
  canonicalStation?: string
  area?: number
  basicRent?: number
  rentPlusAlpha?: number
  maintenanceFee?: number
  totalRent?: number
  guaranteeMoneyMultiple?: number
  keyMoneyMultiple?: number
  unitRent?: number
  yearBuilt?: number
}
