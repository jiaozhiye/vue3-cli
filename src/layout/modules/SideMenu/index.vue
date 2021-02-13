<template>
  <div :class="sideMenuCls">
    <logo :collapsed="collapsed" :title="title" />
    <all-menu :collapsed="collapsed">
      <MenuList :menu="navList" />
    </all-menu>
    <div class="scroll">
      <div class="inner">
        <star-menu :collapsed="collapsed" />
        <menu-tree class="aside-menu" :menu="navList" :collapsed="collapsed" />
      </div>
    </div>
  </div>
</template>

<script>
/*
 * @Author: 焦质晔
 * @Date: 2021-02-13 12:48:47
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-02-13 17:03:26
 */
import { defineComponent } from 'vue';
import { mapState } from 'vuex';
import { size } from '@/mixins/sizeMixin';
import config from '@/config';

import Logo from './Logo';
import AllMenu from './AllMenu';
import MenuList from './MenuList';
import StarMenu from './StarMenu';
import MenuTree from './menuTree';

export default defineComponent({
  name: 'SideMenu',
  components: {
    Logo,
    AllMenu,
    MenuList,
    StarMenu,
    MenuTree,
  },
  mixins: [size],
  props: {
    collapsed: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapState('app', ['navList']),
    sideMenuCls() {
      return {
        [`sidebar-wrap`]: !0,
        [`sidebar-wrap-sm`]: this.currentSize === 'small',
        [`sidebar-wrap-lg`]: this.currentSize === 'large',
      };
    },
    title() {
      return config.systemName;
    },
  },
});
</script>

<style lang="scss">
.sidebar-wrap {
  position: relative;
  height: 100%;
  background-color: $menuBg;
  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
  z-index: 5;
  .scroll {
    height: calc(100% - 52px - 36px);
    background-color: $menuBg;
    overflow-x: hidden;
    .inner {
      width: calc(100% + 17px);
      height: 100%;
      overflow-y: scroll;
    }
  }
  /* 侧栏菜单导航 */
  .el-menu {
    border: none;
    height: 100%;
    width: 100% !important;
    [class^='el-icon-'],
    [class^='iconfont'] {
      display: inline-block;
      margin-right: 5px;
      font-size: 16px;
      text-align: center;
      vertical-align: middle;
    }
    .el-menu-item {
      height: 36px;
      line-height: 36px;
      /* 文本溢出截断 */
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      * {
        vertical-align: baseline;
      }
    }
    .el-submenu {
      .el-submenu__title {
        height: 36px;
        line-height: 36px;
        &:hover {
          background-color: $menuHover !important;
        }
      }
      .el-menu-item {
        padding-right: $modulePadding !important;
        background-color: $subMenuBg !important;
        a {
          display: block;
          color: $menuText;
        }
        &:hover {
          background-color: $subMenuHover !important;
        }
        &.is-active {
          color: $subMenuActiveText !important;
          background-color: $primaryColor !important;
        }
      }
    }
  }
  /* 导航菜单，不包含 我的收藏/常用导航 */
  .aside-menu {
    .el-menu {
      .is-active {
        & > .el-submenu__title {
          color: $subMenuActiveText !important;
          i {
            color: $subMenuActiveText !important;
          }
        }
      }
    }
  }
  &-lg {
    .aside__logo {
      height: 56px;
    }
    .aside__all-menu {
      height: 40px;
      .title {
        line-height: 40px;
      }
    }
    .scroll {
      height: calc(100% - 56px - 40px);
    }
    .el-menu {
      .el-menu-item {
        height: 40px;
        line-height: 40px;
      }
      .el-submenu {
        .el-submenu__title {
          height: 40px;
          line-height: 40px;
        }
      }
    }
  }
  &-sm {
    .aside__logo {
      height: 48px;
    }
    .aside__all-menu {
      height: 32px;
      .title {
        line-height: 32px;
      }
    }
    .scroll {
      height: calc(100% - 48px - 32px);
    }
    .el-menu {
      .el-menu-item {
        height: 32px;
        line-height: 32px;
      }
      .el-submenu {
        .el-submenu__title {
          height: 32px;
          line-height: 32px;
        }
      }
    }
  }
}
.el-menu--vertical {
  .el-submenu__title,
  .el-menu-item {
    height: 36px;
    line-height: 36px;
  }
}
</style>
