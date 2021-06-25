/*
 * @Author: 焦质晔
 * @Date: 2021-02-12 21:38:08
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-06-25 19:47:43
 */
import { defineAsyncComponent } from 'vue';
import ErrorComponent from '@/pages/errorLoad';
import LoadingComponent from '@/pages/loading';

const getAsyncComponent = (loader) => {
  return defineAsyncComponent({
    loader,
    delay: 0,
    timeout: 30000,
    errorComponent: ErrorComponent,
    loadingComponent: LoadingComponent,
  });
};

export default {
  // webpackChunkName -> webpack 在打包编译时，生成的文件路径(名)，格式：模块名称/用例名称 service/spt1001
  routes: [
    {
      path: '/bjgl/cggl/dd',
      meta: { keepAlive: true },
      component: () => import(/* webpackChunkName: "test/demo" */ '@test/pages/demo/index'),
      // import 参数：子模块/导出得组件名
      // component: getAsyncComponent(() => import('dms/spa1001')),
    },
    {
      path: '/bjgl/cggl/rk',
      meta: { keepAlive: true },
      component: () => import(/* webpackChunkName: "test/demo" */ '@test/pages/demo/index'),
    },
    {
      path: '/bjgl/cggl/tk',
      meta: { keepAlive: true },
      component: () => import(/* webpackChunkName: "test/demo" */ '@test/pages/demo/index'),
    },
    {
      path: '/test',
      meta: { title: '测试页面', keepAlive: true },
      component: () => import(/* webpackChunkName: "test/demo" */ '@test/pages/demo/index'),
    },
  ],
  public: [],
};
