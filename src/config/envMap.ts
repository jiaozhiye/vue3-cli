/*
 * @Author: 焦质晔
 * @Date: 2021-02-12 21:03:36
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-03-22 17:28:17
 */
type IEnvCongig = Record<'dev' | 'tst' | 'uat' | 'pre' | 'prod', Partial<{ host: string }>>;

const config: IEnvCongig = {
  dev: {
    host: '/',
  },
  tst: {
    host: '/',
  },
  uat: {
    host: '/',
  },
  pre: {
    host: '/',
  },
  prod: {
    host: '/',
  },
};

export default config[process.env.ENV_CONFIG as string] || config[`prod`];
