import type { PresetFluidOptions } from 'unocss-preset-fluid';
/**
 * Calculates the slope value for fluid.
 *
 * @param min - The minimum value in the fluid range.
 * @param max - The maximum value in the fluid range.
 * @param config - Configuration object.
 * @returns The calculated slope value.
 */
export declare function getSlope(min: number, max: number, config: PresetFluidOptions): number;
/**
 * Calculates the intersection point for the fluid formula.
 *
 * @param min - The minimum value in the fluid range.
 * @param slope - The slope value calculated for the fluid.
 * @param minWidth - The minimum viewport width.
 * @returns The calculated intersection point.
 */
export declare function getIntersection(min: number, slope: number, minWidth: number): number;
/**
 * Calculates the slope percentage for the CSS 'clamp' function.
 *
 * @param min - The minimum value in the fluid range.
 * @param max - The maximum value in the fluid range.
 * @param config - Configuration object.
 * @returns The slope value as a percentage for use in the 'clamp' function.
 */
export declare function getSlopePercentage(min: number, max: number, config: PresetFluidOptions): number;
/**
 * Generates a CSS 'clamp' function value for fluid.
 *
 * @param min - The minimum value in the fluid range.
 * @param max - The maximum value in the fluid range.
 * @param config - Configuration object.
 * @returns A string representing the CSS 'clamp' function.
 */
export declare function getClamp(min: number, max: number, config: PresetFluidOptions): string;
/**
 * Generates a comment with the fluid values for the clamp CSS.
 *
 * @param match - The match array from the regex.
 * @param config - Configuration object.
 * @returns A string representing the comment for the 'clamp' function with fluid real values.
 */
export declare function getClampComment(match: RegExpMatchArray, config: PresetFluidOptions): string;
