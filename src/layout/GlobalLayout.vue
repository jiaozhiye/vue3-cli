<script lang="ts">
/**
 * @Author: 焦质晔
 * @Date: 2019-06-20 10:00:00
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-02-12 23:10:45
 */
import { defineComponent } from 'vue';
import SideMenu from './modules/SideMenu';
import GlobalHeader from './modules/GlobalHeader';
import MenuFold from './modules/MenuFold';
import HeadNavBar from './modules/HeadNavBar';
import MultiTab from './modules/MultiTab';
import Breadcrumb from './modules/Breadcrumb';

import { size } from '@/mixins/sizeMixin';
import config from '@/config';

export default defineComponent({
  name: 'GlobalLayout',
  mixins: [size],
  data() {
    return {
      collapsed: !1,
    };
  },
  computed: {
    asideWidth(): string {
      return !this.collapsed ? '200px' : '64px';
    },
    headerCls() {
      return {
        [`header`]: !0,
        [`header-sm`]: this.currentSize === 'small',
        [`header-lg`]: this.currentSize === 'large',
      };
    },
  },
  methods: {
    changeHandle(val): void {
      this.collapsed = val;
    },
  },
  render() {
    const { collapsed, asideWidth, headerCls, $route, $slots } = this;
    const containerCls = [`container`, { [`bg-color`]: $route.meta.bgColor }];
    return (
      <el-container id="app" class="layout">
        <el-aside class="sidebar" width={asideWidth}>
          <SideMenu collapsed={collapsed} />
        </el-aside>
        {/* width: 0 -> 解决 IE bug */}
        <el-container style={{ width: 0 }}>
          <el-header class={headerCls} height="">
            <GlobalHeader>
              <MenuFold slot="collapse" collapsed={collapsed} onChange={this.changeHandle} />
              <MultiTab slot="menu" />
              <HeadNavBar slot="action" />
            </GlobalHeader>
          </el-header>
          <el-main class={containerCls}>
            {config.showBreadcrumb && <Breadcrumb />}
            <div class="route-view">{$slots.default()}</div>
          </el-main>
        </el-container>
      </el-container>
    );
  },
});
</script>

<style lang="scss" scoped>
.layout {
  height: 100%;
  .header {
    height: 52px;
  }
  .sidebar {
    transition: width 0.3s ease;
    overflow: visible;
  }
  .container {
    display: flex;
    flex-direction: column;
    padding: 0;
    overflow-x: hidden;
    .route-view {
      flex: 1;
      padding: 10px 10px 0;
      box-sizing: border-box;
    }
    &.bg-color {
      background-color: $backgroundColorSecondary;
    }
  }
  .header-sm {
    height: 48px;
  }
  .header-lg {
    height: 56px;
  }
}
</style>
