import { StateCreator, StoreMutatorIdentifier } from "zustand";
type ChromeStoreType = <T = unknown, Mps extends [StoreMutatorIdentifier, unknown][] = [], Mcs extends [StoreMutatorIdentifier, unknown][] = []>(f: StateCreator<T, Mps, Mcs>, keysToExclude?: string[]) => StateCreator<T, Mps, Mcs>;
export declare const includeChromeStore: ChromeStoreType;
export {};
