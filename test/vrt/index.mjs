// @ts-check
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'fs';
import { glob } from 'glob';
import { dirname, join } from 'path';
import { exit } from 'process';
import { fileURLToPath } from 'url';
import { createSvg2png, initialize } from '../../dist/index.mjs';

/**
 * Remove(if exists) and Make dir
 * @param {string} dir - dirname
 */
const refreshDir = (dir) => {
  if (existsSync(dir)) rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir);
};

/**
 * @param {(svg: string, options?: import('../../dist/index').ConvertOptions) => Promise<Uint8Array>} svg2png
 * @param {string} fileSuffix
 * @param {import('../../dist/index').ConvertOptions} options
 * @returns {(svgPath: string) => Promise<void>}
 */
const convert =
  (svg2png, fileSuffix, options = undefined) =>
  async (svgPath) => {
    const pngPath = svgPath
      .replace(/\/data\//g, '/vrt/actual/')
      .replace(/\.svg$/i, `${fileSuffix}.png`);
    console.log(`[convert] ${pngPath}`);
    const png = await svg2png(readFileSync(svgPath, 'utf8'), options);
    writeFileSync(pngPath, png);
  };

const main = async () => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const fontPaths = glob
    .sync(join(__dirname, '../data/**/*.@(ttf|otf)'))
    .sort();
  const svgs = glob.sync(join(__dirname, '../data/**/*.svg'));

  await initialize(readFileSync('./svg2png_wasm_bg.wasm'));

  /** @type {import('../../dist').DefaultFontFamily} */
  const defaultFontFamily = {
    sansSerifFamily: 'Roboto',
    serifFamily: 'Noto Serif',
  };

  const fonts = fontPaths.map((path) => {
    console.log('[font]', path);
    return new Uint8Array(readFileSync(path));
  });

  const svg2png = createSvg2png({
    fonts,
    defaultFontFamily,
  });

  refreshDir(join(__dirname, 'actual'));
  refreshDir(join(__dirname, 'diff'));

  await Promise.all([
    ...svgs.map(convert(svg2png, '.1x')),
    ...svgs.map(convert(svg2png, '.2x', { scale: 2 })),
    ...svgs.map(convert(svg2png, '.50w', { width: 50 })),
    ...svgs.map(convert(svg2png, '.30h', { height: 30 })),
    ...svgs.map(convert(svg2png, '.50w30h', { width: 50, height: 30 })),
    ...svgs.map(convert(svg2png, '.red', { backgroundColor: 'tomato' })),
    ...svgs.map(
      convert(svg2png, '.green', { backgroundColor: 'rgba(15,255,0,0.25)' }),
    ),
    ...svgs.map(convert(svg2png, '.blue', { backgroundColor: '#33f' })),
  ]);

  svg2png.dispose();
};

main()
  .then(() => exit(0))
  .catch((e) => {
    console.error(e);
    exit(1);
  });
