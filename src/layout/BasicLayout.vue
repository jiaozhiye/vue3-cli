<script lang="tsx">
/**
 * @Author: 焦质晔
 * @Date: 2019-06-20 10:00:00
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-05-26 18:40:2110:52
 */
import { defineComponent, KeepAlive } from 'vue';
import { mapState, mapActions } from 'vuex';
import { RouterView } from 'vue-router';
import { JSXNode } from '@/utils/types';
import GlobalLayout from './GlobalLayout';
import config from '@/config';

export default defineComponent({
  name: 'BasicLayout',
  computed: {
    ...mapState('app', ['keepAliveList', 'iframeList']),
    key(): string {
      return this.$route.path;
    },
    cachedNames(): string[] {
      return this.keepAliveList.map((x) => x.value);
    },
    isKeepAlive(): boolean {
      return !!this.$route.meta.keepAlive;
    },
  },
  mounted() {
    // 获取数据字典值
    this.createDictData();
    // 获取收藏导航
    this.createStarMenuList();
    // 获取常用导航
    // this.createCommonMenuList();
  },
  methods: {
    ...mapActions('app', [
      'createDictData',
      'createStarMenuList',
      'createCommonMenuList',
      'refreshView',
    ]),
    createIframeView(): JSXNode[] {
      return this.iframeList.map((x) => (
        <div key={x.key} class="iframe-wrapper" v-show={this.key === x.key}>
          <iframe id={x.key} src={x.value} width="100%" height="100%" frameborder="0" />
        </div>
      ));
    },
  },
  render(): JSXNode {
    return (
      <GlobalLayout>
        <div class="route-view">
          <RouterView
            v-slots={{
              // 作用域插槽，结构参数 Component
              default: ({ Component: C }): JSXNode => (
                <KeepAlive include={this.cachedNames} max={config.maxCacheNum}>
                  <C key={this.key} />
                </KeepAlive>
              ),
            }}
          />
          {this.createIframeView()}
        </div>
      </GlobalLayout>
    );
  },
});
</script>

<style lang="scss">
.route-view {
  flex: 1;
  padding: 10px 10px 0;
  box-sizing: border-box;
}
/* iframe */
.iframe-wrapper {
  margin: -10px -10px 0;
  height: calc(100% + 10px);
}
/* fade-transition */
.fade-transition-enter-active {
  transition: all 0.3s ease-in;
}
.fade-transition-leave-active {
  transition: all 0.3s ease-out;
}
.fade-transition-enter,
.fade-transition-leave-to {
  opacity: 0;
}
/* fade-transform */
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.3s;
}
.fade-transform-enter {
  opacity: 0;
  transform: translateX(-10px);
}
.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(10px);
}
</style>
