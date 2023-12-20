# Zustand Chrome Local Storage

This library was created to simplify interaction with the `chrome.storage.local` API.

## Installation

```bash
npm install zustand-chrome-local-storage # or yarn add zustand-chrome-local-storage
```

## Usage

Instead of writitng a lot of specified codes for interactions with chrome storage in your Chrome extension, you could use `zustand` state manager to simplify your interactions.

```jsx
import { create } from "zustand";
import { includeChromeStore } from "zustand-chrome-local-storage";

const keysToExclude = ["cats"];

const useBearStore = create()(
  includeChromeStore(
    (set) => ({
      bears: 0,
      cats: 0,
      increase: (by) => set((state) => ({ bears: state.bears + by })),
    }),
    keysToExclude
  )
);
```

You can send `keysToExclude` as strings array, or don't send this parameter at all.<br/>
<i>The setters (like `increase` or any another function) will not store inside `chrome.storage.local`.</i>

## How exactly it works?

When you initialize storage this library write data from extension storage to zustand store

```ts
chrome.storage.local.get().then((obj) => {
  set(obj);
});
```

When you change your data this function calls:

```ts
const saveInChromeExtentionStorage: typeof set = (...a) => {
  set(...a);
  chrome.storage.local.set(
    excludeKeysAndFunctions(store.getState(), keysToExclude)
  );
};
```
