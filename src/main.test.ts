import { expect, test } from 'vitest'
import { checkIfChromeExist } from './helpers'

const addChrome = () => {
  global.chrome = {
    storage: {
      // @ts-ignore
      local: {
        get: async () => { throw new Error("Unimplemented.") }
      }
    }
  };
}

//@ts-ignore
const removeChrome = () => global.chrome = undefined;

test('check if chrome doesnt exist', () => {
  expect(() => checkIfChromeExist()).toThrowError()
})

test('check if chrome exist', () => {
  addChrome();
  expect(checkIfChromeExist()).toBe(true);
  removeChrome();
})
