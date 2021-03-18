/*
 * @Author: 焦质晔
 * @Date: 2021-02-12 15:39:35
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-02-13 00:23:59
 */
import axios, { CancelTokenStatic } from 'axios';
import qs from 'qs';
import config from '@/config';
import store from '@/store';
import { getToken } from '@/utils/cookies';
import { notifyAction } from '@/utils';
import { t } from '@/locale';

type RequestHeader = {
  jwt: string;
  Authorization: string;
  lang: string;
  userAgent: string;
};

type Ipending = {
  u: string;
  f: () => void;
};

// 自定义扩展 header 请求头
const getConfigHeaders = (): RequestHeader => {
  return {
    jwt: getToken(), // token
    Authorization: getToken(), // token
    lang: store.state.app.lang, // 多语言
    userAgent: 'pc', // 设备
  };
};

// 取消 ajax 请求
const CancelToken: CancelTokenStatic = axios.CancelToken;
const pending: Array<Ipending> = [];

const removePending = (config): void => {
  for (let i = 0; i < pending.length; i++) {
    if (pending[i].u === `${config.url}&${config.method}`) {
      pending[i].f();
      pending.splice(i--, 1);
    }
  }
};

// 创建 axios 实例
const instance = axios.create({
  baseURL: config.baseUrl,
  timeout: 1000 * 20,
  withCredentials: true, // 跨域请求时是否需要使用凭证
  paramsSerializer: (params): string => {
    // 序列化 GET 请求参数 -> a: [1, 2] => a[0]=1&a[1]=2
    return qs.stringify(params, { arrayFormat: 'indices' });
  },
});

// 异常处理程序
const errorHandler = (error): Promise<any> => {
  const { status = '', statusText = '' } = error.response;
  const errortext = t('app.fetch.errorCode')[status] || statusText || t('app.fetch.errorText');
  !error.__CANCEL__ && notifyAction(errortext, 'error', 10);
  return Promise.reject(error);
};

// 请求拦截
instance.interceptors.request.use((config) => {
  // 取消相同的请求
  removePending(config);
  // 请求头信息，token 验证
  config.headers = {
    ...config.headers,
    ...getConfigHeaders(),
  };
  // 处理 IE 缓存
  config.params = {
    ...config.params,
    _t: +new Date().getTime(),
  };
  // 处理 cancelToken
  config.cancelToken = new CancelToken((c) => {
    if ((config as any).cancelRequest) {
      pending.push({ u: `${config.url}&${config.method}`, f: c });
    }
  });
  return config;
}, errorHandler);

// 响应拦截
instance.interceptors.response.use((response) => {
  const { config, data } = response;
  // 取消相同的请求
  removePending(config);
  // 请求异常提示信息
  if (data.code !== 200) {
    // token 过期，需要重新登录
    if (data.code === 40105) {
      store.dispatch('app/createLogout');
    }
    data.msg && notifyAction(data.msg, 'error', 10);
  }
  return data;
}, errorHandler);

export { getConfigHeaders };
export default instance;
