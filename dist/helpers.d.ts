export type ObjectType = Record<string, any>;
export declare const excludeKeysAndFunctions: (obj: ObjectType, keysToexclude: string[] | undefined) => ObjectType;
export declare const checkIfChromeExist: () => boolean;
