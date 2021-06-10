/*
 * @Author: 焦质晔
 * @Date: 2021-05-31 13:26:59
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-06-10 09:17:26
 */
import { createApp } from 'vue';
import { Permission } from './permission';
import { FocusOutside } from './focus-outside';

export default {
  install: (app: ReturnType<typeof createApp>): void => {
    app.directive('permission', Permission);
    app.directive('focus-outside', FocusOutside);
  },
};
