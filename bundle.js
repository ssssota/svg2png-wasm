// @ts-check
import { buildSync } from 'esbuild';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

/** @type {{version:string}} */
const { version } = JSON.parse(
  readFileSync(
    // @ts-ignore
    resolve(dirname(fileURLToPath(import.meta.url)), 'package.json'),
    'utf8',
  ),
);

/** @type {import('esbuild').BuildOptions} */
const commonOptions = {
  bundle: true,
  logLevel: 'error',
};

/** @type {import('esbuild').BuildOptions} */
const coreOptions = {
  ...commonOptions,
  entryPoints: ['lib/core.ts'],
  define: { 'import.meta.url': 'undefined' },
};

/** @type {import('esbuild').BuildOptions} */
const nodeOptions = {
  ...commonOptions,
  entryPoints: ['lib/main.ts'],
  platform: 'node',
};

// core modules
buildSync({
  ...coreOptions,
  format: 'cjs',
  outfile: 'core/index.cjs',
});
buildSync({
  ...coreOptions,
  format: 'esm',
  outfile: 'core/index.js',
});
buildSync({
  ...coreOptions,
  format: 'iife',
  minify: true,
  globalName: 'SVG2PNG_CORE',
  outfile: 'umd/index.js',
});

// node modules
buildSync({
  ...nodeOptions,
  format: 'cjs',
  outfile: 'main/index.cjs',
});
buildSync({
  ...nodeOptions,
  format: 'esm',
  outfile: 'main/index.js',
});

// unpkg modules
buildSync({
  ...commonOptions,
  entryPoints: ['lib/unpkg.ts'],
  format: 'iife',
  globalName: 'SVG2PNG',
  minify: true,
  outfile: 'unpkg/index.js',
  define: {
    'process.env.UNPKG_WASM_PATH': JSON.stringify(
      `https://unpkg.com/svg2png-wasm@${version}/svg2png_wasm_bg.wasm`,
    ),
  },
});
