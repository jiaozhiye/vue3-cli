<template>
  <div class="app-header">
    <div class="app-header__wrap fl">
      <slot name="collapse" />
    </div>
    <div class="app-header__wrap fr">
      <slot name="action" />
    </div>
    <div class="app-header__tab-menu">
      <slot name="menu" />
    </div>
  </div>
</template>

<script>
/*
 * @Author: 焦质晔
 * @Date: 2021-02-13 13:31:00
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-02-14 16:02:07
 */
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'GlobalHeader',
});
</script>

<style lang="scss">
.app-header {
  position: relative;
  height: 100%;
  margin: 0 -20px;
  background-color: #fff;
  box-shadow: $boxShadow;
  box-sizing: border-box;
  z-index: 3;
  &__tab-menu {
    width: calc(100% - 240px);
    position: absolute;
    left: 56px;
    bottom: -1px;
  }
  &__wrap {
    height: 100%;
  }
}
</style>
