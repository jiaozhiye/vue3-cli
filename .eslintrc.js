module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  // the ts-eslint recommended ruleset sets the parser so we need to set it back
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      tsx: true,
    },
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: ['@typescript-eslint'],
  rules: {
    // ts/js
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    // vue
    'vue/no-v-html': 'off',
    'vue/prop-name-casing': 'off',
    'vue/custom-event-name-casing': 'off',
    'vue/require-prop-types': 'off',
    'vue/require-default-prop': 'off',
  },
  globals: {
    h: true,
  },
};
