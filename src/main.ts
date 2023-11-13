import type { Preset } from 'unocss'
import { e } from 'unocss'

export interface PresetFluidOptions {
  /**
   * Min width in pixels where the fluid layout starts.
   * @default 375
   */
  minWidth?: number
  /**
   * Min width in pixels where the fluid layout starts keeping the proportions of the minWidth.
   */
  extendMinWidth?: number
  /**
   * Max width in pixels where the fluid layout ends.
   * @default 1440
   */
  maxWidth?: number
  /**
   * Max width in pixels where the fluid layout ends keeping the proportions of the maxWidth.
   */
  extendMaxWidth?: number
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
}

const defaultOptions: Required<PresetFluidOptions> = {
  maxWidth: 1440,
  minWidth: 375,
  remBase: 16,
  useRemByDefault: false,
  extendMaxWidth: null,
  extendMinWidth: null,
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
  function getRemMinMax(match: RegExpMatchArray) {
    const min = getRemMin(Number.parseInt(match[1]))
    const max = getRemMax(Number.parseInt(match[2]))
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

  function buildFluidUtility(name: string, property: string) {
    return [new RegExp(`${name}-(\\d+)-(\\d+)`), (match, { rawSelector }) => {
      const { min, max } = getRemMinMax(match)
      const selector = e(rawSelector)
      const cssProperty = `${property}: ${getClamp(min, max)}`
      return `
        .${selector} {
          ${cssProperty};
        }`
    }]
  }

  function buildFluidUtilityWithManyProperties(name: string, properties: string[]): any {
    return [new RegExp(`${name}-(\\d+)-(\\d+)`), (match, { rawSelector }) => {
      const { min, max } = getRemMinMax(match)
      const selector = e(rawSelector)
      const cssProperties = properties.map(property => `${property}: ${getClamp(min, max)};`).join('\n')
      return `
        .${selector} {
          ${cssProperties}
        }`
    }]
  }

  const fluidUtilities = {
    'f-text': 'font-size',
    'f-w': 'width',
    'f-w-min': 'min-width',
    'f-w-max': 'max-width',
    'f-h': 'height',
    'f-h-min': 'min-height',
    'f-h-max': 'max-height',
    'f-p': 'padding',
    'f-pt': 'padding-top',
    'f-pb': 'padding-bottom',
    'f-pl': 'padding-left',
    'f-px': ['padding-left', 'padding-right'],
    'f-py': ['padding-top', 'padding-bottom'],
    'f-m': 'margin',
    'f-mt': 'margin-top',
    'f-mb': 'margin-bottom',
    'f-ml': 'margin-left',
    'f-mx': ['margin-left', 'margin-right'],
    'f-my': ['margin-top', 'margin-bottom'],
    'f-gap': 'gap',
    'f-gap-x': 'column-gap',
    'f-gap-y': 'row-gap',
    'f-indent': 'text-indent',
    'f-scroll-m': 'scroll-margin',
    'f-scroll-mt': 'scroll-margin-top',
    'f-scroll-mb': 'scroll-margin-bottom',
    'f-scroll-ml': 'scroll-margin-left',
    'f-scroll-mr': 'scroll-margin-right',
    'f-scroll-mx': ['scroll-margin-left', 'scroll-margin-right'],
    'f-scroll-my': ['scroll-margin-top', 'scroll-margin-bottom'],
    'f-scroll-ms': 'scroll-margin-inline-start',
    'f-scroll-me': 'scroll-margin-inline-end',
    'f-scroll-p': 'scroll-padding',
    'f-scroll-pt': 'scroll-padding-top',
    'f-scroll-pb': 'scroll-padding-bottom',
    'f-scroll-pl': 'scroll-padding-left',
    'f-scroll-pr': 'scroll-padding-right',
    'f-scroll-px': ['scroll-padding-left', 'scroll-padding-right'],
    'f-scroll-py': ['scroll-padding-top', 'scroll-padding-bottom'],
    'f-scroll-ps': 'scroll-padding-inline-start',
    'f-scroll-pe': 'scroll-padding-inline-end',
    'f-leading': 'line-height',
  }

  function buildUtilities() {
    const utilities = Object.entries(fluidUtilities).flatMap(([name, property]) => {
      if (Array.isArray(property))
        return [buildFluidUtilityWithManyProperties(name, property)]
      else
        return [buildFluidUtility(name, property)]
    })
    return utilities
  }

  return {
    name: 'unocss-preset-fluid',
    rules: [
      ...buildUtilities(),
    ],
  }
}
