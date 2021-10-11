import type { RequestHandler } from '@sveltejs/kit';
import { createSvg2png } from 'svg2png-wasm/core';
import { iconSvg } from './icon.svg';
import { svg2pngWasm } from './svg2png.wasm';

export const get: RequestHandler = async () => {
	const svg2png = createSvg2png(svg2pngWasm);

	return {
		body: await svg2png(iconSvg, { scale: 128 / 24 }),
		headers: { 'content-type': 'image/png' }
	};
};
