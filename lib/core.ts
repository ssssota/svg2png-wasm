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
  options?: ConvertOptions,
) => Promise<Uint8Array>;

/**
 * @param mod WebAssembly Module or WASM url
 * @returns svg2png converter
 */
export const createSvg2png =
  (mod: Promise<InitInput> | InitInput): Svg2png =>
  async (svg, options) => {
    let converter: Converter | undefined;
    try {
      if (wasm === undefined) wasm = await init(await mod);
      converter = createConverter(
        options?.defaultFontFamily?.serifFamily,
        options?.defaultFontFamily?.sansSerifFamily,
        options?.defaultFontFamily?.cursiveFamily,
        options?.defaultFontFamily?.fantasyFamily,
        options?.defaultFontFamily?.monospaceFamily,
      );
      for (const font of options?.fonts ?? []) {
        converter.registerFont(font);
      }

      const result = converter.convert(
        svg,
        options?.scale,
        options?.width,
        options?.height,
      );
      return result;
    } catch (error: unknown) {
      if (error instanceof Error) throw error;
      if (typeof error === 'string') throw new Error(error);
      throw new Error(String(error));
    } finally {
      converter?.free();
    }
  };
