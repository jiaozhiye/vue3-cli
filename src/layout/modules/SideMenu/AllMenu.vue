<template>
  <div class="app-aside__all-menu">
    <div class="title" :class="{ selected: visible ? !0 : !1 }" @click.stop="clickHandle">
      <i class="el-icon-menu" />
      <span v-if="!collapsed" class="text">{{ $t('app.sidebar.allNavTitle') }}</span>
    </div>
    <div :class="['masker', poperShow]" :style="{ left: asideWidth }"></div>
    <div :style="{ left: asideWidth }" :class="['popper', poperShow]" @click.stop>
      <div class="container">
        <slot :visible="visible" />
      </div>
    </div>
  </div>
</template>

<script>
/*
 * @Author: 焦质晔
 * @Date: 2021-02-13 11:33:24
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-02-14 15:50:02
 */
import { defineComponent } from 'vue';
import addEventListener from 'add-dom-event-listener';

export default defineComponent({
  name: 'AllMenu',
  props: {
    collapsed: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    this.evHandler = null;
    return {
      visible: false,
    };
  },
  computed: {
    poperShow() {
      return this.visible ? 'show' : '';
    },
    asideWidth() {
      return !this.collapsed ? '200px' : '64px';
    },
  },
  mounted() {
    this.bindEvent();
  },
  beforeUnmount() {
    this.evHandler.remove();
  },
  methods: {
    clickHandle() {
      this.visible = !this.visible;
    },
    bindEvent() {
      this.evHandler = addEventListener(document, 'click', () => {
        this.visible = false;
      });
    },
    close() {
      this.visible = false;
    },
  },
});
</script>

<style lang="scss">
.app-aside__all-menu {
  height: 36px;
  background-color: $menuBg;
  .title {
    display: flex;
    align-items: center;
    height: 100%;
    padding-left: 20px;
    color: $menuText;
    line-height: 36px;
    cursor: pointer;
    &.selected,
    &:hover {
      background-color: $menuHover;
    }
    i {
      display: inline-block;
      margin-right: 5px;
      font-size: 16px;
      text-align: center;
      vertical-align: middle;
    }
  }
  .masker {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.65);
    z-index: -2;
    visibility: hidden;
    transition: all 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);
    transform-origin: 50% 50% 0px;
    opacity: 0;
    &.show {
      visibility: visible;
      opacity: 0.2;
    }
  }
  .popper {
    position: absolute;
    top: 0;
    width: 650px;
    height: 100%;
    background: $allMenuBgColor;
    z-index: -1;
    box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
    transform: translate3d(-100%, 0, 0);
    transition: all 0.4s cubic-bezier(0.7, 0.3, 0.1, 1);
    transform-origin: 50% 50% 0px;
    opacity: 0;
    visibility: hidden;
    &.show {
      transform: translate3d(0, 0, 0);
      opacity: 1;
      visibility: visible;
    }
    .container {
      height: 100%;
    }
  }
}
</style>
