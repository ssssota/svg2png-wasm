import { writeFileSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createSvg2png } from 'svg2png-wasm/core';

const dir = dirname(fileURLToPath(import.meta.url));
const svg2png = createSvg2png(
  new WebAssembly.Module(readFileSync(join(dir, '..', 'svg2png_wasm_bg.wasm'))),
);

svg2png(
  `
    <svg width="100px" height="100px" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <text x="0" y="180" font-size="180" font-family="Roboto Thin">
        A!
      </text>
    </svg>
  `,
  {
    fonts: [new Uint8Array(readFileSync('./Roboto-Thin.ttf'))],
  },
)
  .then((res) => {
    writeFileSync('./output.mjs.png', res);
  })
  .catch(console.error);
