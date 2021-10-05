import { readFileSync } from 'fs';
import { join } from 'path';
import { createSvg2png } from '../../core';

// Test before load valid wasm
it('invalid wasm', (done) => {
  const wasm = join(__dirname, '../../LICENSE');
  const svg2png = createSvg2png(readFileSync(wasm));
  svg2png(`
    <svg viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
      <circle cx="5" cy="5" r="5" />
    </svg>
  `).catch(() => done());
});

it('success create svg2png', async () => {
  const wasm = join(__dirname, '../../svg2png_wasm_bg.wasm');
  const svg2png = createSvg2png(readFileSync(wasm));
  await svg2png(`
    <svg viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
      <circle cx="5" cy="5" r="5" />
    </svg>
  `);
});
