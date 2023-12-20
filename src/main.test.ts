import { afterEach, beforeEach, describe, expect, it, } from 'vitest'
import { loadChromeStore } from './main';
import { create } from 'zustand'
import { type ObjectType } from './helpers';

interface BearState {
  bears: number
  increase: (by: number) => void
};

var mockedStorage: ObjectType = {};
export const addChrome = () => {

  global.chrome = {
    storage: {
      // @ts-ignore
      local: {
        get: async (args?) => mockedStorage,
        set: async (obj: ObjectType) => {
          Object.assign(mockedStorage, obj)
        }
      }
    }
  };
}

export const wait = (ms: number) => new Promise(res => setTimeout(res, ms))

export const removeChrome = () => {
  //@ts-ignore
  global.chrome = undefined;
  mockedStorage = {}
};

describe('loadChromeStore', () => {
  beforeEach(() => {
    addChrome();
  });

  afterEach(() => {
    removeChrome();
  });

  it('check if store works', async () => {
    const useBearStore = create<BearState>()(
      loadChromeStore((set) => ({
        bears: 0,
        increase: (by) => set((state) => ({ bears: state.bears + by })),
      }))
    )

    expect(useBearStore.getState().bears).toEqual(0);
    useBearStore.getState().increase(1);
    expect(useBearStore.getState().bears).toEqual(1);
    useBearStore.getState().increase(2);
    expect(useBearStore.getState().bears).toEqual(3);
    expect(await chrome.storage.local.get()).toEqual({ bears: 3 });
  })
});

