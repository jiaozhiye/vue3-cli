/*
 * @Author: 焦质晔
 * @Date: 2021-02-12 23:18:21
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-02-12 23:21:21
 */
import store from '@/store';

export const size = {
  computed: {
    currentSize(): string {
      return store.state.app.size || localStorage.getItem('size') || '';
    },
  },
};
