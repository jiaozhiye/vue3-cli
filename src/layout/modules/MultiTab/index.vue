<script>
/*
 * @Author: 焦质晔
 * @Date: 2021-02-13 10:02:14
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-03-23 15:28:30
 */
import { defineComponent } from 'vue';
import { mapActions } from 'vuex';
import addEventListener from 'add-dom-event-listener';
import { uniqBy } from 'lodash-es';
import { currentSize } from '@/mixins/sizeMixin';

export default defineComponent({
  name: 'MultiTab',
  mixins: [currentSize],
  data() {
    // 本地路由
    const localRoutes = this.getLocalTabNav()
      .map((x) => this.getRouteByPath(x.key))
      .filter((x) => !!x);
    return {
      activeKey: this.$route.path,
      pages: uniqBy(
        [
          ...localRoutes,
          ...(this.$route.path === '/home'
            ? [this.$route]
            : [this.getRouteByPath('/home'), this.$route]),
        ],
        'path'
      ),
      visible: false,
      currentKey: '',
      position: { x: 0, y: 0 },
    };
  },
  computed: {
    $multiTab() {
      return this.$refs.multiTab.$el;
    },
    pathList() {
      return this.pages.map((x) => x.path);
    },
  },
  watch: {
    $route(val) {
      const { path } = val;
      if (path.startsWith('/redirect')) return;
      this.activeKey = path;
      this.addKeepAlive(val);
      if (!this.pathList.includes(this.activeKey)) {
        this.pages.push(val);
      }
    },
    pages: {
      handler(val) {
        this.createTabNavList(val.map((x) => ({ key: x.path, title: x.meta.title })));
        this.createIframeList(
          val
            .filter((x) => !!x.meta.iframeRoutePath)
            .map((x) => ({ key: x.path, value: x.meta.iframeRoutePath }))
        );
      },
      immediate: true,
    },
  },
  created() {
    this.addKeepAlive(this.$route);
  },
  mounted() {
    this.bindContextmenuEvent();
    this.bindDocumentEvent();
  },
  beforeUnmount() {
    this.contextmenuEvent.remove();
    this.clickEvent.remove();
  },
  methods: {
    ...mapActions('app', [
      'addKeepAliveCache',
      'removeKeepAliveCache',
      'createTabNavList',
      'createIframeList',
      'refreshView',
    ]),
    getRouteByPath(path) {
      return this.deepMapRoutes(this.$router.options.routes, path);
    },
    getRouteComponent(route) {
      return route.matched[route.matched.length - 1].components.default;
    },
    getLocalTabNav() {
      const localTabNav = localStorage.getItem('tab_nav');
      let result = [];
      if (localTabNav) {
        try {
          result = JSON.parse(localTabNav);
        } catch (e) {
          // ...
        }
      }
      return result;
    },
    addKeepAlive(route) {
      if (!route.meta.keepAlive) return;
      // 当前路由组件
      const current = this.getRouteComponent(route);
      // 添加组件缓存列表
      if (current && current.name) {
        this.addKeepAliveCache({ key: this.activeKey, value: current.name });
      }
    },
    removeTab(targetKey) {
      if (targetKey === '/home') return;
      this.pages = this.pages.filter((page) => page.path !== targetKey);
      // 移除组件缓存列表
      this.removeKeepAliveCache(targetKey);
      // 判断当前标签是否关闭，若关闭则跳转到最后一个还存在的标签页
      if (!this.pathList.includes(this.activeKey)) {
        this.locationChange(this.pathList[this.pathList.length - 1]);
      }
    },
    handleClick(tab) {
      this.locationChange(tab.paneName);
    },
    findCurTagIndex() {
      return this.pages.findIndex((x) => x.path === this.currentKey);
    },
    locationChange(val) {
      // const { query } = this.$route;
      this.activeKey = val;
      this.$router.push({ path: val, query: {} });
    },
    refreshTagHandle() {
      const { query } = this.$route;
      this.activeKey = this.currentKey;
      this.refreshView({ path: this.activeKey, query });
    },
    closeOtherTagHandle() {
      const index = this.findCurTagIndex();
      if (index === -1) return;
      this.pages.forEach(({ path }, i) => {
        if (i === index) return;
        this.removeTab(path);
      });
    },
    closeTagHandle(dir) {
      const index = this.findCurTagIndex();
      if (index === -1) return;
      let isClosed = false;
      this.pages.forEach(({ path }, i) => {
        if (dir === 'right' && i > index) {
          if (path === this.activeKey) {
            isClosed = true;
          }
          this.removeTab(path);
        }
        if (dir === 'left' && i < index) {
          if (path === this.activeKey) {
            isClosed = true;
          }
          this.removeTab(path);
        }
      });
      if (isClosed) {
        this.locationChange(this.currentKey);
      }
    },
    showContextMenu(key) {
      this.currentKey = key;
      this.visible = true;
    },
    closeContextMenu() {
      this.visible = false;
    },
    bindContextmenuEvent() {
      this.contextmenuEvent = addEventListener(this.$multiTab, 'contextmenu', (ev) => {
        ev.preventDefault();
        const classNames = [...ev.target.classList];
        if (classNames.includes('el-tabs__item')) {
          const path = ev.target.getAttribute('aria-controls').replace(/^pane-/, '');
          // if (this.activeKey !== path) {
          //   return this.closeContextMenu();
          // }
          this.position.x = ev.clientX || ev.pageX;
          this.position.y = ev.clientY || ev.pageY;
          this.showContextMenu(path);
        }
      });
    },
    bindDocumentEvent() {
      this.clickEvent = addEventListener(document, 'click', this.closeContextMenu);
    },
    deepMapRoutes(arr, mark) {
      let res = null;
      for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i].children)) {
          res = this.deepMapRoutes(arr[i].children, mark);
        }
        if (res) {
          return res;
        }
        if (arr[i].path === mark) {
          return arr[i];
        }
      }
      return res;
    },
    createPanelList() {
      return this.pages.map((x) => (
        <el-tab-pane
          key={x.path}
          name={x.path}
          label={x.meta.title}
          closable={!x.meta.affix && !!this.pages.length}
        />
      ));
    },
  },
  render() {
    const cls = [
      `header__multi-tab`,
      {
        [`multi-tab-sm`]: this.$size === 'small',
        [`multi-tab-lg`]: this.$size === 'large',
      },
    ];
    return (
      <div class={cls}>
        <el-tabs
          ref="multiTab"
          type="card"
          class="multi-wrap"
          modelValue={this.activeKey}
          onTabClick={this.handleClick}
          onTabRemove={this.removeTab}
        >
          {this.createPanelList()}
        </el-tabs>
        {this.visible && (
          <ul
            class="contextmenu el-dropdown-menu--small"
            style={{ left: `${this.position.x + 10}px`, top: `${this.position.y + 2}px` }}
          >
            <li class="el-dropdown-menu__item" onClick={this.refreshTagHandle}>
              {this.$t('app.multiTab.refresh')}
            </li>
            <li class="el-dropdown-menu__item" onClick={() => this.closeTagHandle('right')}>
              {this.$t('app.multiTab.closeRight')}
            </li>
            <li class="el-dropdown-menu__item" onClick={() => this.closeTagHandle('left')}>
              {this.$t('app.multiTab.closeLeft')}
            </li>
            {this.pages.length > 1 && (
              <li class="el-dropdown-menu__item" onClick={this.closeOtherTagHandle}>
                {this.$t('app.multiTab.closeOthers')}
              </li>
            )}
          </ul>
        )}
      </div>
    );
  },
});
</script>

<style lang="scss">
.header__multi-tab {
  .multi-wrap {
    position: relative;
    .el-tabs__header {
      margin: 0;
      border-bottom-color: transparent;
      .el-tabs__nav-prev,
      .el-tabs__nav-next {
        display: flex;
        align-items: center;
        height: calc(100% - 1px);
        padding: 0 4px;
        &:hover {
          background-color: $backgroundColorSecondary;
        }
      }
      .el-tabs__nav {
        border-color: $borderColor;
        .el-tabs__item {
          height: 38px;
          line-height: 38px;
          padding: 0 16px;
          font-size: $textSize;
          border-left-color: $borderColor;
          &.is-active {
            font-weight: 700;
            border-bottom-color: transparent;
          }
          .el-icon-close {
            line-height: 14px;
          }
        }
      }
    }
    .el-tabs__content {
      display: none !important;
    }
  }
  .contextmenu {
    list-style: none;
    min-width: 90px;
    position: fixed;
    left: 300px;
    top: 50px;
    background-color: #fff;
    padding: 6px 0;
    border: 1px solid $borderColorSecondary;
    border-radius: $borderRadius;
    box-shadow: $boxShadow;
    z-index: 9999;
  }
  &.multi-tab-lg {
    .multi-wrap {
      .el-tabs__item {
        padding: 0 18px !important;
        height: 42px !important;
        line-height: 42px !important;
      }
    }
  }
  &.multi-tab-sm {
    .multi-wrap {
      .el-tabs__item {
        padding: 0 14px !important;
        height: 34px !important;
        line-height: 34px !important;
      }
    }
  }
}
</style>
