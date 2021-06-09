/*
 * @Author: 焦质晔
 * @Date: 2020-05-17 09:36:33
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-06-09 08:37:36
 */
export default {
  // webpackChunkName -> webpack 在打包编译时，生成的文件路径(名)，格式：模块名称/用例名称 service/spt1001
  routes: [
    {
      path: '/user-center',
      meta: { title: '个人中心' },
      component: () =>
        import(/* webpackChunkName: "common/userCenter" */ '@common/pages/userCenter'),
    },
  ],
  public: [],
};
