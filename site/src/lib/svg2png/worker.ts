import { createSvg2png, initialize } from 'svg2png-wasm';
import type { ConverterOptions, ConvertOptions, Svg2png } from 'svg2png-wasm';

console.log('worker initializing');
export type Svg2pngRequest =
  | {
      id: string;
      type: 'svg2png';
      svg: string;
      options?: ConvertOptions; // type importing will be error
    }
  | {
      type: 'initialize';
      wasm: Uint8Array;
      options?: ConverterOptions;
    };

export type Svg2pngResponse =
  | { id: string; type: 'success'; data: Uint8Array }
  | { id: string; type: 'error'; error: Error };

let svg2png: Svg2png | undefined;

self.addEventListener('message', (ev) => {
  const data = ev.data as Svg2pngRequest;
  if (typeof data !== 'object' || data == null) return;

  console.log(`worker ${data.type}`);

  switch (data.type) {
    case 'initialize':
      initialize(data.wasm).then(() => {
        svg2png = createSvg2png(data.options);
      });
      break;
    case 'svg2png':
      if (svg2png === undefined)
        self.postMessage({
          type: 'error',
          error: 'svg2png has not been initialized.',
        });
      else
        svg2png(data.svg, data.options)
          .then((res) =>
            self.postMessage({ id: data.id, type: 'success', data: res }),
          )
          .catch((e) =>
            self.postMessage({ id: data.id, type: 'error', error: `${e}` }),
          );
      break;
  }
});
