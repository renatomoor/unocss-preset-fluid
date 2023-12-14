import type { Preset } from 'unocss'
import { fluidUtilities } from './utilities'

export interface Ranges {
  [key: string]: [number, number]
}

export interface PresetFluidOptions {
  /**
   * Min width in pixels where the fluid layout starts.
   * @default 375
   */
  minWidth?: number
  /**
   * Min width in pixels where the fluid layout starts keeping the proportions of the minWidth.
   */
  extendMinWidth?: number | null
  /**
   * Max width in pixels where the fluid layout ends.
   * @default 1440
   */
  maxWidth?: number
  /**
   * Max width in pixels where the fluid layout ends keeping the proportions of the maxWidth.
   */
  extendMaxWidth?: number | null
  /**
   * Base font size in pixels.
   * @default 16
   */
  remBase?: number
  /**
   * Whether to use rem by default.
   * @default false
   */
  useRemByDefault?: boolean
  /**
   * A preset with predefined ranges of fluid spacing
   * @default undefined;
   */
  ranges?: Ranges | null

  /**
   * Whether to add comment helpers to the generated CSS.
   * @default false
   */
  commentHelpers?: boolean
}

const defaultOptions: Required<PresetFluidOptions> = {
  maxWidth: 1440,
  minWidth: 375,
  remBase: 16,
  useRemByDefault: false,
  extendMaxWidth: null,
  extendMinWidth: null,
  ranges: null,
  commentHelpers: false,
}

export function presetFluid(options?: PresetFluidOptions): Preset {
  const config = Object.assign({}, defaultOptions, options)

  function getRemMaxWidth() {
    const maxWidth = config.extendMaxWidth || config.maxWidth
    if (config.useRemByDefault)
      return maxWidth
    else
      return maxWidth / config.remBase
  }

  function getRemMinWidth() {
    const minWidth = config.extendMinWidth || config.minWidth
    if (config.useRemByDefault)
      return minWidth
    else
      return minWidth / config.remBase
  }

  function getSlope(min: number, max: number) {
    return ((max - min) / (getRemMaxWidth() - getRemMinWidth()))
  }

  function getRemMin(min: number) {
    if (config.useRemByDefault)
      return min
    else
      return min / config.remBase
  }

  function getRemMax(max: number) {
    if (config.useRemByDefault)
      return max
    else
      return max / config.remBase
  }

  function getIntersection(min: number, slope: number, minWidth: number) {
    return (-minWidth * slope + min)
  }

  function getSlopeForClamp(min: number, max: number) {
    return (getSlope(min, max) * 100)
  }

  function getClamp(min: number, max: number) {
    if (max > min)
      return `clamp(${min}rem, ${getIntersection(min, getSlope(min, max), getRemMinWidth()).toFixed(4)}rem + ${getSlopeForClamp(min, max).toFixed(4)}vw, ${max}rem)`

    return `clamp(${max}rem, ${getIntersection(min, getSlope(min, max), getRemMinWidth()).toFixed(4)}rem + ${getSlopeForClamp(min, max).toFixed(4)}vw, ${min}rem)`
  }

  function castValueFromRegexMatch(value: string) {
    if (!value)
      return 0
    if (value.includes('-'))
      return Number.parseInt(value.replace('-', ''))
    return -Number.parseInt(value)
  }

  /**
   * Returns the min and max values in rem for the given match.
   */
  function getRemMinMax(match: RegExpMatchArray | string) {
    let min, max

    const predefinedRangeName = match[5]
    min = getRemMin(castValueFromRegexMatch(match[1]))
    max = getRemMax(castValueFromRegexMatch(match[2]))

    if (predefinedRangeName) {
      min = getRemMin(config.ranges[predefinedRangeName][0])
      max = getRemMax(config.ranges[predefinedRangeName][1])
    }

    let relativeMin: number | undefined
    let relativeMax: number | undefined
    if (config.extendMinWidth)
      relativeMin = calculateRelativeFontSize(config.minWidth, min, max, config.maxWidth, config.extendMinWidth)
    if (config.extendMaxWidth)
      relativeMax = calculateRelativeFontSize(config.minWidth, min, max, config.maxWidth, config.extendMaxWidth)

    return {
      min: relativeMin || min,
      max: relativeMax || max,
    }
  }

  /**
   * Calculates the relative font size based on the original viewport size and the new viewport size.
   */
  function calculateRelativeFontSize(
    originalViewPortMin: number,
    originalMinSize: number,
    originalMaxSize: number,
    originalViewPortMax: number,
    newViewPortSize: number,
  ) {
    const slope = (originalMaxSize - originalMinSize) / (originalViewPortMax - originalViewPortMin)
    return slope * (newViewPortSize - originalViewPortMin) + originalMinSize
  }

  function validateRangeName(match) {
    if (match[1] === undefined && match[2] === undefined && match[3] !== undefined && match[4] !== undefined) {
      if (!config.ranges)
        return false
      if (!config.ranges[match[5]])
        return false
    }
    return true
  }

  function getUtilityComment(name: string, match: RegExpMatchArray) {
    if (!config.commentHelpers)
      return ''
    const predefinedRangeName = match[5] || ''
    const predefinedRange = config.ranges && config.ranges[predefinedRangeName]
    const isRem = config.useRemByDefault
    const min = predefinedRange ? predefinedRange[0] : Number.parseInt(match[1])
    const max = predefinedRange ? predefinedRange[1] : Number.parseInt(match[2])
    const unit = isRem ? 'rem' : 'px'
    return ` /* ${min}${unit} -> ${max}${unit} */`
  }

  function buildFlexibleFluidUtility(name: string, properties: string | string[]) {
    const matchMultipleProperties = (match) => {
      if (!validateRangeName(match) || !Array.isArray(properties))
        return ''

      const { min, max } = getRemMinMax(match)

      const selectors = {}

      properties.forEach((property) => {
        selectors[property] = getClamp(min, max) + getUtilityComment(name, match)
      })
      return {
        ...selectors,
      }
    }
    const matchSingleProperty = (match) => {
      if (!validateRangeName(match))
        return ''

      const { min, max } = getRemMinMax(match)

      return {
        [`${properties}`]: getClamp(min, max) + getUtilityComment(name, match),
      }
    }

    const regexPattersNumericValues = `^${name}(?:--)?(-?\\d+)?(?:--)?(-?\\d+)?$`
    const regexPattersRangeValues = `^${name}((?:--)?(-?\\d+))?(?:-([a-z]+))?$`

    const regexPattern = `${regexPattersNumericValues}|${regexPattersRangeValues}`
    const regex = new RegExp(regexPattern)

    if (Array.isArray(properties)) {
      return [
        [
          regex,
          matchMultipleProperties,
        ],
      ]
    }
    else {
      return [
        [
          regex,
          matchSingleProperty,
        ],
      ]
    }
  }

  function buildFlexibleUtilities() {
    const utilities = Object.entries(fluidUtilities).flatMap(([name, property]) => {
      return buildFlexibleFluidUtility(name, property)
    })
    return utilities
  }

  return {
    name: 'unocss-preset-fluid',
    rules: [
      ...buildFlexibleUtilities(),
    ] as any,
  }
}
