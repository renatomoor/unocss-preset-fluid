import type { PresetFluidOptions } from 'unocss-preset-fluid';
export declare function buildSinglePropertyRule(match: RegExpMatchArray, config: PresetFluidOptions, property: string): "" | {
    [x: string]: string;
};
export declare function buildMultiplePropertiesRule(match: RegExpMatchArray, config: PresetFluidOptions, properties: string[]): {};
export declare function buildRule(name: string, properties: string | string[], config: PresetFluidOptions): (RegExp | ((match: RegExpMatchArray) => {}))[][];
export declare function buildRulesFromUtilities(config: PresetFluidOptions): (RegExp | ((match: RegExpMatchArray) => {}))[][];
