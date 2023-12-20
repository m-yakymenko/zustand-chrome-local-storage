# Zustand Chrome Local Storage

This library was created to simplify interaction with the `chrome.storage.local` API.

## Installation

```bash
npm install zustand-chrome-local-storage # or yarn add zustand-chrome-local-storage
```

## Usage

```jsx
import { create } from "zustand";
import { includeChromeStore } from "install zustand-chrome-local-storage";

const excludeKeys = ["cats"];

const useBearStore = create()(
  includeChromeStore(
    (set) => ({
      bears: 0,
      cats: 0,
      increase: (by) => set((state) => ({ bears: state.bears + by })),
    }),
    excludeKeys
  )
);
```

You can send `excludeKeys` as strings array, or don't send this parameter at all.<br/>
<i>The setters (like `increase` or any another function) will not store inside `chrome.storage.local`.</i>
