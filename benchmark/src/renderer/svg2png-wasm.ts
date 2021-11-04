import { readFileSync } from 'fs';
import { initialize, svg2png } from 'svg2png-wasm';
import { Render } from './types';

const initPromise = initialize(readFileSync('../svg2png_wasm_bg.wasm'));

export const render: Render = (svg) => initPromise.then(() => svg2png(svg));
