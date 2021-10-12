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
<script src="https://unpkg.com/svg2png-wasm@0.6.0"></script>

<!-- Or, latest -->
<script src="https://unpkg.com/svg2png-wasm"></script>
```

#### Deno

```ts
// @deno-types="https://unpkg.com/svg2png-wasm@0.6.0/index.d.ts";
export {
  createSvg2png,
  initialize,
  svg2png,
} from 'https://unpkg.com/svg2png-wasm@0.6.0';
```

### Example

#### Node.js

```js
import { svg2png, initialize } from 'svg2png-wasm';
// const { svg2png, initialize } = require('svg2png-wasm');
import { readFileSync, writeFileSync } from 'fs';

await initialize(
  readFileSync('./node_modules/svg2png-wasm/svg2png_wasm_bg.wasm'),
);

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

```js
import { createSvg2png } from 'svg2png-wasm/core';

const font = await fetch('./Roboto.ttf').then((res) => res.arrayBuffer());
const svg2png = createSvg2png({
  fonts: [
    // optional
    new Uint8Array(font), // require, If you use text in svg
  ],
});
/** @type {Uint8Array} */
const png = await svg2png(
  '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"> ... </svg>',
  {
    scale: 2, // optional
    width: 400, // optional
    height: 400, // optional
  },
);
document.getElementById('output').src = URL.createObjectURL(
  new Blob([png.buffer], { type: 'image/png' }),
);
```

Or, using a script tag in the browser and load from unpkg.

```html
<script src="https://unpkg.com/svg2png-wasm"></script>
<script>
  const font = await fetch('./Roboto.ttf').then((res) => res.arrayBuffer());
  /** @type {Uint8Array} */
  const png = await svg2pngWasm.svg2png(
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
export type ConverterOptions = {
  fonts?: Uint8Array[];
  defaultFontFamily?: DefaultFontFamily;
};
export type ConvertOptions = {
  scale?: number;
  width?: number;
  height?: number;
};
export type Svg2png = ((
  svg: string,
  options?: ConvertOptions,
) => Promise<Uint8Array>) & {
  dispose: () => void;
};
/**
 * Initialize WASM module
 * @param mod WebAssembly Module or WASM url
 */
export const initialize: (mod: Promise<InitInput> | InitInput) => Promise<void>;
/**
 * @param opts Converter options (e.g. font settings)
 * @returns svg2png converter
 */
export const createSvg2png: (opts?: ConverterOptions | undefined) => Svg2png;
export const svg2png: (
  svg: string,
  opts?: (ConverterOptions & ConvertOptions) | undefined,
) => Promise<Uint8Array>;
```

## Examples

- Use with Cloudflare Workers [ssssota/svg2png-worker](https://github.com/ssssota/svg2png-worker)
- Use with Deno Deploy [ssssota/svg2png-deno-deploy](https://github.com/ssssota/svg2png-deno-deploy)
- Or [test directory](./test/)

## 📄 LICENSE

MPL-2.0 License

## 🙋‍♂️ Contributing

WELCOME!
