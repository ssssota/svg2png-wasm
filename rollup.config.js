import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';
import { defineConfig } from 'rollup';
const pkg = require('./package.json');

export default defineConfig([
  {
    input: 'lib/cjs/index.ts',
    output: {
      dir: 'cjs',
      format: 'cjs',
    },
    plugins: [
      commonjs(),
      nodeResolve(),
      typescript({ rootDir: 'lib/cjs', outDir: 'cjs' }),
    ],
  },
  {
    input: 'lib/cjs/index.ts',
    output: {
      dir: 'esm',
      format: 'esm',
    },
    plugins: [
      commonjs(),
      nodeResolve(),
      typescript({ rootDir: 'lib/cjs', outDir: 'esm' }),
    ],
  },
  {
    input: 'lib/umd/index.ts',
    output: {
      dir: 'umd',
      format: 'umd',
      name: 'SVG2PNG',
    },
    plugins: [
      replace({
        'process.env.SVG2PNG_WASM_URL': JSON.stringify(
          `https://unpkg.com/svg2png-wasm@${pkg.version}/umd/svg2png_wasm_bg.wasm`,
        ),
      }),
      commonjs(),
      nodeResolve(),
      typescript({ rootDir: 'lib/umd', outDir: 'umd' }),
    ],
  },
]);
