import type { RequestHandler } from '@sveltejs/kit';
import { svg2png, initialize } from 'svg2png-wasm';
import { iconSvg } from './icon.svg';
import { svg2pngWasm } from './svg2png.wasm';

export const get: RequestHandler = async () => {
	await initialize(svg2pngWasm).catch(() => undefined);
	return {
		body: await svg2png(iconSvg, { scale: 128 / 24 }),
		headers: { 'content-type': 'image/png' }
	};
};
