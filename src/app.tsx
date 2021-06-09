/*
 * @Author: 焦质晔
 * @Date: 2021-02-12 14:04:39
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-06-09 11:41:59
 */
import { defineComponent } from 'vue';
import { mapState, mapActions } from 'vuex';
import { RouterView } from 'vue-router';
import { changeLocale } from '@/locale';
import { isIframe } from './router/permission';

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
  updated() {
    this.getDictData();
  },
  beforeUnmount() {
    window.removeEventListener('message', this.messageEventHandle);
  },
  methods: {
    ...mapActions('app', [
      'createDictData',
      'createElementSize',
      'createThemeColor',
      'refreshView',
    ]),
    getDictData(): void {
      if (!isIframe(this.$route.path)) return;
      this.createDictData();
    },
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
  render() {
    if (isIframe(this.$route.path)) {
      return (
        <section class="iframe">
          <RouterView />
        </section>
      );
    }
    return <RouterView />;
  },
});
