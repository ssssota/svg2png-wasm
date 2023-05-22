import type { RequestHandler } from './$types';
import fs from 'node:fs';
import { initialize, svg2png } from 'svg2png-wasm';
import wasm from 'svg2png-wasm/svg2png_wasm_bg.wasm?u8';

const svgPromise = fs.readFileSync('../logo.svg', 'utf8');

export const GET: RequestHandler = async () => {
  await initialize(wasm).catch(() => undefined);
  const png = await svg2png(svgPromise);
  return new Response(png, {
    headers: { 'Content-Type': 'image/png' },
  });
};

export const prerender = true;
