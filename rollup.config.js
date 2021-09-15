import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import { defineConfig } from 'rollup';

const pkg = require('./package.json');

const importMetaReplacer = () =>
  replace({
    preventAssignment: true,
    values: { 'import.meta.url': undefined },
  });
const textEncDevReplacer = () =>
  replace({
    preventAssignment: true,
    values: {
      'new TextDecoder': `new (typeof TextDecoder === 'undefined' ? (0, module.require)('util').TextDecoder : TextDecoder)`,
      'new TextEncoder': `new (typeof TextEncoder === 'undefined' ? (0, module.require)('util').TextEncoder : TextEncoder)`,
    },
  });

export default defineConfig([
  {
    input: 'lib/main.ts',
    output: [
      {
        file: 'main/index.js',
        format: 'esm',
      },
      {
        file: 'main/index.cjs',
        format: 'cjs',
      },
    ],
    plugins: [
      commonjs(),
      nodeResolve(),
      textEncDevReplacer(),
      typescript({ rootDir: 'lib' }),
    ],
  },
  {
    input: 'lib/core.ts',
    output: [
      {
        file: 'core/index.cjs',
        format: 'cjs',
      },
      {
        file: 'umd/index.js',
        format: 'umd',
        name: 'SVG2PNG_CORE',
      },
      {
        file: 'core/index.js',
        format: 'esm',
      },
    ],
    plugins: [
      commonjs(),
      nodeResolve(),
      importMetaReplacer(),
      textEncDevReplacer(),
      typescript({ rootDir: 'lib' }),
    ],
  },
  {
    input: 'lib/unpkg.ts',
    output: {
      file: 'unpkg/index.js',
      format: 'umd',
      name: 'SVG2PNG',
    },
    plugins: [
      replace({
        preventAssignment: true,
        'process.env.UNPKG_WASM_PATH': JSON.stringify(
          `https://unpkg.com/svg2png-wasm@${pkg.version}/svg2png_wasm_bg.wasm`,
        ),
      }),
      commonjs(),
      nodeResolve(),
      textEncDevReplacer(),
      typescript({ rootDir: 'lib' }),
      terser(),
    ],
  },
]);
