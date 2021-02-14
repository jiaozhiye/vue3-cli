/*
 * @Author: 焦质晔
 * @Date: 2020-05-14 19:27:24
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-02-14 10:16:54
 */
import { mergeLocaleMessage } from '@/locale';

import enLocale from './en';
import zhLocale from './zh-cn';

const messages = {
  en: enLocale,
  [`zh-cn`]: zhLocale,
};

for (let key in messages) {
  mergeLocaleMessage(key, messages[key]);
}
