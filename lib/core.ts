import init, {
  Converter,
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

export type Svg2png = (
  svg: string,
  opts?: ConvertOptions,
) => Promise<Uint8Array>;

/**
 * @param mod WebAssembly Module or WASM url
 * @returns svg2png converter
 */
export const createSvg2png =
  (mod: Promise<InitInput> | InitInput): Svg2png =>
  async (svg, opts) => {
    let converter: Converter | undefined;
    try {
      if (wasm === undefined) wasm = await init(await mod);
      converter = createConverter(
        opts?.defaultFontFamily?.serifFamily,
        opts?.defaultFontFamily?.sansSerifFamily,
        opts?.defaultFontFamily?.cursiveFamily,
        opts?.defaultFontFamily?.fantasyFamily,
        opts?.defaultFontFamily?.monospaceFamily,
      );
      opts?.fonts?.forEach((f) => converter?.registerFont(f));
      const result = converter.convert(
        svg,
        opts?.scale,
        opts?.width,
        opts?.height,
      );
      return result;
    } catch (e) {
      if (e instanceof Error) throw e;
      if (typeof e === 'string') throw new Error(e);
      throw new Error(`${e}`);
    } finally {
      converter?.free();
    }
  };
