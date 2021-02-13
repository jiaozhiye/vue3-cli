/*
 * @Author: 焦质晔
 * @Date: 2021-02-12 23:18:21
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-02-14 00:19:36
 */
import store from '@/store';

export const currentSize = {
  computed: {
    $size(): string {
      return store.state.app.size || localStorage.getItem('size') || 'medium';
    },
  },
};
