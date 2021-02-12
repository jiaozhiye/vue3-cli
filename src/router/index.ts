/*
 * @Author: 焦质晔
 * @Date: 2021-02-12 13:53:34
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-02-12 22:17:45
 */
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import config from '@/config';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('@test/pages/demo/index.vue'),
  },
  { path: '/:pathMatch(.*)*', redirect: '/404' },
];

const router = createRouter({
  history: createWebHistory(config.baseUrl),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
