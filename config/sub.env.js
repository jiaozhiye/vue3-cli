/*
 * @Author: 焦质晔
 * @Date: 2020-12-03 09:16:26
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-01-17 17:35:10
 */
const config = {
  dev: {
    // 格式：子模块: 域名+端口号
    part: 'http://localhost:9021'
  },
  tst: {
    part: '/'
  },
  uat: {
    part: '/'
  },
  pre: {
    part: '/'
  },
  prod: {
    part: 'http://localhost:9021'
  }
};

module.exports = config[process.env.ENV_CONFIG] || config[`prod`];
