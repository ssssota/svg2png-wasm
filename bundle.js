// @ts-check
import { buildSync } from 'esbuild';
import { readFileSync } from 'fs';

/** @type {import('esbuild').BuildOptions} */
const commonOptions = {
  bundle: true,
  logLevel: 'error',
  entryPoints: ['lib/index.ts'],
  define: { 'import.meta.url': 'undefined' },
  banner: {
    js: `/**\n * @file ${readFileSync('./NOTICE', 'utf8')
      .trim()
      .split('\n')
      .join(' ')}\n */`,
  },
};

buildSync({
  ...commonOptions,
  format: 'cjs',
  outfile: 'dist/index.cjs',
});
buildSync({
  ...commonOptions,
  format: 'esm',
  outfile: 'dist/index.mjs',
});
buildSync({
  ...commonOptions,
  format: 'iife',
  minify: true,
  globalName: 'svg2pngWasm',
  outfile: 'dist/index.min.js',
});
