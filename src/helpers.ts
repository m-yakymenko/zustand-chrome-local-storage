type ObjectType = Record<string, any>;

export const getSuperObj = (args: ObjectType[]) => args.reduce((acc, item) => ({ ...acc, ...item }), {} as ObjectType);

export const execludeKeys = (obj: ObjectType, keysToExeclude: string[] | undefined): ObjectType => {
  if (!keysToExeclude || keysToExeclude.length === 0) return obj;
  return Object.fromEntries(Object.entries(obj).filter(([key]) => !keysToExeclude.includes(key)));
};

export const checkIfChromeExist = () => {
  try {
    return !!(chrome.storage && chrome.storage.local)
  } catch (error) {
    throw new Error("Your extension environment doesn't have chrome.storage.local functionality");
  }
}
