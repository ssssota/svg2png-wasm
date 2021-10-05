import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createSvg2png } from './core';

export type { ConvertOptions, DefaultFontFamily } from './core';

if (typeof window !== 'undefined')
  console.warn('Use `svg2png-wasm/core` module');

const dir =
  typeof __dirname === 'string'
    ? __dirname
    : dirname(fileURLToPath(import.meta.url));

export const svg2png = createSvg2png(
  new WebAssembly.Module(readFileSync(join(dir, '..', 'svg2png_wasm_bg.wasm'))),
);
