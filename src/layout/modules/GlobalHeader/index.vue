<template>
  <div class="header-wrap">
    <div class="wrap__box fl">
      <slot name="collapse" />
    </div>
    <div class="wrap__box fr">
      <slot name="action" />
    </div>
    <div class="wrap__tab-menu">
      <slot name="menu" />
    </div>
  </div>
</template>

<script>
/*
 * @Author: 焦质晔
 * @Date: 2021-02-13 13:31:00
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-02-13 13:59:17
 */
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'GlobalHeader',
});
</script>

<style lang="scss">
.header-wrap {
  position: relative;
  height: 100%;
  margin: 0 -20px;
  background-color: #fff;
  border-bottom: 1px solid $borderColor;
  box-sizing: border-box;
  z-index: 3;
  .wrap__tab-menu {
    width: calc(100% - 240px);
    position: absolute;
    left: 56px;
    bottom: -1px;
  }
  .wrap__box {
    height: 100%;
  }
}
</style>
