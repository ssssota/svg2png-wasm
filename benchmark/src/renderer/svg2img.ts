import svg2img from 'svg2img';
import { createRenderer } from './types';

export default createRenderer({
  render: (svg: string) => new Promise((resolve, reject) => {
    svg2img(svg, (err, buf: Buffer) => {
      if (err) return reject(err);
      return resolve(buf);
    });
  })
})
