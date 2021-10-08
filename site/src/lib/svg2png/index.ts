import type { ConvertOptions } from 'svg2png-wasm/core';
import type { Svg2pngResponse } from './worker';
import Svg2pngWorker from './worker?worker';

// worker wrapper
export const svg2png = (
	svg: string,
	options?: ConvertOptions
): Promise<Uint8Array> =>
	new Promise((resolve, reject) => {
		const svg2pngWorker = new Svg2pngWorker();

		svg2pngWorker.addEventListener('message', (ev: MessageEvent) => {
			const response = ev.data as Svg2pngResponse;
			switch (response.type) {
				case 'success':
					resolve(response.data);
					break;
				case 'error':
					reject(response.error);
					break;
				default:
					reject(response);
			}
			svg2pngWorker.terminate();
		});
		svg2pngWorker.addEventListener('messageerror', (e) => {
			reject(e.data);
			svg2pngWorker.terminate();
		});
		svg2pngWorker.addEventListener('error', (e) => {
			reject(e.error);
			svg2pngWorker.terminate();
		});

		svg2pngWorker.postMessage({ svg, options });
	});
