/*
 * @Author: 焦质晔
 * @Date: 2021-02-12 14:04:39
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-05-13 11:09:50
 */
import { defineComponent } from 'vue';
import { mapState, mapActions } from 'vuex';
import { RouterView } from 'vue-router';
import { changeLocale } from '@/locale';

import '@/assets/css/reset.scss';
import '@/assets/css/style.scss';
import '@/assets/css/iconfont.scss';
import '@/assets/css/element-ui.scss';

export default defineComponent({
  name: 'App',
  computed: {
    ...mapState('app', ['theme']),
  },
  created() {
    const localTheme = localStorage.getItem('theme') as string;
    if (localTheme && localTheme !== this.theme) {
      this.createThemeColor(localTheme);
    }
  },
  mounted() {
    window.addEventListener('message', this.messageEventHandle, false);
  },
  beforeUnmount() {
    window.removeEventListener('message', this.messageEventHandle);
  },
  methods: {
    ...mapActions('app', ['createElementSize', 'createThemeColor']),
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
    },
  },
  render() {
    return <RouterView />;
  },
});
