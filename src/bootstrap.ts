/*
 * @Author: 焦质晔
 * @Date: 2021-02-05 09:13:33
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-02-12 19:08:01
 */
import { createApp } from 'vue';
import { use } from '@/config/use';
import App from './app';

const app = createApp(App);
use(app).mount('#app');
