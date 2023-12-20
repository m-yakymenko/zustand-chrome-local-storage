export type ObjectType = Record<string, any>;

export const excludeKeysAndFunctions = (
  obj: ObjectType,
  keysToexclude: string[] | undefined,
): ObjectType => {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([key, value]) =>
        ![...(keysToexclude || [])].includes(key) &&
        typeof value !== "function",
    ),
  );
};

export const checkIfChromeExist = () => {
  try {
    return !!(chrome.storage && chrome.storage.local);
  } catch (error) {
    throw new Error(
      "Your extension environment doesn't have chrome.storage.local functionality",
    );
  }
};
