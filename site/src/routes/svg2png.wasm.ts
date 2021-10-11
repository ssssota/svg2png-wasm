import type { RequestHandler } from '@sveltejs/kit';
import { readFileSync } from 'fs';
import { resolve } from 'path';

export const svg2pngWasm = new Uint8Array(
	readFileSync(resolve('..', 'svg2png_wasm_bg.wasm'))
);

export const get: RequestHandler = async () => ({
	body: svg2pngWasm,
	headers: { 'content-type': 'application/wasm' }
});
