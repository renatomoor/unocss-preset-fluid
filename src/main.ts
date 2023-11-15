import type { Preset } from 'unocss'
import { e } from 'unocss'
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
}

const defaultOptions: Required<PresetFluidOptions> = {
  maxWidth: 1440,
  minWidth: 375,
  remBase: 16,
  useRemByDefault: false,
  extendMaxWidth: null,
  extendMinWidth: null,
  ranges: null,
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
    return `clamp(${min}rem, ${getIntersection(min, getSlope(min, max), getRemMinWidth()).toFixed(4)}rem + ${getSlopeForClamp(min, max).toFixed(4)}vw, ${max}rem)`
  }

  /**
   * Returns the min and max values in rem for the given match.
   */
  function getRemMinMax(match: RegExpMatchArray | string) {
    let min, max
    const predefinedRangeName = match[3]
    if (predefinedRangeName) {
      min = getRemMin(config.ranges[predefinedRangeName][0])
      max = getRemMin(config.ranges[predefinedRangeName][1])
    }
    else {
      min = getRemMin(Number.parseInt(match[1]))
      max = getRemMax(Number.parseInt(match[2]))
    }

    let relativeMin: number | undefined
    let relativemax: number | undefined
    if (config.extendMinWidth)
      relativeMin = calculateRelativeFontSize(config.minWidth, min, max, config.maxWidth, config.extendMinWidth)
    if (config.extendMaxWidth)
      relativemax = calculateRelativeFontSize(config.minWidth, min, max, config.maxWidth, config.extendMaxWidth)

    return {
      min: relativeMin || min,
      max: relativemax || max,
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
    if (match[1] === undefined && match[2] === undefined && match[3] !== undefined) {
      if (!config.ranges)
        return false
      if (!config.ranges[match[3]])
        return false
    }
    return true
  }

  function buildFlexibleFluidUtility(name: string, properties: string | string[]) {
    const matchMultipleProperties = (match, { rawSelector }) => {
      if (!validateRangeName(match))
        return ''

      const { min, max } = getRemMinMax(match)
      const selector = e(rawSelector)
      const cssProperties = properties.map(property => `${property}: ${getClamp(min, max)};`).join('\n')
      return `
          .${selector} {
            ${cssProperties}
          }`
    }
    const matchSingleProperty = (match, { rawSelector }) => {
      if (!validateRangeName(match))
        return ''

      const { min, max } = getRemMinMax(match)
      const selector = e(rawSelector)
      const cssProperty = `${properties}: ${getClamp(min, max)}`
      return `
          .${selector} {
            ${cssProperty};
          }`
    }

    if (Array.isArray(properties)) {
      return [
        [
          new RegExp(`${name}-(\\d+)-(\\d+)|${name}-(\\w+)`),
          matchMultipleProperties,
        ],
      ]
    }
    else {
      return [
        [
          new RegExp(`${name}-(\\d+)-(\\d+)|${name}-(\\w+)`),
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
