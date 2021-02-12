/*
 * @Author: 焦质晔
 * @Date: 2021-02-12 20:11:18
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-02-12 20:32:22
 */
import router from '@/router';
import store from '@/store';
import config from '@/config';
import { getToken } from '@/utils/cookies';
import { notifyAction } from '@/utils';
import { t } from '@/locale';
import NProgress from 'nprogress'; // Progress 进度条
import 'nprogress/nprogress.css'; // Progress 进度条样式

import { TabNavItem } from '@/utils/types';

// 设置 NProgress 样式
NProgress.configure({ showSpinner: false });

// 访问白名单
const whiteList: string[] = ['/login', '/wechat'];

// 权限白名单
const whiteAuth: string[] = [
  '/home',
  '/iframe',
  '/redirect',
  '/404',
  '/user-center',
  '/notice-center',
  '/test',
];

// 路由重定向
const redirect = (next, path): void => {
  path ? next({ path }) : next(false);
  NProgress.done();
};

// 登录判断
const isLogin = (): boolean => {
  if (process.env.MOCK_DATA === 'true') {
    return true;
  } else {
    return !!getToken();
  }
};

// iframe 判断
const isIframe = (path: string): boolean => {
  return path.startsWith(whiteAuth[1]);
};

router.beforeEach(async (to, from, next) => {
  !isIframe(to.path) && NProgress.start();
  if (isLogin()) {
    if (to.path === '/login') {
      redirect(next, '/');
    } else {
      if (!store.state.app.navList.length) {
        // 通过 vuex 管理导航数据
        const bool: boolean = await store.dispatch('app/createNavList');
        bool ? next({ ...to, replace: true }) : redirect(next, false);
      } else {
        const tabNavList: Array<TabNavItem> = store.state.app.tabNavList;
        if (tabNavList.length >= config.maxCacheNum && !tabNavList.some((x) => x.key === to.path)) {
          notifyAction(t('app.information.maxCache', { total: config.maxCacheNum }), 'warning');
          return redirect(next, false);
        }
        const isAuth: boolean = await store.dispatch('app/checkAuthority', to.path);
        // 权限校验
        if (isAuth || [...whiteList, ...whiteAuth].some((x) => to.path.startsWith(x))) {
          next();
        } else {
          redirect(next, '/404');
        }
      }
    }
  } else {
    // 没有登录，清空菜单数据
    store.dispatch('app/clearNavList');
    // 白名单，直接进入
    if (whiteList.includes(to.path)) {
      next();
    } else {
      process.env.ENV_CONFIG === 'gray'
        ? (window.location.href = '/login')
        : redirect(next, '/login');
    }
  }
});

router.afterEach((to) => {
  const title: string = to.meta?.title ?? '404';
  document.title = `${config.systemName}-${title}`;
  NProgress.done();
  if (whiteList.includes(to.path) || title === '404') return;
  if (!config.openBuryPoint) return;
  // 菜单埋点
  store.dispatch('app/createMenuRecord', { path: to.path, title });
});