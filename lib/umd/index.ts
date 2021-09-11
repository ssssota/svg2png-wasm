import init, { createConverter, InitOutput } from '../../pkg-umd/svg2png_wasm';

let wasm: InitOutput | undefined;

export type ConvertOptions = {
  scale?: number;
  width?: number;
  height?: number;
  fonts?: Uint8Array[];
};

export const svg2png = async (svg: string, opts?: ConvertOptions) => {
  if (wasm === undefined) wasm = await init('./svg2png_wasm_bg.wasm');
  const converter = createConverter();
  opts?.fonts?.forEach(converter.registerFont);
  const result = converter.convert(svg, opts?.scale, opts?.width, opts?.height);
  converter.free();
  return result;
};
