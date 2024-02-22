/*
 * Casts a string to a number, if possible.
 * @param value - The string to cast.
 * @returns The cast number, or 0 if the string is empty.
 */
export function invertAndParseNumber(value: string) {
  if (!value)
    return 0
  if (value.includes('-'))
    return Number.parseInt(value.replace('-', ''))
  return -Number.parseInt(value)
}
