/*
 * @Author: 焦质晔
 * @Date: 2021-02-12 21:03:36
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-06-09 14:33:32
 */
import subEnv from '../../config/sub.env';

type IEnvCongig = Record<'dev' | 'tst' | 'uat' | 'pre' | 'prod', Partial<{ host: string }>>;

const env: string = process.env.ENV_CONFIG || 'prod';

const config: IEnvCongig = Object.assign({}, subEnv, {
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
});

export default Object.assign({}, config[env], subEnv);
