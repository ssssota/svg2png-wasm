import init, {
  Converter,
  createConverter,
  InitInput,
} from '../pkg/svg2png_wasm';

export type DefaultFontFamily = {
  serifFamily?: string;
  sansSerifFamily?: string;
  cursiveFamily?: string;
  fantasyFamily?: string;
  monospaceFamily?: string;
};

export type ConverterOptions = {
  fonts?: Uint8Array[];
  defaultFontFamily?: DefaultFontFamily;
};

export type ConvertOptions = {
  scale?: number;
  width?: number;
  height?: number;
};

let initialized = false;
export const initialize = async (
  mod: Promise<InitInput> | InitInput,
): Promise<void> => {
  if (initialized) {
    console.warn(
      'Already initialized. The `initialize` function can be used only once.',
    );
    return;
  }
  await init(await mod);
  initialized = true;
};

export interface Svg2png {
  (svg: string, options?: ConvertOptions): Promise<Uint8Array>;

  dispose(): void;
}

/**
 * @param mod WebAssembly Module or WASM url
 * @returns svg2png converter
 */
export const createSvg2png = (opts: ConverterOptions): Svg2png => {
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

  const svg2png = (svg: string, options?: ConvertOptions) =>
    new Promise<Uint8Array>((resolve, reject) => {
      try {
        const result = converter?.convert(
          svg,
          options?.scale,
          options?.width,
          options?.height,
        );
        if (result) resolve(result);
        else throw new Error('Converter already disposed.');
      } catch (e) {
        reject(e);
      }
    });
  svg2png.dispose = () => {
    converter?.free();
    converter = undefined;
  };

  return svg2png;
};
