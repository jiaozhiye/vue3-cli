/*
 * @Author: 焦质晔
 * @Date: 2021-02-05 09:13:33
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-05-26 19:25:43
 */
import { createApp } from 'vue';
import { registerMicroApps } from 'qiankun';
import { use } from '@/config/use';
import App from './app';
import env from '../config/sub.env';

registerMicroApps(
  [
    {
      name: 'dms',
      entry: env[`dms`],
      container: '#container',
      activeRule: '/dms',
    },
  ],
  {
    beforeLoad: [
      (app) => {
        console.log('[LifeCycle] before load %c%s', 'color: green;', app.name);
        return Promise.resolve();
      },
    ],
    beforeMount: [
      (app) => {
        console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name);
        return Promise.resolve();
      },
    ],
    afterUnmount: [
      (app) => {
        console.log('[LifeCycle] after unmount %c%s', 'color: green;', app.name);
        return Promise.resolve();
      },
    ],
  }
);

const app = createApp(App);
use(app).mount('#app');
