---
title: Basic Usage
---

### 1. Prepare wasm

You will need to prepare a wasm module.

e.g.

```js
// Node.js
import { readFileSync } from 'fs';
const wasm = readFileSync('./node_modules/svg2png-wasm/svg2png_wasm_bg.wasm');
```

```js
// Deno (For example, fetch from unpkg CDN)
const wasm = await fetch(
  'https://unpkg.com/svg2png-wasm/svg2png_wasm_bg.wasm',
).then((res) => res.arrayBuffer());
```

```js
// browser (For example, we have a wasm file in the assets directory)
const wasm = await fetch('/assets/svg2png_wasm_bg.wasm').then((res) =>
  res.arrayBuffer(),
);
```

### 2. Initialize wasm

```js
import { initialize } from 'svg2png-wasm';
await initialize(wasm);
```

### 3. Convert SVG

```js
import { svg2png } from 'svg2png-wasm';
const png = await svg2png(svg);
```
