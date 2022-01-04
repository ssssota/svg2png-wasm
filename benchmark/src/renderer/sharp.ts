import { createRenderer } from './types';
import sharp from 'sharp';

export default createRenderer({
  render: (svg: string) => sharp(Buffer.from(svg)).png().toBuffer(),
});
