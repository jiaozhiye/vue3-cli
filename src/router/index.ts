/*
 * @Author: 焦质晔
 * @Date: 2021-02-12 13:53:34
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-03-23 15:27:29
 */
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import config from '@/config';
import { t } from '@/locale';
import moduleRoutes from './routes';

const BasicLayout = () => import('@/layout/BasicLayout.vue');
const Login = () => import('@/modules/common/pages/login/index.vue');
const Dashboard = () => import('@/pages/dashboard/index.vue');
const Redirect = () => import('@/pages/redirect/index.vue');
const Nomatch = () => import('@/pages/nomatch/index.vue');
const WeChatCb = () => import('@/modules/common/pages/login/weChatCb.vue');

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    meta: { title: t('app.login.title') },
    component: Login,
    hidden: true,
  },
  {
    path: '/wechat',
    meta: { title: t('app.login.weChat') },
    component: WeChatCb,
    hidden: true,
  },
  ...moduleRoutes.map((x) => x.iframes).flat(),
  {
    path: '/',
    meta: { title: t('app.global.home') },
    redirect: '/home',
    component: BasicLayout,
    children: [
      {
        path: '/home',
        meta: { title: t('app.global.dashboard'), affix: true, bgColor: true, keepAlive: false },
        component: Dashboard,
      },
      ...moduleRoutes.map((x) => x.routes).flat(),
      {
        path: '/redirect/:path(.*)',
        component: Redirect,
      },
      {
        path: '/404',
        meta: { title: '404' },
        component: Nomatch,
      },
    ],
  },
  { path: '/:pathMatch(.*)*', redirect: '/404', hidden: true },
];

const router = createRouter({
  history: createWebHistory(config.baseUrl),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
