import type { RequestHandler } from '@sveltejs/kit';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { createSvg2png } from 'svg2png-wasm/core';
import { svg2pngWasm } from './_svg2png.wasm';

export const get: RequestHandler = async () => {
	const svg2png = createSvg2png(svg2pngWasm);
	const iconSvg = readFileSync(resolve('..', 'logo.svg'), 'utf8');

	return {
		body: await svg2png(iconSvg, { scale: 128 / 24 }),
		headers: { 'content-type': 'image/png' }
	};
};
