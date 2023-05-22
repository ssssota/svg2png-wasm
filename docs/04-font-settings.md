---
title: Font Settings
---

> If you want to use text in SVG, you need to check this section.

WebAssembly is run in a sandbox for safety reasons. Therefore, WebAssembly does not have access to system information, for example, it cannot use the system fonts.

For this reason, you must pass the fonts when you want to use text in SVG.

The first entry in the `fonts` field array will be the fallback font.

The `defaultFontFamily` field is used when the font is specified as `sans-serif`, `serif` etc.

### Example

```js
import { svg2png, createSvg2png } from 'svg2png-wasm';

// Prepare font data
const robotoFont = await fetch('/assets/Roboto.ttf').then((res) =>
  res.arrayBuffer(),
);

// convert directly
const png = await svg2png(svg, {
  fonts: [new Uint8Array(robotoFont)],
  defaultFontFamily: { sansSerifFamily: 'Roboto' },
  scale: 2,
});

// OR
// create font loaded svg2png
const fontLoadedSvg2png = createSvg2png({
  fonts: [new Uint8Array(robotoFont)],
  defaultFontFamily: { sansSerifFamily: 'Roboto' },
});
// convert
const png = await fontLoadedSvg2png(svg, { scale: 2 });
```
