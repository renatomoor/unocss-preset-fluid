import type { PresetFluidOptions } from 'unocss-preset-fluid'
import { getRemMaxWidth, getRemMinWidth } from './rem'
import { extractValuesFromRegexMatch } from './regex'

/**
 * Calculates the slope value for fluid.
 *
 * @param min - The minimum value in the fluid range.
 * @param max - The maximum value in the fluid range.
 * @param config - Configuration object.
 * @returns The calculated slope value.
 */
export function getSlope(min: number, max: number, config: PresetFluidOptions) {
  const remMaxWidth = getRemMaxWidth(config)
  const remMinWidth = getRemMinWidth(config)
  return ((max - min) / (remMaxWidth - remMinWidth))
}

/**
 * Calculates the intersection point for the fluid formula.
 *
 * @param min - The minimum value in the fluid range.
 * @param slope - The slope value calculated for the fluid.
 * @param minWidth - The minimum viewport width.
 * @returns The calculated intersection point.
 */
export function getIntersection(min: number, slope: number, minWidth: number) {
  return (-minWidth * slope + min)
}

/**
 * Calculates the slope percentage for the CSS 'clamp' function.
 *
 * @param min - The minimum value in the fluid range.
 * @param max - The maximum value in the fluid range.
 * @param config - Configuration object.
 * @returns The slope value as a percentage for use in the 'clamp' function.
 */
export function getSlopePercentage(min: number, max: number, config: PresetFluidOptions) {
  const slope = getSlope(min, max, config)
  return (slope * 100)
}

/**
 * Generates a CSS 'clamp' function value for fluid.
 *
 * @param min - The minimum value in the fluid range.
 * @param max - The maximum value in the fluid range.
 * @param config - Configuration object.
 * @returns A string representing the CSS 'clamp' function.
 */
export function getClamp(min: number, max: number, config: PresetFluidOptions) {
  const slope = getSlope(min, max, config)
  const intersection = getIntersection(min, slope, getRemMinWidth(config))
  const slopePercentage = getSlopePercentage(min, max, config)

  const clampMin = Math.min(min, max)
  const clampMax = Math.max(min, max)

  return `clamp(${clampMin}rem, ${intersection.toFixed(4)}rem + ${slopePercentage.toFixed(4)}vw, ${clampMax}rem)`
}

/**
 * Generates a comment with the fluid values for the clamp CSS.
 *
 * @param match - The match array from the regex.
 * @param config - Configuration object.
 * @returns A string representing the comment for the 'clamp' function with fluid real values.
 */
export function getClampComment(match: RegExpMatchArray, config: PresetFluidOptions) {
  if (!config.commentHelpers)
    return ''

  const { predefinedRangeName, matchMin, matchMax } = extractValuesFromRegexMatch(match)
  const predefinedRange = config.ranges && config.ranges[predefinedRangeName]
  const isRem = config.useRemByDefault
  const min = predefinedRange ? predefinedRange[0] : -Number.parseInt(matchMin)
  const max = predefinedRange ? predefinedRange[1] : -Number.parseInt(matchMax)
  const unit = isRem ? 'rem' : 'px'
  return `/* ${min}${unit} -> ${max}${unit} */`
}
