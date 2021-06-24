/*
 * @Author: 焦质晔
 * @Date: 2020-12-03 09:16:26
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-06-24 19:43:46
 */
const config = {
  dev: {
    // 当前应用
    app: '//localhost:9020',
    // 格式：子模块: 域名+端口号
    dms: '//localhost:9021',
    tds: '//localhost:9022',
  },
  tst: {
    app: '',
    dms: '',
    tds: '',
  },
  uat: {
    app: '',
    dms: '',
    tds: '',
  },
  pre: {
    app: '',
    dms: '',
    tds: '',
  },
  prod: {
    app: '',
    dms: '//localhost:9021',
    tds: '//localhost:9022',
  },
};

module.exports = config[process.env.ENV_CONFIG] || config[`prod`];
