/**
 * @Author: 焦质晔
 * @Date: 2019-06-20 10:00:00
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-06-30 10:32:17
 */
'use strict';
const path = require('path');
const subEnv = require('../config/sub.env');

// 配置常量
const HOST = 'localhost';
const PORT = 9020;

module.exports = {
  moduleName: 'app', // 模块名

  primaryColor: '#409eff', // 主题色

  dev: {
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: `//${HOST}:${PORT}/`,

    // 请求代理配置 -> can be modified
    proxyTable: {
      '/api': {
        target: 'http://10.133.2.84:30203',
        changeOrigin: true, // 支持跨域
        // secure: false, // 支持 https
        pathRewrite: {
          '^/api': '/api', // 连接开发环境，走网关的那种
          // '^/api/[a-zA-Z_]+/': '/' // 本地开发，不走网关，直接调本地服务
        },
      },
    },
    // 请求代理配置 END

    // Various Dev Server settings
    host: HOST,
    port: PORT,
    autoOpenBrowser: true,

    // Use Eslint
    useEslint: true,

    // Source Maps
    devtool: 'eval-cheap-source-map',
    cssSourceMap: true,
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath:
      process.env.ENV_CONFIG === 'gray' ? `${subEnv.host}/gray/` : `${subEnv.host}/`,

    // Source Maps
    productionSourceMap: false,
    devtool: 'source-map',

    // Gzip
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
  },
};
