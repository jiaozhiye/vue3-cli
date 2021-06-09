/*
 * @Author: 焦质晔
 * @Date: 2021-02-12 20:11:18
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-06-08 13:27:18
 */
import router from '@/router';
import store from '@/store';
import config from '@/config';
import { getToken } from '@/utils/cookies';
import { notifyAction } from '@/utils';
import { t } from '@/locale';
import NProgress from 'nprogress'; // Progress 进度条
import 'nprogress/nprogress.css'; // Progress 进度条样式

// 设置 NProgress 样式
NProgress.configure({ showSpinner: false });

type INavItem = {
  key: string;
  title: string;
};

// 访问白名单
const whiteList: string[] = ['/login', '/public', '/wechat'];

// 权限白名单
const whiteAuth: string[] = ['/home', '/iframe', '/redirect', '/404', '/test'];

// 登录判断
export const isLogin = (): boolean => {
  if (process.env.MOCK_DATA === 'true') {
    return true;
  } else {
    return !!getToken();
  }
};

// iframe 判断
export const isIframe = (path: string): boolean => {
  return path.startsWith(whiteAuth[1]);
};

router.beforeEach(async (to, from, next) => {
  !isIframe(to.path) && NProgress.start();
  if (isLogin()) {
    if (to.path === '/login') {
      next({ path: '/' });
    } else {
      if (!store.state.app.navList.length) {
        // 通过 vuex 管理导航数据
        const bool: boolean = await store.dispatch('app/createNavList');
        bool ? next({ ...to, replace: true }) : next(false);
      } else {
        const tabNavList: INavItem[] = store.state.app.tabNavList;
        if (tabNavList.length >= config.maxCacheNum && !tabNavList.some((x) => x.key === to.path)) {
          notifyAction(t('app.information.maxCache', { total: config.maxCacheNum }), 'warning');
          return next(false);
        }
        const isAuth: boolean = await store.dispatch('app/checkAuthority', to.path);
        // 权限校验
        if (isAuth || [...whiteList, ...whiteAuth].some((x) => to.path.startsWith(x))) {
          next();
        } else {
          next({ path: '/404' });
        }
      }
    }
  } else {
    // 白名单，直接进入
    if (whiteList.some((x) => to.path.startsWith(x))) {
      next();
    } else {
      next({ path: '/login' });
    }
  }
});

router.afterEach((to) => {
  const title: string = (to.meta?.title as string) ?? '404';
  document.title = `${config.systemName}-${title}`;
  NProgress.done();
  if (whiteList.some((x) => to.path.startsWith(x)) || title === '404') return;
  if (!config.openBuryPoint) return;
  // 菜单埋点
  store.dispatch('app/createMenuRecord', { path: to.path, title });
});
