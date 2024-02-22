import type { PresetFluidOptions } from 'unocss-preset-fluid'
import { invertAndParseNumber } from './parsers'
import { validateUtilityRange } from './validations'

export function getRemMaxWidth(config: PresetFluidOptions) {
  const maxWidth = config.extendMaxWidth || config.maxWidth

  if (config.useRemByDefault)
    return maxWidth
  else
    return maxWidth / config.remBase
}

export function getRemMinWidth(config: PresetFluidOptions) {
  const minWidth = config.extendMinWidth || config.minWidth
  if (config.useRemByDefault)
    return minWidth
  else
    return minWidth / config.remBase
}

export function toRem(value: number, config: PresetFluidOptions) {
  if (config.useRemByDefault)
    return value
  else
    return value / config.remBase
}

/**
 * Calculates the relative size based on the original viewport size and the new viewport size.
 * This allows you to extend the min and max sizes of the fluid layout keeping the proportions.
 * This function is used for the extendMinWidth and extendMaxWidth options.
 * The result of this value is used to calculate the min and max values in rem when the viewport are extended.
 * @param originalViewPortMin The original viewport min size.
 * @param originalMinSize The original min size.
 * @param originalMaxSize The original max size.
 * @param originalViewPortMax The original viewport max size.
 * @param newViewPortSize The new viewport size.
 * @returns The relative size.
 */
export function calculateRelativeSize(
  originalViewPortMin: number,
  originalMinSize: number,
  originalMaxSize: number,
  originalViewPortMax: number,
  newViewPortSize: number,
) {
  const slope = (originalMaxSize - originalMinSize) / (originalViewPortMax - originalViewPortMin)
  return slope * (newViewPortSize - originalViewPortMin) + originalMinSize
}

/**
 * Returns the min and max values in rem for the given match.
 */
export function extractRemBoundsFromMatch(match: RegExpMatchArray | string, config: PresetFluidOptions) {
  let min, max

  const [utility, matchMin, matchMax, , predefinedRangeName] = match

  if (predefinedRangeName) {
    validateUtilityRange(predefinedRangeName, utility, config)
    min = toRem(config.ranges[predefinedRangeName][0], config)
    max = toRem(config.ranges[predefinedRangeName][1], config)
  }
  else {
    min = toRem(invertAndParseNumber(matchMin), config)
    max = toRem(invertAndParseNumber(matchMax), config)
  }

  let relativeMin: number | undefined
  let relativeMax: number | undefined

  if (config.extendMinWidth)
    relativeMin = calculateRelativeSize(config.minWidth, min, max, config.maxWidth, config.extendMinWidth)

  if (config.extendMaxWidth)
    relativeMax = calculateRelativeSize(config.minWidth, min, max, config.maxWidth, config.extendMaxWidth)

  return {
    min: relativeMin ?? min,
    max: relativeMax ?? max,
  }
}
