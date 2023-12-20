import { afterEach, beforeEach, describe, expect, it, } from 'vitest';
import { includeChromeStore } from './main';
import { create } from 'zustand';
import { type ObjectType } from './helpers';

interface BearState {
  bears: number,
  cats: number,
  increase: (by: number) => void,
  increaseCats: (by: number) => void,
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
};

export const removeChrome = () => {
  //@ts-ignore
  global.chrome = undefined;
  mockedStorage = {}
};

describe('includeChromeStore', () => {
  beforeEach(() => {
    addChrome();
  });

  afterEach(() => {
    removeChrome();
  });

  it('check if store works', async () => {
    const excludeKeys = ["cats"];

    const useBearStore = create<BearState>()(
      includeChromeStore((set) => ({
        bears: 0,
        cats: 0,
        increase: (by) => set((state) => ({ bears: state.bears + by })),
        increaseCats: (by) => set((state) => ({ cats: state.cats + by })),
      }), excludeKeys)
    );

    expect(useBearStore.getState().bears).toEqual(0);
    useBearStore.getState().increase(1);
    useBearStore.getState().increaseCats(2);
    expect(useBearStore.getState().bears).toEqual(1);
    expect(useBearStore.getState().cats).toEqual(2);
    useBearStore.getState().increase(2);
    expect(useBearStore.getState().bears).toEqual(3);
    expect(await chrome.storage.local.get()).toEqual({ bears: 3 });
  })
});

