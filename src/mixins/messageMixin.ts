/*
 * @Author: 焦质晔
 * @Date: 2021-02-12 15:49:03
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-02-13 23:55:18
 */
import { mapActions } from 'vuex';
import { changeLocale } from '@/locale';

export const messageEvent = {
  mounted() {
    window.addEventListener('message', this.messageEventHandle, false);
  },
  beforeUnmount() {
    window.removeEventListener('message', this.messageEventHandle);
  },
  methods: {
    ...mapActions('app', ['createElementSize', 'createThemeColor', 'refreshView']),
    messageEventHandle({ data }): void {
      if (typeof data !== 'object') return;
      if (data.type === 'lang') {
        changeLocale(data.data);
      }
      if (data.type === 'size') {
        this.createElementSize({ ctx: this, size: data.data });
      }
      if (data.type === 'theme') {
        this.createThemeColor(data.data);
      }
      if (data.type === 'refresh') {
        this.refreshView({ path: this.$route.path });
      }
    },
  },
};
