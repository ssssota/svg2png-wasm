import type { Render } from './types';
import sharp from 'sharp';

export const render: Render = (svg) =>
  sharp(Buffer.from(svg))
    .png()
    .toBuffer()
    .then((buf) => new Uint8Array(buf));
