/*
 * @Author: 焦质晔
 * @Date: 2020-12-03 09:16:26
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-05-17 14:45:05
 */
const config = {
  dev: {
    // 格式：子模块: 域名+端口号
    dms: 'http://localhost:9021',
    tds: 'http://localhost:9022',
  },
  tst: {
    dms: '/',
    tds: '/',
  },
  uat: {
    dms: '/',
    tds: '/',
  },
  pre: {
    dms: '/',
    tds: '/',
  },
  prod: {
    dms: 'http://localhost:9021',
    tds: 'http://localhost:9022',
  },
};

module.exports = config[process.env.ENV_CONFIG] || config[`prod`];
