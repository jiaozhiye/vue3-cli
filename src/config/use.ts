/*
 * @Author: 焦质晔
 * @Date: 2021-02-12 13:02:43
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-05-31 13:29:33
 */
import { App } from 'vue';
import i18n from '@/locale';
import router from '@/router';
import store from '@/store';
import directive from '@/directive';
import '@/router/permission';

import { SizeEnum } from '@/utils/types';

import QmDesign from '@jiaozhiye/qm-design';
import '@/assets/css/design-variables.scss';

import CustomComps from '../components';

export const use = <T extends App>(app: T): T => {
  return app
    .use(i18n)
    .use(store)
    .use(router)
    .use(directive)
    .use(QmDesign, {
      size: SizeEnum[store.state.app.size],
      zIndex: 1000,
    })
    .use(CustomComps);
};
