import type { RequestHandler } from '@sveltejs/kit';
import { svg2pngWasm } from './_svg2png.wasm';

export const prerender = true;

export const get: RequestHandler = async () => ({
	body: svg2pngWasm,
	headers: { 'content-type': 'application/wasm' }
});
