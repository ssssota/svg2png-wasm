module.exports = {
  prettier: true,
  space: 2,
  ignores: ['test/**', 'main/**', 'core/**', 'pkg/**', 'umd/**', 'unpkg/**'],
  rules: {
    'import/extensions': 'off',
    'node/prefer-global/process': 'off',
    'unicorn/prefer-module': 'off',
    'unicorn/prefer-node-protocol': 'off',
  },
  orverrides: [
    {
      files: 'lib/core.ts',
      rules: {
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
      },
    },
  ],
};
