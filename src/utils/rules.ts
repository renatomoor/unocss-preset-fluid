import type { PresetFluidOptions } from 'unocss-preset-fluid'
import { fluidUtilities } from '../utilities'
import { validateUtilityName } from './validations'
import { extractRemBoundsFromMatch } from './rem'
import { getClamp, getClampComment } from './clamp'
import { REGEX_PATTERNS_NUMERIC_VALUES, REGEX_PATTERNS_RANGE_VALUES } from './regex'

export function buildSinglePropertyRule(match: RegExpMatchArray, config: PresetFluidOptions, property: string) {
  if (!validateUtilityName(match, config))
    return ''

  const { min, max } = extractRemBoundsFromMatch(match, config)

  return {
    [`${property}`]: getClamp(min, max, config) + getClampComment(match, config),
  }
}

export function buildMultiplePropertiesRule(match: RegExpMatchArray, config: PresetFluidOptions, properties: string[]) {
  if (!validateUtilityName(match, config) || !Array.isArray(properties))
    return ''

  const { min, max } = extractRemBoundsFromMatch(match, config)

  const selectors = {}

  properties.forEach((property) => {
    selectors[property] = getClamp(min, max, config) + getClampComment(match, config)
  })

  return {
    ...selectors,
  }
}

export function buildRule(name: string, properties: string | string[], config: PresetFluidOptions) {
  const regexPattersNumericValues = `^${name}${REGEX_PATTERNS_NUMERIC_VALUES}`
  const regexPattersRangeValues = `^${name}${REGEX_PATTERNS_RANGE_VALUES}`

  const regexPattern = `${regexPattersNumericValues}|${regexPattersRangeValues}`
  const regex = new RegExp(regexPattern)

  if (Array.isArray(properties)) {
    return [
      [
        regex,
        (match: RegExpMatchArray) => buildMultiplePropertiesRule(match, config, properties),
      ],
    ]
  }
  else {
    return [
      [
        regex,
        (match: RegExpMatchArray) => buildSinglePropertyRule(match, config, properties),
      ],
    ]
  }
}

export function buildRulesFromUtilities(config: PresetFluidOptions) {
  return Object.entries(fluidUtilities)
    .flatMap(([name, property]) => {
      return buildRule(name, property, config)
    })
}
