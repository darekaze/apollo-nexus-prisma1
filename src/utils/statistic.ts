/* eslint-disable no-nested-ternary */
// These are missing in the ranbda types, so put here as temp

export function sum(list: number[]): number {
  return list.reduce((prev, current) => prev + current, 0)
}

export function mean(list: number[]): number {
  return sum(list) / list.length
}

export function median(list: number[]): number {
  const len = list.length
  if (len === 0) return NaN
  const width = 2 - (len % 2)
  const idx = (len - width) / 2
  return mean(
    Array.prototype.slice
      .call(list, 0)
      .sort((a: number, b: number) => (a === b ? 0 : a < b ? -1 : 1))
      .slice(idx, idx + width)
  )
}
