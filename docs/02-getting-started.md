---
title: Getting Started
---

You can use this library in Node.js, Deno and Browser.

### Node.js

```
npm install svg2png-wasm
# yarn add svg2png-wasm
# pnpm add svg2png-wasm
```

### Deno

```js
// Skypack
export * from 'https://cdn.skypack.dev/svg2png-wasm?dts';
// or
// esm.sh
export * from 'https://esm.sh/svg2png-wasm';
```

### Browser

You can use npm (like Node.js) to bundle it with bundler (Webpack, Vite, etc.).

It can also be used directly as follows.

```html
<script src="https://unpkg.com/svg2png-wasm"></script>
```

```js
const { initialize, svg2png, createSvg2png } = svg2pngWasm;
```
