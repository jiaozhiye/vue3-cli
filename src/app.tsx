/*
 * @Author: 焦质晔
 * @Date: 2021-02-12 14:04:39
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-06-09 11:41:59
 */
import { defineComponent } from 'vue';
import { mapState, mapActions } from 'vuex';
import { RouterView } from 'vue-router';
import { messageEvent } from '@/mixins/messageMixin';
import { isIframe } from '@/router/permission';
import { JSXNode } from '@/utils/types';

import '@/assets/css/reset.scss';
import '@/assets/css/style.scss';
import '@/assets/css/iconfont.scss';
import '@/assets/css/element-ui.scss';

export default defineComponent({
  name: 'App',
  mixins: [messageEvent],
  computed: {
    ...mapState('app', ['theme']),
  },
  created() {
    const localTheme: string = localStorage.getItem('theme') || '';
    if (localTheme && localTheme !== this.theme) {
      this.createThemeColor(localTheme);
    }
  },
  mounted() {
    this.getDictData();
  },
  methods: {
    ...mapActions('app', ['createDictData', 'createThemeColor']),
    getDictData(): void {
      if (!isIframe(window.location.pathname)) return;
      this.createDictData();
    },
  },
  render(): JSXNode {
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
