# <img src="./logo.svg" width="150px">

svg2png-wasm

[![GitHub Workflow Status (branch)](https://img.shields.io/github/workflow/status/ssssota/svg2png-wasm/Checks/main)](https://github.com/ssssota/svg2png-wasm/actions/workflows/checks.yml)
[![npm](https://img.shields.io/npm/v/svg2png-wasm)](https://npmjs.com/svg2png-wasm)
[![NPM](https://img.shields.io/npm/l/svg2png-wasm)](https://npmjs.com/svg2png-wasm)

SVG to PNG converter JS library made with WASM + [resvg](https://crates.io/crates/resvg).

See [resvg](https://github.com/RazrFalcon/resvg#svg-support) for SVG support status.

## 💻 Usage

### Installation

#### Node.js / Browser

```sh
npm install svg2png-wasm
# yarn add svg2png-wasm
# pnpm add svg2png-wasm
```

Or, using a script tag in the browser and load from unpkg.

```html
<script src="https://unpkg.com/svg2png-wasm@0.5.0/unpkg/index.js"></script>

<!-- Or, latest -->
<script src="https://unpkg.com/svg2png-wasm"></script>
```

#### Deno

```ts
export { createSvg2png } from 'https://unpkg.com/svg2png-wasm@0.5.0/core/index.js';
```

### Example

#### Node.js

```js
import { svg2png } from 'svg2png-wasm';
// const { svg2png } = require('svg2png-wasm');
import { readFileSync, writeFileSync } from 'fs';

/** @type {Uint8Array} */
const png = await svg2png(
  '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"> ... </svg>',
  {
    scale: 2, // optional
    width: 400, // optional
    height: 400, // optional
    fonts: [
      // optional
      readFileSync('./Roboto.ttf'), // require, If you use text in svg
    ],
    defaultFontFamily: {
      // optional
      sansSerif: 'Roboto',
    },
  },
);
writeFileSync('./output.png', png);
```

#### Browser

You should create `svg2png` with the `svg2png-wasm/core` module by specifying your own WASM.
(You can download the WASM from [Releases](https://github.com/ssssota/svg2png-wasm/releases) page and deploy to your custom assets directory!)

e.g.

```js
import { createSvg2png } from 'svg2png-wasm/core';

const svg2png = createSvg2png(
  'https://unpkg.com/svg2png-wasm/svg2png_wasm_bg.wasm',
);
const font = await fetch('./Roboto.ttf').then((res) => res.arrayBuffer());
/** @type {Uint8Array} */
const png = await svg2png(
  '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"> ... </svg>',
  {
    scale: 2, // optional
    width: 400, // optional
    height: 400, // optional
    fonts: [
      // optional
      new Uint8Array(font), // require, If you use text in svg
    ],
  },
);
document.getElementById('output').src = URL.createObjectURL(
  new Blob([png.buffer], { type: 'image/png' }),
);
```

Or, using a script tag in the browser and load from unpkg.

```html
<script src="https://unpkg.com/svg2png-wasm@0.4.3/unpkg/index.js"></script>
<script>
  const font = await fetch('./Roboto.ttf').then((res) => res.arrayBuffer());
  /** @type {Uint8Array} */
  const png = await SVG2PNG.svg2png(
    '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"> ... </svg>',
    {
      scale: 2, // optional
      width: 400, // optional
      height: 400, // optional
      fonts: [
        // optional
        new Uint8Array(font), // require, If you use text in svg
      ],
    },
  );
  document.getElementById('output').src = URL.createObjectURL(
    new Blob([png.buffer], { type: 'image/png' }),
  );
</script>
```

### API

#### `svg2png-wasm` module

```ts
export type DefaultFontFamily = {
  serifFamily?: string;
  sansSerifFamily?: string;
  cursiveFamily?: string;
  fantasyFamily?: string;
  monospaceFamily?: string;
};
export type ConvertOptions = {
  scale?: number;
  width?: number;
  height?: number;
  fonts?: Uint8Array[];
  defaultFontFamily?: DefaultFontFamily;
};
export type Svg2png = (
  svg: string,
  opts?: ConvertOptions,
) => Promise<Uint8Array>;
export const svg2png: Svg2png;
```

#### `svg2png-wasm/core` module

```ts
export type InitInput =
  | RequestInfo
  | URL
  | Response
  | BufferSource
  | WebAssembly.Module;
export type DefaultFontFamily = {
  serifFamily?: string;
  sansSerifFamily?: string;
  cursiveFamily?: string;
  fantasyFamily?: string;
  monospaceFamily?: string;
};
export type ConvertOptions = {
  scale?: number;
  width?: number;
  height?: number;
  fonts?: Uint8Array[];
  defaultFontFamily?: DefaultFontFamily;
};
export type Svg2png = (
  svg: string,
  opts?: ConvertOptions,
) => Promise<Uint8Array>;
/**
 * @param mod WebAssembly Module or WASM url
 * @returns svg2png converter
 */
export const createSvg2png: (mod: Promise<InitInput> | InitInput) => Svg2png;
```

## Examples

- Use with Cloudflare Workers [ssssota/svg2png-worker](https://github.com/ssssota/svg2png-worker)
- Use with Deno Deploy [ssssota/svg2png-deno-deploy](https://github.com/ssssota/svg2png-deno-deploy)
- Or [test directory](./test/)

## 📄 LICENSE

MPL-2.0 License

## 🙋‍♂️ Contributing

WELCOME!
