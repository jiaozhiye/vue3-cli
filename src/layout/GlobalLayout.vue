<script lang="tsx">
/*
 * @Author: 焦质晔
 * @Date: 2021-02-13 11:05:12
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-03-23 18:01:19
 */
import { defineComponent } from 'vue';
import { JSXNode } from '@/utils/types';
import SideMenu from './modules/SideMenu';
import GlobalHeader from './modules/GlobalHeader';
import MenuFold from './modules/MenuFold';
import HeadNavBar from './modules/HeadNavBar';
import MultiTab from './modules/MultiTab';
import Breadcrumb from './modules/Breadcrumb';
import { currentSize } from '@/mixins/sizeMixin';
import config from '@/config';

export default defineComponent({
  name: 'GlobalLayout',
  mixins: [currentSize],
  data() {
    return {
      collapsed: !1,
    };
  },
  computed: {
    asideWidth(): string {
      return !this.collapsed ? '200px' : '64px';
    },
    headerCls(): Array<Record<string, boolean> | string> {
      return {
        [`app-layout__header`]: !0,
        [`app-layout__header-sm`]: this.$size === 'small',
        [`app-layout__header-lg`]: this.$size === 'large',
      };
    },
    containerCls(): Array<Record<string, boolean> | string> {
      return [`app-layout__container`, { [`bg-color`]: this.$route.meta.bgColor }];
    },
  },
  methods: {
    changeHandle(val): void {
      this.collapsed = val;
    },
  },
  render(): JSXNode {
    const { collapsed, asideWidth, headerCls, containerCls } = this;
    return (
      <el-container class="app-layout">
        <el-aside class="app-layout__sidebar" width={asideWidth}>
          <SideMenu collapsed={collapsed} />
        </el-aside>
        {/* width: 0 -> 解决 IE bug */}
        <el-container style={{ width: '0' }}>
          <el-header class={headerCls} height={null}>
            <GlobalHeader
              v-slots={{
                collapse: () => <MenuFold collapsed={collapsed} onChange={this.changeHandle} />,
                menu: () => <MultiTab />,
                action: () => <HeadNavBar />,
              }}
            />
          </el-header>
          <el-main class={containerCls}>
            {config.showBreadcrumb && <Breadcrumb />}
            <div class="route-view">{this.$slots.default()}</div>
            <div class="watermark"></div>
          </el-main>
        </el-container>
      </el-container>
    );
  },
});
</script>

<style lang="scss">
.app-layout {
  height: 100%;
  &__header {
    height: 52px;
  }
  &__sidebar {
    transition: width 0.3s ease;
    overflow: visible;
  }
  &__container {
    display: flex;
    flex-direction: column;
    padding: 0;
    position: relative;
    overflow-x: hidden;
    .route-view {
      flex: 1;
      padding: 10px 10px 0;
      box-sizing: border-box;
    }
    .watermark {
      z-index: 9;
      position: absolute;
      left: 0px;
      top: 0px;
      width: 100%;
      height: 100%;
      background-size: 332px;
      pointer-events: none;
      background-repeat: repeat;
      background-image: url(../assets/img/watermark.png);
    }
    &.bg-color {
      background-color: $backgroundColorSecondary;
    }
  }
  &__header-sm {
    height: 48px;
  }
  &__header-lg {
    height: 56px;
  }
}
</style>
