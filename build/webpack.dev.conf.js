/**
 * @Author: 焦质晔
 * @Date: 2019-06-20 10:00:00
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-05-27 22:16:46
 */
'use strict';

const path = require('path');
const utils = require('./utils');
const webpack = require('webpack');
const config = require('../config');
const merge = require('webpack-merge');
const Dotenv = require('dotenv-webpack');
const baseWebpackConfig = require('./webpack.base.conf');
const ESLintPlugin = require('eslint-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

process.env.NODE_ENV = 'development';

const HOST = process.env.HOST || config.dev.host;
const PORT = process.env.PORT || config.dev.port;

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  target: 'web', // webpack5.x 加上之后热更新才有效果
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: false }),
  },
  devtool: config.dev.devtool,
  devServer: {
    /* 当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html */
    historyApiFallback: {
      disableDotRule: true,
      rewrites: [{ from: /.*/, to: '/index.html' }],
    },
    public: config.dev.assetsPublicPath,
    static: [
      {
        directory: path.resolve(__dirname, '../', config.dev.assetsSubDirectory),
        publicPath: config.dev.assetsPublicPath + config.dev.assetsSubDirectory,
        serveIndex: true,
        watch: true,
      },
    ],
    client: { overlay: false },
    host: HOST,
    port: PORT,
    hot: true, // 热加载
    open: config.dev.autoOpenBrowser,
    proxy: config.dev.proxyTable,
  },
  plugins: (config.dev.useEslint
    ? [new ESLintPlugin({ extensions: ['.ts', '.tsx', '.js', '.jsx', '.vue'] })]
    : []
  ).concat([
    new webpack.HotModuleReplacementPlugin(),
    new CaseSensitivePathsPlugin(),
    new Dotenv(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'public/index.html',
      favicon: 'public/favicon.ico',
      inject: true,
      templateParameters: {
        BASE_URL: config.dev.assetsPublicPath + config.dev.assetsSubDirectory,
      },
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*'],
      },
    ]),
  ]),
});

module.exports = devWebpackConfig;
