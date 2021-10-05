// @ts-check
import { dirname, join } from 'node:path';
import { exit } from 'node:process';
import { fileURLToPath } from 'node:url';
import {
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import glob from 'glob';
import { svg2png } from '../../main/index.js';

/**
 * Remove(if exists) and Make dir
 * @param {string} dir - dirname
 */
const refreshDir = (dir) => {
  if (existsSync(dir)) rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir);
};

const main = async () => {
  // @ts-ignore
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const fontPaths = glob.sync(join(__dirname, 'data/**/*.@(ttf|otf)'));
  const svgs = glob.sync(join(__dirname, 'data/**/*.svg'));

  /** @type {import('../../main/index.js').DefaultFontFamily} */
  const defaultFontFamily = {
    sansSerifFamily: 'Roboto',
  };

  const fonts = fontPaths.map((path) => {
    console.log('[font]', path);
    return new Uint8Array(readFileSync(path));
  });

  refreshDir(join(__dirname, 'actual'));
  refreshDir(join(__dirname, 'diff'));

  await Promise.all(
    svgs.map(async (svgPath) => {
      console.log('[SVG]', svgPath);
      const png = await svg2png(readFileSync(svgPath, 'utf8'), {
        fonts,
        defaultFontFamily,
      });
      if (png == null) throw new Error('Invalid data');
      writeFileSync(
        svgPath.replace(/\/data\//g, '/actual/').replace(/\.svg$/i, '.png'),
        png,
      );
    }),
  );
};

main()
  .then(() => exit(0))
  .catch((error) => {
    console.error(error);
    exit(1);
  });
