import { StateCreator, StoreMutatorIdentifier } from 'zustand'

type ChromeStoreType = <
  T = unknown,
  Mps extends [StoreMutatorIdentifier, unknown][] = [],
  Mcs extends [StoreMutatorIdentifier, unknown][] = [],
>(
  f: StateCreator<T, Mps, Mcs>,
  keysToExeclude?: string[],
) => StateCreator<T, Mps, Mcs>

type ChromeImpl = <T = unknown>(
  f: StateCreator<T, [], []>,
  keysToExeclude?: string[],
) => StateCreator<T, [], []>

const getSuperObj = (args: Record<string, any>[]) => args.reduce((acc, item) => ({ ...acc, ...item }), {} as Record<string, any>)
const execludeKeys = (obj: Record<string, any>, keysToExeclude: string[] | undefined): Record<string, any> => {
  if (!keysToExeclude || keysToExeclude.length === 0) return obj
  return Object.fromEntries(Object.entries(obj).filter(([key]) => !keysToExeclude.includes(key)))
}

const loadChromeStore_: ChromeImpl = (f, keysToExeclude) => (set, get, store) => {
  const saveInChromeExtentionStorage: typeof set = (...a) => {
    set(...a)
    chrome.storage.local.set(execludeKeys(getSuperObj(a as any), keysToExeclude))
  }
  store.setState = saveInChromeExtentionStorage
  chrome.storage.local.get().then(obj => set(obj as any))

  return f(saveInChromeExtentionStorage, get, store)
}

export const loadChromeStore = loadChromeStore_ as unknown as ChromeStoreType
