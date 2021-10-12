import { initialize, svg2png } from '../../dist/index.cjs';
import { readFileSync } from 'fs';

beforeAll(async () => {
  await initialize(readFileSync('./svg2png_wasm_bg.wasm'));
});

it('invalid svg', async () => {
  await expect(svg2png('')).rejects.toThrow(
    'SVG data parsing failed cause the document does not have a root node',
  );
});
