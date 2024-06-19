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
  backgroundColor?: string;
};

export type Svg2png = ((options?: ConvertOptions) => Promise<Uint8Array>) & {
  getLoadedFontFamilies: () => string[];
  dispose: () => void;
  parse: (svg: string) => void;
  getBBox: () =>
    | {
        x: number;
        y: number;
        width: number;
        height: number;
      }
    | undefined;
};
