/*
 * @Author: 焦质晔
 * @Date: 2021-05-31 13:20:13
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-06-10 09:52:29
 */
import { ObjectDirective } from 'vue';
import { bind, unbind } from './lib';

export const FocusOutside: ObjectDirective = {
  mounted(el: HTMLElement, binding, vnode) {
    bind(el, binding.value);
  },
  unmounted(el: HTMLElement) {
    unbind(el);
  },
};
