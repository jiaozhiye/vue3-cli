module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        corejs: 3,
        useBuiltIns: 'usage',
      },
    ],
  ],
  plugins: [
    '@vue/babel-plugin-jsx',
    '@babel/plugin-transform-runtime',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-syntax-dynamic-import',
  ],
};
