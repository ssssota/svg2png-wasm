# svg2png wasm

SVG to PNG converter JS library made with WASM + [resvg](https://crates.io/crates/resvg).

See [resvg](https://github.com/RazrFalcon/resvg#svg-support) for SVG support status.

## Usage

### Installation

#### Node.js

```sh
npm install svg2png-wasm
# yarn add svg2png-wasm
# pnpm add svg2png-wasm
```

#### Browser

Using a script tag in the browser and load from unpkg.

```html
<script src="https://unpkg.com/svg2png-wasm@0.1.6/umd/index.js"></script>

<!-- Or, latest -->
<script src="https://unpkg.com/svg2png-wasm"></script>
```

### Example

#### Node.js

```js
import { svg2png } from 'svg2png-wasm';
// const { svg2png } from 'svg2png-wasm';
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
  },
);
writeFileSync('./output.png', png);
```

#### Browser

```js
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
writeFileSync('./output.png', png);
```

### API

```ts
function svg2png(
  svg: string,
  options?: {
    scale?: number;
    width?: number;
    height?: number;
    fonts?: Uint8Array[];
  },
): Promise<Uint8Array>;
```
