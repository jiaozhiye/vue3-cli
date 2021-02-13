<template>
  <span
    class="header__menu-fold"
    :title="isCollapse ? $t('app.header.unfold') : $t('app.header.fold')"
    @click="clickHandler"
  >
    <i :class="[isCollapse ? `el-icon-s-unfold` : `el-icon-s-fold`]" />
  </span>
</template>

<script>
/*
 * @Author: 焦质晔
 * @Date: 2021-02-12 23:30:14
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-02-13 17:15:11
 */
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MenuFold',
  props: {
    collapsed: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isCollapse: this.collapsed,
    };
  },
  methods: {
    clickHandler() {
      this.isCollapse = !this.isCollapse;
      this.$emit('change', this.isCollapse);
    },
  },
});
</script>

<style lang="scss">
.header__menu-fold {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 15px;
  font-size: 24px;
  cursor: pointer;
  transition: color 0.3s ease;
  &:hover {
    background-color: rgba(0, 0, 0, 0.03);
  }
}
</style>
