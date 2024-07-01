/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');
const path = require('node:path');
const createAliasSetting = require('@vue/eslint-config-airbnb/createAliasSetting');

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-airbnb',
    '@vue/eslint-config-prettier/skip-formatting',
  ],
  ignorePatterns: ['vite.config.ts'],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'import/prefer-default-export': 'off',
  },
  settings: {
    ...createAliasSetting({
      '@': `${path.resolve(__dirname, './src')}`,
    }),
  },
};
