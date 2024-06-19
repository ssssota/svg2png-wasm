import init, {
  Converter,
  createConverter,
  InitInput,
} from '../dist-wasm/svg2png_wasm';
import { ConverterOptions, ConvertOptions, Svg2png } from './types';

let initialized = false;

/**
 * Initialize WASM module
 * @param mod WebAssembly Module or WASM url
 */
export const initialize = async (
  mod: Promise<InitInput> | InitInput,
): Promise<void> => {
  if (initialized) {
    throw new Error(
      'Already initialized. The `initialize` function can be used only once.',
    );
  }
  await init(await mod);
  initialized = true;
};

/**
 * @param opts Converter options (e.g. font settings)
 * @returns svg2png converter
 */
export const createSvg2png = (opts?: ConverterOptions): Svg2png => {
  if (!initialized)
    throw new Error(
      'WASM has not been initialized. Call `initialize` function.',
    );
  let converter: Converter | undefined;
  converter = createConverter(
    opts?.defaultFontFamily?.serifFamily,
    opts?.defaultFontFamily?.sansSerifFamily,
    opts?.defaultFontFamily?.cursiveFamily,
    opts?.defaultFontFamily?.fantasyFamily,
    opts?.defaultFontFamily?.monospaceFamily,
  );
  for (const font of opts?.fonts ?? []) {
    converter.registerFont(font);
  }

  const svg2png = (options?: ConvertOptions) =>
    new Promise<Uint8Array>((resolve, reject) => {
      try {
        const result = converter?.convert(
          options?.scale,
          options?.width,
          options?.height,
          options?.backgroundColor,
        );
        if (result) resolve(result);
        else throw new Error('Converter already disposed.');
      } catch (e) {
        if (e instanceof Error) reject(e);
        else reject(new Error(`${e}`));
      }
    });
  svg2png.dispose = () => {
    converter?.free();
    converter = undefined;
  };
  svg2png.getLoadedFontFamilies = () => converter?.list_fonts() ?? [];
  svg2png.parse = (svg: string) => converter?.parse_tree(svg);
  svg2png.getBBox = () => converter?.getBBox();

  return svg2png;
};

export const svg2png = (
  opts?: ConverterOptions & ConvertOptions,
): Promise<Uint8Array> => {
  const convert = createSvg2png(opts);
  return convert(opts).finally(() => convert.dispose());
};

// types re-export
export { ConverterOptions, ConvertOptions, Svg2png };
