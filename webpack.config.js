const path = require('path');
const WasmPackPlugin = require('@wasm-tool/wasm-pack-plugin');

module.exports = {
  mode: 'production',
  entry: './index.umd.ts',
  output: {
    path: path.resolve(__dirname, 'umd'),
    filename: 'index.js',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: 'ts-loader',
          options: {
            configFile: 'tsconfig.umd.json',
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: [
    new WasmPackPlugin({
      crateDirectory: path.resolve(__dirname, '.'),
    }),
  ],
  experiments: {
    syncWebAssembly: true,
  },
};
