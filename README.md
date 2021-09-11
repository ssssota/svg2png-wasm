# svg2png wasm

SVG to PNG converter JS library made with WASM + [resvg](https://crates.io/crates/resvg).

## Usage

### Installation

#### Node.js

```sh
npm install svg2png-wasm
# yarn add svg2png-wasm
# pnpm add svg2png-wasm
```

#### Browser

`🚧 WIP`

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
    scale: 2,     // optional
    width: 400,   // optional
    height: 400,  // optional
    fonts: [      // optional
      readFileSync('./Roboto.otf'), // require, If you use text in svg
    ],
  }
);
writeFileSync('./output.png', png);
```

#### Browser

`🚧 WIP`

### API

```ts
function svg2png(
  svg: string,
  options?: {
    scale?: number;
    width?: number;
    height?: number;
    fonts?: Uint8Array[];
  }
): Promise<Uint8Array>
```
