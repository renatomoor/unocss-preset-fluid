export const REGEX_PATTERNS_NUMERIC_VALUES = '(?:--)?(-?\\d+)?(?:--)?(-?\\d+)?$'
export const REGEX_PATTERNS_RANGE_VALUES = '(?:--)?(-?\\d+)?(?:-([a-zA-Z0-9]+))?$'

export function extractValuesFromRegexMatch(match: RegExpMatchArray) {
  const [utility, matchMin, matchMax, , predefinedRangeName] = match
  return {
    utility,
    matchMin,
    matchMax,
    predefinedRangeName,
  }
}
