import type { ConverterOptions, ConvertOptions, Svg2png } from 'svg2png-wasm';
import type { Svg2pngResponse } from './worker';
import Svg2pngWorker from './worker?worker';

export const createSvg2png = (options?: ConverterOptions): Svg2png => {
	const svg2pngWorker = new Svg2pngWorker();
	svg2pngWorker.postMessage({ type: 'initialize', options });

	// worker wrapper
	const svg2png = (
		svg: string,
		options?: ConvertOptions
	): Promise<Uint8Array> =>
		new Promise((resolve, reject) => {
			const id = `svg2png-${Math.random().toString(36)}`;
			svg2pngWorker.addEventListener('message', (ev: MessageEvent) => {
				const response = ev.data as Svg2pngResponse;
				if (response.id !== id) return;
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
			});
			svg2pngWorker.addEventListener('messageerror', (e) => {
				reject(e.data);
			});
			svg2pngWorker.addEventListener('error', (e) => {
				reject(e.error);
			});

			svg2pngWorker.postMessage({
				id,
				type: 'svg2png',
				svg,
				options
			});
		});

	svg2png.dispose = () => svg2pngWorker.terminate();

	return svg2png;
};
