/*
 * @Author: 焦质晔
 * @Date: 2020-05-17 09:36:33
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-02-13 15:18:52
 */
export default {
  // webpackChunkName -> webpack 在打包编译时，生成的文件路径(名)，格式：模块名称/用例名称 service/spt1001
  routes: [
    {
      path: '/user-center',
      meta: { title: '个人中心' },
      component: () => import('@common/pages/userCenter'),
    },
  ],
  // 注意：通过 iframe 形式加载的路由页面，路由路径必须以 /iframe 开头，
  // path 的值与 iframeRoutePath 相等
  iframes: [],
};
