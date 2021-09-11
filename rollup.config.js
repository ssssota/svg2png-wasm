import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { defineConfig } from 'rollup';
import { terser } from 'rollup-plugin-terser';

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
      terser(),
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
      terser(),
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
      commonjs(),
      nodeResolve(),
      typescript({ rootDir: 'lib/umd', outDir: 'umd' }),
      terser(),
    ],
  },
]);
