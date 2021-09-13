import init, {
  createConverter,
  InitInput,
  InitOutput,
} from '../pkg/svg2png_wasm';

let wasm: InitOutput | undefined;

export type DefaultFontFamily = {
  serifFamily?: string;
  sansSerifFamily?: string;
  cursiveFamily?: string;
  fantasyFamily?: string;
  monospaceFamily?: string;
};

export type ConvertOptions = {
  scale?: number;
  width?: number;
  height?: number;
  fonts?: Uint8Array[];
  defaultFontFamily?: DefaultFontFamily;
};

/**
 * @param mod WebAssembly Module or WASM url
 * @returns svg2png converter
 */
export const createSvg2png =
  (mod: Promise<InitInput> | InitInput) =>
  async (svg: string, opts?: ConvertOptions): Promise<Uint8Array> => {
    if (wasm === undefined) wasm = await init(await mod);
    const converter = createConverter(
      opts?.defaultFontFamily?.serifFamily,
      opts?.defaultFontFamily?.sansSerifFamily,
      opts?.defaultFontFamily?.cursiveFamily,
      opts?.defaultFontFamily?.fantasyFamily,
      opts?.defaultFontFamily?.monospaceFamily,
    );
    opts?.fonts?.forEach((f) => converter.registerFont(f));
    const result = converter.convert(
      svg,
      opts?.scale,
      opts?.width,
      opts?.height,
    );
    converter.free();
    if (result == null) throw new Error('Unexpected error');
    return result;
  };
