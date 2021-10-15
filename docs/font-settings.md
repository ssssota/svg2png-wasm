---
title: Font Settings
---

> If you want to use text in SVG, you need to check this section.

> We are aware that this API is not easy to understand and we will improve it, so please pay attention to future API changes.

WebAssembly is run in a sandbox for safety reasons. Therefore, WebAssembly does not have access to system information, for example, it cannot use the system fonts.

For this reason, svg2png-wasm passes the font externally when you want to use text in SVG.

### Example

```js
const robotoFont = await fetch('/assets/Roboto.ttf').then((res) =>
  res.arrayBuffer(),
);
const png = await svg2png(svgData, {
  fonts: [new Uint8Array(robotoFont)],
  defaultFontFamily: {
    sansSerifFamily: 'Roboto',
  },
});
```
