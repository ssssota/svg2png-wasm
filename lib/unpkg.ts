import { createSvg2png } from './core';

export const svg2png = createSvg2png(
  fetch(process.env.UNPKG_WASM_PATH ?? '')
    .then(async (response) => response.arrayBuffer())
    .then((buf) => new WebAssembly.Module(buf)),
);
