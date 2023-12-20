import { StateCreator, StoreMutatorIdentifier } from 'zustand';
import { checkIfChromeExist, execludeKeys, getSuperObj } from './helpers';

type ChromeStoreType = <
  T = unknown,
  Mps extends [StoreMutatorIdentifier, unknown][] = [],
  Mcs extends [StoreMutatorIdentifier, unknown][] = [],
>(
  f: StateCreator<T, Mps, Mcs>,
  keysToExeclude?: string[],
) => StateCreator<T, Mps, Mcs>;

type ChromeImpl = <T = unknown>(
  f: StateCreator<T, [], []>,
  keysToExeclude?: string[],
) => StateCreator<T, [], []>;



const loadChromeStore_: ChromeImpl = (f, keysToExeclude) => (set, get, store) => {
  checkIfChromeExist();

  const saveInChromeExtentionStorage: typeof set = (...a) => {
    set(...a);
    chrome.storage.local.set(execludeKeys(getSuperObj(a as any), keysToExeclude));
  };

  store.setState = saveInChromeExtentionStorage;

  chrome.storage.local.get().then(obj => set(obj as any));

  return f(saveInChromeExtentionStorage, get, store);
};

export const loadChromeStore = loadChromeStore_ as unknown as ChromeStoreType;
