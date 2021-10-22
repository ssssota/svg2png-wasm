import type { ConverterOptions, ConvertOptions } from 'svg2png-wasm';
import type { Svg2pngResponse } from './worker';
import Svg2pngWorker from './worker?worker';

export const createSvg2png = (
	options?: ConverterOptions
): ((
	svg: string,
	options?: ConvertOptions | undefined
) => Promise<Uint8Array>) & {
	dispose: () => void;
} => {
	const svg2pngWorker = new Svg2pngWorker();
	svg2pngWorker.postMessage({ type: 'initialize', options });

	// worker wrapper
	const svg2png = (
		svg: string,
		options?: ConvertOptions
	): Promise<Uint8Array> => {
		const id = `svg2png-${Math.random().toString(36)}`;
		let fulfilled: (value: Uint8Array | PromiseLike<Uint8Array>) => void;
		let rejected: (reason?: unknown) => void;

		const onMessage = (ev: MessageEvent) => {
			const response = ev.data as Svg2pngResponse;
			if (response.id !== id) return;
			switch (response.type) {
				case 'success':
					fulfilled(response.data);
					break;
				case 'error':
					rejected(response.error);
					break;
				default:
					rejected(response);
			}
		};
		const onMessageError = (e: MessageEvent) => rejected(e.data);
		const onError = (e: ErrorEvent) => rejected(e.error);
		return new Promise<Uint8Array>((resolve, reject) => {
			fulfilled = resolve;
			rejected = reject;
			svg2pngWorker.addEventListener('message', onMessage);
			svg2pngWorker.addEventListener('messageerror', onMessageError);
			svg2pngWorker.addEventListener('error', onError);

			svg2pngWorker.postMessage({
				id,
				type: 'svg2png',
				svg,
				options
			});
		}).finally(() => {
			svg2pngWorker.removeEventListener('message', onMessage);
			svg2pngWorker.removeEventListener('messageerror', onMessageError);
			svg2pngWorker.removeEventListener('error', onError);
		});
	};

	svg2png.dispose = () => svg2pngWorker.terminate();

	return svg2png;
};
