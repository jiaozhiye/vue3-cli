/*
 * @Author: 焦质晔
 * @Date: 2021-02-12 13:14:12
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-02-12 13:55:03
 */
import { createI18n } from 'vue-i18n';

import enLocale from './lang/en';
import zhLocale from './lang/zh-cn';

const messages = {
  [enLocale.name]: {
    app: enLocale.app,
  },
  [zhLocale.name]: {
    app: zhLocale.app,
  },
};

const i18n = createI18n({
  locale: localStorage.getItem('lang') || 'zh-cn',
  fallbackLocale: 'zh-cn',
  messages,
});

const { t } = i18n.global;

export { t };
export default i18n;
