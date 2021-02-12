/*
 * @Author: 焦质晔
 * @Date: 2021-02-12 13:02:43
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-02-12 21:00:22
 */
import { App } from 'vue';
import i18n from '@/locale';
import router from '@/router';
import store from '@/store';

import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';

import CustomComps from '../components';

const APP_ENV = (function (env) {
  if (env === 'development') {
    // ...
  } else {
    console.log = console.warn = console.info = () => {};
  }
  return { env };
})(process.env.NODE_ENV);

export const use = <T extends App>(app: T): T => {
  return app.use(i18n).use(store).use(router).use(ElementPlus).use(CustomComps);
};
