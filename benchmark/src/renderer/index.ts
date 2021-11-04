import { render as sharp } from './sharp';
import { render as svg2img } from './svg2img';
import { render as svg2pngWasm } from './svg2png-wasm';
export * from './types';

export const rendererMap = {
  'svg2png-wasm': svg2pngWasm,
  sharp,
  svg2img,
} as const;
export type RendererName = keyof typeof rendererMap;
export default rendererMap;
