/*
 * @Author: 焦质晔
 * @Date: 2020-05-14 19:27:24
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-02-12 22:04:01
 */
import i18n from '@/locale';

import enLocale from './en';
import zhLocale from './zh-cn';

const messages = {
  en: enLocale,
  [`zh-cn`]: zhLocale,
};

for (let key in messages) {
  i18n.global.mergeLocaleMessage(key, messages[key]);
}
