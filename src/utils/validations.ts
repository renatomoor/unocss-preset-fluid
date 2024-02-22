import type { PresetFluidOptions } from 'unocss-preset-fluid'
import { extractValuesFromRegexMatch } from './regex'

export function validateUtilityRange(range: string, utility: string, config: PresetFluidOptions) {
  if (!config.ranges)
    throw new Error(`[unocss-preset-fluid] (${utility}) Trying to use predefined range ${range} but no ranges are defined.`)

  if (!config.ranges[range])
    throw new Error(`[unocss-preset-fluid] (${utility}) Trying to use predefined range ${range} but it is not defined in ranges.`)

  return true
}

export function validateUtilityName(match: RegExpMatchArray, config: PresetFluidOptions) {
  const { utility, matchMin, matchMax, predefinedRangeName } = extractValuesFromRegexMatch(match)
  if (!predefinedRangeName && matchMin && matchMax)
    return true

  try {
    validateUtilityRange(predefinedRangeName, utility, config)
  }
  catch (error) {
    console.warn(error.message)
    return false
  }

  return true
}
