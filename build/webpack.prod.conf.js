/**
 * @Author: 焦质晔
 * @Date: 2019-06-20 10:00:00
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-06-24 19:40:57
 */
'use strict';

const path = require('path');
const utils = require('./utils');
const webpack = require('webpack');
const config = require('../config');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const safePostCssParser = require('postcss-safe-parser');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

process.env.NODE_ENV = 'production';

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  output: {
    filename: utils.assetsPath('js/[name].[contenthash:8].js'),
    chunkFilename: utils.assetsPath('js/[name].[contenthash:8].js'),
  },
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      usePostCSS: true,
      extract: true,
    }),
  },
  optimization: {
    moduleIds: 'named',
    chunkIds: 'named',
    minimize: true,
    minimizer: [
      new TerserPlugin({
        // cache: true,
        parallel: true,
        // sourceMap: config.build.productionSourceMap,
        terserOptions: {
          compress: {
            drop_console: true,
            drop_debugger: true,
          },
        },
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          parser: safePostCssParser,
          map: config.build.productionSourceMap,
        },
        cssProcessorPluginOptions: {
          preset: ['default', { minifyFontValues: { removeQuotes: false } }],
        },
      }),
    ],
    splitChunks: {
      cacheGroups: {
        vendors: {
          name: 'chunk-vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: 'initial',
        },
        common: {
          name: 'chunk-common',
          minChunks: 2,
          priority: -20,
          chunks: 'initial',
          reuseExistingChunk: true,
        },
        libs: {
          name: 'chunk-libs',
          test: (module) => {
            return /echarts|exceljs/.test(module.context);
          },
          priority: 10,
        },
      },
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: utils.assetsPath('css/[name].[contenthash:8].css'),
      chunkFilename: utils.assetsPath('css/[name].[contenthash:8].css'),
    }),
    new webpack.ids.HashedModuleIdsPlugin({
      hashDigest: 'hex',
    }),
    new HtmlWebpackPlugin({
      filename: config.build.index,
      template: 'public/index.html',
      favicon: 'public/favicon.ico',
      inject: true,
      minify: {
        removeComments: true,
      },
      templateParameters: {
        BASE_URL: config.build.assetsPublicPath + config.build.assetsSubDirectory,
        THEME_COLOR: config.primaryColor,
      },
    }),
    new Dotenv({
      path: utils.resolve('.env.prod'),
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*'],
      },
    ]),
    // clear dist resource before build
    new CleanWebpackPlugin(),
  ],
});

if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin');
  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      algorithm: 'gzip',
      test: new RegExp('\\.(' + config.build.productionGzipExtensions.join('|') + ')$'),
      threshold: 10240,
      minRatio: 0.8,
    })
  );
}

module.exports = webpackConfig;
