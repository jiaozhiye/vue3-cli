/*
 * @Author: 焦质晔
 * @Date: 2021-02-12 13:47:03
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-02-12 21:14:06
 */
import * as types from '../types';
import config from '@/config';

// state
const state = {
  lang: localStorage.getItem('lang') || config.lang, // 多语言
  navList: [], // 导航菜单树
  menuList: [], // 可点击(三级)的子菜单列表
  tabNavList: [], // 导航选项卡列表
  starMenuList: [], // 收藏导航
  commonMenuList: [], // 常用导航
  keepAliveList: [], // 路由组件缓存列表
  iframeList: [], // iframe 列表
  dict: {}, // 数据字典
};

// actions
const actions = {};

// mutations
const mutations = {};

// getters
const getters = {};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
