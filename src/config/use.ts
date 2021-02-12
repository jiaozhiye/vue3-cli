/*
 * @Author: 焦质晔
 * @Date: 2021-02-12 13:02:43
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-02-13 00:28:51
 */
import { App } from 'vue';
import i18n from '@/locale';
import router from '@/router';
import store from '@/store';

import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';

import CustomComps from '../components';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const APP_ENV = (function (env) {
  if (env === 'development') {
    // ...
  } else {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    console.log = console.warn = console.info = () => {};
  }
  return { env };
})(process.env.NODE_ENV);

export const use = <T extends App>(app: T): T => {
  return app.use(i18n).use(store).use(router).use(ElementPlus).use(CustomComps);
};
