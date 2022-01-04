import { createRenderer } from './types';
import {
  renderAsync
} from '@resvg/resvg-js';

export default createRenderer({
  render: (svg: string) => renderAsync(svg, {
    font: {
      loadSystemFonts: false,
    },
  }),
})
