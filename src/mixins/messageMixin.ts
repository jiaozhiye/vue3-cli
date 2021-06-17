/*
 * @Author: 焦质晔
 * @Date: 2021-02-12 15:49:03
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-06-17 12:19:38
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
    ...mapActions('app', ['createElementSize', 'createThemeColor', 'refreshView', 'createLogout']),
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
      if (data.type === 'open') {
        this.$router.push(data.data);
      }
      if (data.type === 'logout') {
        window.location.href = '/login?redirect=' + this.$route.path;
      }
    },
  },
};
