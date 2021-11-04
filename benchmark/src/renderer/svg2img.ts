import svg2img from 'svg2img';
import { Render } from './types';

export const render: Render = (svg) =>
  new Promise((resolve, reject) => {
    svg2img(svg, (err, buf: Buffer) => {
      if (err) return reject(err);
      return resolve(new Uint8Array(buf));
    });
  });
