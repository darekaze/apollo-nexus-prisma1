export const validateRange = (min: number, max: number): void => {
  if (min > max) throw new Error('Min value should not be larger than max value.')
}

export const validateNonNegative = (numArr: number[]): void => {
  numArr.forEach(num => {
    if (num < 0) throw new Error('Number values cannot be negative.')
  })
}
