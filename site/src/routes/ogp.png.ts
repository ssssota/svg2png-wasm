import type { RequestHandler } from '@sveltejs/kit';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { initialize, svg2png } from 'svg2png-wasm';
import { svg2pngWasm } from './svg2png.wasm';

const ogpSvg = readFileSync(resolve('static', 'ogp.svg'), 'utf8');

export const get: RequestHandler = async () => {
	await initialize(svg2pngWasm).catch(() => undefined);
	return {
		body: await svg2png(ogpSvg),
		headers: { 'content-type': 'image/png' }
	};
};
