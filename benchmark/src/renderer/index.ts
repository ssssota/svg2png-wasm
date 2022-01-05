import sharp from './sharp';
// import svg2img from './svg2img';
import svg2pngWasm from './svg2png-wasm';
import resvgjs from './resvg-js';
import resvg from './resvg';
import { Renderer } from './types';
export * from './types';

export const rendererMap: {
  [k: string]: Renderer;
} = {
  'svg2png-wasm': svg2pngWasm,
  'resvg-js': resvgjs,
  resvg,
  sharp,
  // disabled due to throwing
  // svg2img,
};
export type RendererName = keyof typeof rendererMap;
export default rendererMap;
