/*
 * @Author: 焦质晔
 * @Date: 2021-02-12 23:18:21
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-06-14 06:56:19
 */
import store from '@/store';
import { ComponentSize } from '@/utils/types';

export const currentSize = {
  computed: {
    $size(): ComponentSize {
      return store.state.app.size || localStorage.getItem('size') || 'medium';
    },
  },
};
