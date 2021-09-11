const mod = import('../../pkg');

export type ConvertOptions = {
  scale?: number;
  width?: number;
  height?: number;
  fonts?: Uint8Array[];
};

export const svg2png = async (svg: string, opts?: ConvertOptions) => {
  const { createConverter } = await mod;
  const converter = createConverter();
  opts?.fonts?.forEach(converter.registerFont);
  const result = converter.convert(svg, opts?.scale, opts?.width, opts?.height);
  converter.free();
  return result;
};
