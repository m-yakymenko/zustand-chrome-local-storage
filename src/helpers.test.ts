import { describe, expect, it } from "vitest";
import { checkIfChromeExist, excludeKeysAndFunctions } from "./helpers";
import { addChrome, removeChrome } from "./main.test";

describe("checkIfChromeExist", () => {
  it("check if chrome doesnt exist", () => {
    expect(() => checkIfChromeExist()).toThrowError();
  });

  it("check if chrome exist", () => {
    addChrome();
    expect(checkIfChromeExist()).toBe(true);
    removeChrome();
  });
});

describe("excludeKeysAndFunctions", () => {
  const inputObject = { a: 1, b: 2, c: 3 };

  it("should exclude specified keys from the object", () => {
    const keysToExclude = ["a", "c"];
    const result = excludeKeysAndFunctions(inputObject, keysToExclude);
    expect(result).toEqual({ b: 2 });
  });

  it("should return the same object if keysToExclude is undefined or empty", () => {
    expect(excludeKeysAndFunctions(inputObject, undefined)).toEqual(
      inputObject,
    );
    expect(excludeKeysAndFunctions(inputObject, [])).toEqual(inputObject);
  });

  it("should handle an empty object and return an empty object", () => {
    const result = excludeKeysAndFunctions({}, ["a", "b"]);
    expect(result).toEqual({});
  });

  it("check function excluding", () => {
    const result = excludeKeysAndFunctions({ ...inputObject, f: () => {} }, []);
    expect(result).toEqual(inputObject);
  });
});
