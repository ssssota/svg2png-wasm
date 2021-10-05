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
};
