/*
 * @Author: 焦质晔
 * @Date: 2021-02-12 21:03:36
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-06-16 14:37:20
 */
import subEnv from '../../config/sub.env';

type IEnvCongig = Record<'dev' | 'tst' | 'uat' | 'pre' | 'prod', Partial<{ host: string }>>;

const env: string = process.env.ENV_CONFIG || 'prod';

const config: IEnvCongig = Object.assign({}, subEnv, {
  dev: {
    host: '/',
    domain: '',
  },
  tst: {
    host: '/',
    domain: '',
  },
  uat: {
    host: '/',
    domain: '',
  },
  pre: {
    host: '/',
    domain: '',
  },
  prod: {
    host: '/',
    domain: '',
  },
});

export default Object.assign({}, config[env], subEnv);
