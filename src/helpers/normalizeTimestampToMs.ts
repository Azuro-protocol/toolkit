/**
 * Normalize events timestamp (ISO String, unix time in seconds or ms) to milliseconds.
 *
 * As a reasonable threshold for whether to count the number in seconds or milliseconds,
 * it takes the value 32_503_680_000 (which equals January 12, 1971 in ms and Jan 01, 3000 in seconds).
 *
 * So it isn't applicable to dates before January 12, 1971.
 * */
export const normalizeTimestampToMs = (timestamp: string | number) => {
  if (typeof timestamp === 'string' && isNaN(+timestamp)) {
    return Date.parse(timestamp)
  }

  const numericValue = +timestamp

  // If the value is less than a reasonable milliseconds threshold,
  // treat it as seconds, otherwise as milliseconds
  return numericValue < 32_503_680_000 ? numericValue * 1000 : numericValue
}
