/*
 * @Author: 焦质晔
 * @Date: 2021-02-12 21:03:36
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-02-14 15:07:01
 */
type IEnv<T> = Record<'dev' | 'tst' | 'uat' | 'pre' | 'prod', T>;

type IEnvItem = {
  host: string;
};

const config: IEnv<IEnvItem> = {
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

export default config[process.env.ENV_CONFIG] || config[`prod`];
