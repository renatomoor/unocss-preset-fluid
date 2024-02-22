import { describe, expect, it } from 'vitest'
import {
  calculateRelativeSize,
  extractRemBoundsFromMatch,
  getRemMaxWidth,
  getRemMinWidth,
  toRem,
} from '../src/utils/rem'
import type { PresetFluidOptions } from '../src/main'
import { defaultOptions } from '../src/main'
import {
  getClamp,
  getClampComment,
  getIntersection,
  getSlope,
  getSlopePercentage,
} from '../src/utils/clamp'
import { invertAndParseNumber } from '../src/utils/parsers'

const extendedOptions: PresetFluidOptions = {
  ...defaultOptions,
  extendMaxWidth: 1920,
  extendMinWidth: 300,
}

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

describe('rem utilities', () => {
  it('getRemMinWidth', () => {
    expect(getRemMinWidth(defaultOptions)).toBe(23.4375)

    // Extended options
    expect(getRemMinWidth(extendedOptions)).toBe(18.75)
  })

  it('getRemMaxWidth with extended options', () => {
    expect(getRemMaxWidth(defaultOptions)).toBe(90)

    // Extended options
    expect(getRemMaxWidth(extendedOptions)).toBe(120)
  })

  it('toRem', () => {
    expect(toRem(16, defaultOptions)).toBe(1)
  })

  it('toRem with different remBase', () => {
    expect(
      toRem(20, {
        defaultOptions,
        remBase: 20,
      }),
    ).toBe(1)
  })

  it('extract rem bounds from match positive values', () => {
    const { min, max } = extractRemBoundsFromMatch(['', '-16', '-32', '', ''], defaultOptions)
    expect(min).toBe(1)
    expect(max).toBe(2)
  })

  it('extract rem bounds from match negative values', () => {
    const { min, max } = extractRemBoundsFromMatch(['', '16', '32', '', ''], defaultOptions)
    expect(min).toBe(-1)
    expect(max).toBe(-2)
  })

  it('extract rem bounds from match mixed values', () => {
    const { min, max } = extractRemBoundsFromMatch(['', '-16', '32', '', ''], defaultOptions)
    expect(min).toBe(1)
    expect(max).toBe(-2)
  })
  it('extract rem bounds from match ranges', () => {
    Object.values(ranges).forEach(([min, max], index) => {
      const { min: extractedMin, max: extractedMax } = extractRemBoundsFromMatch(['', '', '', '', Object.keys(ranges)[index]], optionsWithRanges)
      expect(extractedMin).toBe(min / 16)
      expect(extractedMax).toBe(max / 16)
    })
  })
})

describe('clamp utilities', () => {
  it('slope', () => {
    expect(getSlope(10, 20, defaultOptions)).toBe(0.15023474178403756)
    expect(getSlope(25, 50, defaultOptions)).toBe(0.3755868544600939)
    expect(getSlope(0.5, 1, defaultOptions)).toBe(0.007511737089201878)

    // Extended options
    expect(getSlope(10, 20, extendedOptions)).toBe(0.09876543209876543)
    expect(getSlope(25, 50, extendedOptions)).toBe(0.24691358024691357)
    expect(getSlope(0.5, 1, extendedOptions)).toBe(0.0049382716049382715)
  })
  it('slope percentage', () => {
    expect(getSlopePercentage(10, 20, defaultOptions)).toBe(15.023474178403756)
    expect(getSlopePercentage(25, 50, defaultOptions)).toBe(37.558685446009385)
    expect(getSlopePercentage(0.5, 1, defaultOptions)).toBe(0.7511737089201878)

    // Extended options
    expect(getSlopePercentage(10, 20, extendedOptions)).toBe(9.876543209876543)
    expect(getSlopePercentage(25, 50, extendedOptions)).toBe(24.691358024691357)
    expect(getSlopePercentage(0.5, 1, extendedOptions)).toBe(0.49382716049382715)
  })

  it('intersection', () => {
    expect(getIntersection(3, 1, 1)).toBe(2)
    expect(getIntersection(343, 21, 14)).toBe(49)
  })

  it('clamp', () => {
    expect(getClamp(1, 10, defaultOptions)).toBe('clamp(1rem, -2.1690rem + 13.5211vw, 10rem)')
    expect(getClamp(-1, -10, defaultOptions)).toBe('clamp(-10rem, 2.1690rem + -13.5211vw, -1rem)')
    expect(getClamp(-1, 10, defaultOptions)).toBe('clamp(-1rem, -4.8732rem + 16.5258vw, 10rem)')
    expect(getClamp(1, -10, defaultOptions)).toBe('clamp(-10rem, 4.8732rem + -16.5258vw, 1rem)')

    // Extended options
    expect(getClamp(1, 10, extendedOptions)).toBe('clamp(1rem, -0.6667rem + 8.8889vw, 10rem)')
    expect(getClamp(-1, -10, extendedOptions)).toBe('clamp(-10rem, 0.6667rem + -8.8889vw, -1rem)')
    expect(getClamp(-1, 10, extendedOptions)).toBe('clamp(-1rem, -3.0370rem + 10.8642vw, 10rem)')
    expect(getClamp(1, -10, extendedOptions)).toBe('clamp(-10rem, 3.0370rem + -10.8642vw, 1rem)')
  })

  it('generate clamp comment should not appear', () => {
    expect(getClampComment(['f-w-16-32', '-16', '-32', '', ''], defaultOptions)).toBe('')
  })

  it('generate clamp comment 16px 32px', () => {
    expect(getClampComment(['f-w-16-32', '-16', '-32', '', ''], {
      ...defaultOptions,
      commentHelpers: true,
    })).toBe('/* 16px -> 32px */')
  })

  it('generate clamp comment -16px -32px', () => {
    expect(getClampComment(['f-w--16--32', '16', '32', '', ''], {
      ...defaultOptions,
      commentHelpers: true,
    })).toBe('/* -16px -> -32px */')
  })

  it('generate clamp comment 16px -32px', () => {
    expect(getClampComment(['f-w-16--32', '-16', '32', '', ''], {
      ...defaultOptions,
      commentHelpers: true,
    })).toBe('/* 16px -> -32px */')
  })

  it('generate clamp comment 1rem 2rem', () => {
    expect(getClampComment(['f-w-1-2', '-1', '-2', '', ''], {
      ...defaultOptions,
      commentHelpers: true,
      useRemByDefault: true,
    })).toBe('/* 1rem -> 2rem */')
  })
})

it('converts to signed int', () => {
  expect(invertAndParseNumber('1')).toBe(-1)
  expect(invertAndParseNumber('-1')).toBe(1)
  expect(invertAndParseNumber('-34')).toBe(34)
  expect(invertAndParseNumber('45')).toBe(-45)
})

it('calculate relative sizes with big viewport', () => {
  expect(calculateRelativeSize(
    375,
    20,
    45,
    1440,
    1920,
  )).toBe(56.267605633802816)
})

it('calculate relative sizes with small viewport', () => {
  expect(calculateRelativeSize(
    375,
    20,
    45,
    1440,
    320,
  )).toBe(18.708920187793428)
})
