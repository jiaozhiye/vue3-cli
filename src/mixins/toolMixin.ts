/*
 * @Author: 焦质晔
 * @Date: 2021-02-12 21:29:31
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-06-13 10:31:22
 */
import { mapActions } from 'vuex';

export const appTool = {
  methods: {
    ...mapActions('app', ['openView', 'reloadView']),
  },
};
