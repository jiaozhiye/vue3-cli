/**
 * @Author: 焦质晔
 * @Date: 2019-06-20 10:00:00
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-05-28 10:43:25
 */
'use strict';

const path = require('path');
const utils = require('./utils');
const webpack = require('webpack');
const config = require('../config');
const subEnv = require('../config/sub.env');
const VueLoaderPlugin = require('vue-loader').VueLoaderPlugin;
const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;
// 自定义主题
const ThemeColorReplacer = require('webpack-custom-theme');
const forElementUI = require('webpack-custom-theme/forElementUI');

// 创建子模块引用
const createModuleRemotes = () => {
  const result = {};
  // 规则：子模块: 子模块@域名:端口号/remoteEntry.js
  // dms: `dms@${subEnv.dms}/remoteEntry.js`
  Object.keys(subEnv).forEach((key) => (result[key] = `${key}@${subEnv[key]}/remoteEntry.js`));
  return result;
};

module.exports = {
  entry: {
    app: utils.resolve('src/index.ts'),
  },
  output: {
    path: config.build.assetsRoot,
    filename: 'js/[name].js',
    publicPath:
      process.env.NODE_ENV === 'production'
        ? config.build.assetsPublicPath
        : config.dev.assetsPublicPath,
  },
  resolve: {
    // 配置解析规则
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.vue', '.json'],
    alias: {
      vue$: 'vue/dist/vue.esm-bundler.js',
      '@': utils.resolve('src'),
      '@test': utils.resolve('src/modules/test'),
      '@common': utils.resolve('src/modules/common'),
    },
    fallback: {
      crypto: false,
      stream: false,
      buffer: false,
    },
  },
  experiments: {
    topLevelAwait: true,
  },
  module: {
    noParse: /^(vue|vuex|vue-router)$/,
    rules: [
      // vue
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          babelParserPlugins: ['jsx', 'classProperties', 'decorators-legacy'],
        },
      },
      // js jsx
      {
        test: /\.js(x)?$/,
        use: utils.jsLoaders(),
        exclude: /node_modules/,
        include: [utils.resolve('src')],
      },
      // ts tsx
      {
        test: /\.ts(x)?$/,
        use: utils.tsLoaders(),
        exclude: /node_modules/,
      },
      // do not base64-inline SVG
      {
        test: /\.(svg)(\?.*)?$/,
        type: 'asset/resource',
        generator: {
          filename: utils.assetsPath('img/[contenthash:8][ext][query]'),
        },
      },
      // images
      {
        test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 2 * 1024 * 1024, // 小于 2M 表现形式为 baser64；大于 2M 文件会被生成到输出到目标目录
          },
        },
        generator: {
          filename: utils.assetsPath('img/[contenthash:8][ext][query]'),
        },
      },
      // fonts
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 2 * 1024 * 1024,
          },
        },
        generator: {
          filename: utils.assetsPath('fonts/[contenthash:8][ext][query]'),
        },
      },
      // media
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 2 * 1024 * 1024,
          },
        },
        generator: {
          filename: utils.assetsPath('media/[contenthash:8][ext][query]'),
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.ENV_CONFIG': JSON.stringify(process.env.ENV_CONFIG),
      __VUE_OPTIONS_API__: JSON.stringify(true),
      __VUE_PROD_DEVTOOLS__: JSON.stringify(false),
    }),
    new VueLoaderPlugin(),
    new ThemeColorReplacer({
      fileName: utils.assetsPath('css/theme-colors.css'),
      matchColors: [
        ...forElementUI.getElementUISeries(config.primaryColor), // element-ui 主题色
        config.primaryColor, // 自定义主题色
      ],
      changeSelector: forElementUI.changeSelector,
      isJsUgly: process.env.NODE_ENV === 'production',
    }),
    new ModuleFederationPlugin({
      name: config.moduleName,
      remotes: createModuleRemotes(),
      shared: ['vue', 'vuex', 'vue-router'],
    }),
  ],
};
