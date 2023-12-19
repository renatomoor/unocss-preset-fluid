import type { Preset } from 'unocss'
import { buildRulesFromUtilities } from './utils/rules'

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

/**
 * @internal
 */
export const defaultOptions: Required<PresetFluidOptions> = {
  maxWidth: 1440,
  minWidth: 375,
  remBase: 16,
  useRemByDefault: false,
  extendMaxWidth: null,
  extendMinWidth: null,
  ranges: null,
  commentHelpers: false,
}

/**
 * @public
 */
export function presetFluid(options?: PresetFluidOptions): Preset {
  const config = Object.assign({}, defaultOptions, options)

  return {
    name: 'unocss-preset-fluid',
    rules: [
      ...buildRulesFromUtilities(config),
    ] as any,
  }
}
