/*
 * @Author: 焦质晔
 * @Date: 2021-05-31 13:20:13
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-05-31 14:30:54
 */
import { ObjectDirective } from 'vue';

/**
 * @description 权限校验
 * @param {string} mark 权限标记
 * @returns true -> 有权限, false -> 没有权限
 */
const isAuth = (mark: string): boolean => {
  return true;
};

export const Permission: ObjectDirective = {
  mounted(el: HTMLElement, binding, vnode) {
    const permission: string = binding.value;
    const isShow = isAuth(permission);
    if (!isShow) {
      el.remove();
    }
  },
  unmounted() {},
};
