import { expect, it, vi } from 'vitest'
import { extractRemBoundsFromMatch } from '../src/utils/rem'
import type { PresetFluidOptions } from '../src/main'
import { defaultOptions } from '../src/main'
import { validateUtilityName } from '../src/utils/validations'

const ranges: {
  [key: string]: [number, number]
} = {
  xs: [12, 24],
  sm: [16, 32],
  md: [20, 40],
  lg: [24, 48],
  xl: [28, 56],
}

const optionsWithRanges: PresetFluidOptions = {
  ...defaultOptions,
  ranges,
}

it('extract rem bounds from invalid match ranges', () => {
  expect(() =>
    extractRemBoundsFromMatch(
      ['f-text-10xl', '', '', '', '10xl'],
      optionsWithRanges,
    ))
    .toThrowError('[unocss-preset-fluid] (f-text-10xl) Trying to use predefined range 10xl but it is not defined in ranges.')
})

it('extract rem bounds No ranges validation', () => {
  expect(() =>
    extractRemBoundsFromMatch(
      ['f-text-10xl', '', '', '', '10xl'],
      defaultOptions,
    ))
    .toThrowError('[unocss-preset-fluid] (f-text-10xl) Trying to use predefined range 10xl but no ranges are defined.')
})

it('validate utility name', () => {
  const consoleMock = vi.spyOn(console, 'warn').mockImplementation(() => undefined)

  validateUtilityName(['f-text-10xl', '', '', '', '10xl'], optionsWithRanges)
  expect(consoleMock).toHaveBeenCalledOnce()
  expect(consoleMock).toHaveBeenLastCalledWith('[unocss-preset-fluid] (f-text-10xl) Trying to use predefined range 10xl but it is not defined in ranges.')
})

it('validate undefined range', () => {
  const consoleMock = vi.spyOn(console, 'warn').mockImplementation(() => undefined)

  validateUtilityName(['f-text-10xl', '', '', '', '10xl'], defaultOptions)
  expect(consoleMock).toHaveBeenCalledOnce()
  expect(consoleMock).toHaveBeenLastCalledWith('[unocss-preset-fluid] (f-text-10xl) Trying to use predefined range 10xl but no ranges are defined.')
})
