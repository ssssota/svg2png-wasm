import { readFileSync } from 'fs';
import { resolve } from 'path';

export const svg2pngWasm = new Uint8Array(
	readFileSync(resolve('..', 'svg2png_wasm_bg.wasm'))
);
