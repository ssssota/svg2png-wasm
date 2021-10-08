import { createSvg2png } from 'svg2png-wasm/core';

console.log('worker initializing');

const svg2png = createSvg2png(fetch('/svg2png-wasm/svg2png.wasm'));
export type Svg2pngRequest = {
	svg: string;
	options?: Parameters<typeof svg2png>[1]; // type importing will be error
};

export type Svg2pngResponse =
	| { type: 'success'; data: Uint8Array }
	| { type: 'error'; error: Error };

self.addEventListener('message', (ev) => {
	console.log('worker converting');
	const data = ev.data as Svg2pngRequest;
	if (typeof data !== 'object' || data == null) return;

	svg2png(data.svg, data.options)
		.then((res) => self.postMessage({ type: 'success', data: res }))
		.catch((e) => self.postMessage({ type: 'error', error: e }));
});
