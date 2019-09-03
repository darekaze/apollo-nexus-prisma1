export default (minAge: number, maxAge: number): number[] => {
  const yearNow = new Date().getFullYear()
  const fromYear = yearNow - maxAge
  const toYear = yearNow - minAge

  return [fromYear, toYear]
}
