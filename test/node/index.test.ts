import { beforeAll, it, expect, describe } from 'vitest';
import { initialize, svg2png, createSvg2png } from '../..';
import { readFileSync } from 'fs';
import { resolve } from 'path';

beforeAll(async () => {
  await initialize(readFileSync('./svg2png_wasm_bg.wasm'));
});

it('promise should be rejected when initialize twice', async () => {
  await expect(initialize('')).rejects.toThrow(
    'Already initialized. The `initialize` function can be used only once.',
  );
});

describe('svg2png', () => {
  it('should throw because invalid svg (blank string)', async () => {
    await expect(svg2png('')).rejects.toThrow(
      'SVG data parsing failed cause the document does not have a root node',
    );
  });

  it('should throw because invalid svg (missing width and height)', async () => {
    await expect(
      svg2png('<svg xmlns="http://www.w3.org/2000/svg"></svg>'),
    ).rejects.toThrow('Invalid width or height');
  });

  it('should convert because specify width and height', async () => {
    await expect(
      svg2png('<svg xmlns="http://www.w3.org/2000/svg"></svg>', {
        width: 1,
        height: 1,
      }),
    ).resolves.toBeInstanceOf(Uint8Array);
  });

  it('shoud convert with minimal svg', async () => {
    await expect(
      svg2png(
        '<svg width="1" height="1" xmlns="http://www.w3.org/2000/svg"></svg>',
      ),
    ).resolves.toBeInstanceOf(Uint8Array);
  });

  it('shoud throw because invalid width', async () => {
    await expect(
      svg2png(
        '<svg width="1" height="1" xmlns="http://www.w3.org/2000/svg"></svg>',
        { width: 0 },
      ),
    ).rejects.toThrow('Invalid width or height');
  });

  it('shoud throw because invalid scale', async () => {
    await expect(
      svg2png(
        '<svg width="1" height="1" xmlns="http://www.w3.org/2000/svg"></svg>',
        { scale: 0 },
      ),
    ).rejects.toThrow('Invalid width or height');
  });

  it('shoud convert with specified width because width have priority', async () => {
    const expected = await svg2png(
      '<svg width="1" height="1" xmlns="http://www.w3.org/2000/svg"></svg>',
      { width: 10 },
    );
    const actual = await svg2png(
      '<svg width="1" height="1" xmlns="http://www.w3.org/2000/svg"></svg>',
      { width: 10, scale: 100 },
    );
    expect(actual).toStrictEqual(expected);
  });
});

describe('createSvg2png', () => {
  it('no fonts', async () => {
    const convert = createSvg2png();
    expect(convert.getLoadedFontFamilies()).toStrictEqual([]);
    convert.dispose();
  });

  it('only roboto', async () => {
    const convert = createSvg2png({
      fonts: [
        new Uint8Array(
          readFileSync(resolve(__dirname, '../data/Roboto-Regular.ttf')),
        ),
      ],
    });
    expect(convert.getLoadedFontFamilies()).toStrictEqual(['Roboto']);
    convert.dispose();
  });
});
