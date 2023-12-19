import type { PresetFluidOptions } from 'unocss-preset-fluid';
export declare function getRemMaxWidth(config: PresetFluidOptions): number;
export declare function getRemMinWidth(config: PresetFluidOptions): number;
export declare function toRem(value: number, config: PresetFluidOptions): number;
/**
 * Calculates the relative size based on the original viewport size and the new viewport size.
 * This allows you to extend the min and max sizes of the fluid layout keeping the proportions.
 * This function is used for the extendMinWidth and extendMaxWidth options.
 * The result of this value is used to calculate the min and max values in rem when the viewport are extended.
 * @param originalViewPortMin The original viewport min size.
 * @param originalMinSize The original min size.
 * @param originalMaxSize The original max size.
 * @param originalViewPortMax The original viewport max size.
 * @param newViewPortSize The new viewport size.
 * @returns The relative size.
 */
export declare function calculateRelativeSize(originalViewPortMin: number, originalMinSize: number, originalMaxSize: number, originalViewPortMax: number, newViewPortSize: number): number;
/**
 * Returns the min and max values in rem for the given match.
 */
export declare function extractRemBoundsFromMatch(match: RegExpMatchArray | string, config: PresetFluidOptions): {
    min: any;
    max: any;
};
