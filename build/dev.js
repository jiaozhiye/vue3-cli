/**
 * @Author: 焦质晔
 * @Date: 2019-06-20 10:00:00
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-05-28 13:53:48
 */
'use strict';

const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./webpack.dev.conf');
const config = require('../config');

const HOST = process.env.HOST || config.dev.host;
const PORT = process.env.PORT || config.dev.port;

const compiler = Webpack(webpackConfig);
const devServerOptions = Object.assign({}, webpackConfig.devServer);
const server = new WebpackDevServer(compiler, devServerOptions);

server.listen(PORT, HOST, () => {
  console.log(`Starting server on http://${HOST}:${PORT}/`);
});
