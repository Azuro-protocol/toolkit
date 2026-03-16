export const formatToFixed = (value: string | number, digitsCount: number): number => {
  value = String(value)

  if (!/\./.test(value)) {
    return +value
  }

  const [ int, digits ] = value.split('.')

  if (!digitsCount || digitsCount < 0 || !digits?.length || digits.length < digitsCount) {
    return +(int || 0)
  }

  return +`${int}.${digits!.slice(0, digitsCount)}`
}
