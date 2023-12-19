export declare const REGEX_PATTERNS_NUMERIC_VALUES = "(?:--)?(-?\\d+)?(?:--)?(-?\\d+)?$";
export declare const REGEX_PATTERNS_RANGE_VALUES = "(?:--)?(-?\\d+)?(?:-([a-zA-Z0-9]+))?$";
export declare function extractValuesFromRegexMatch(match: RegExpMatchArray): {
    utility: string;
    matchMin: string;
    matchMax: string;
    predefinedRangeName: string;
};
