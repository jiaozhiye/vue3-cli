<template>
  <div class="global-header">
    <div class="sub-box fl">
      <slot name="collapse"></slot>
    </div>
    <div class="sub-box fr">
      <slot name="action"></slot>
    </div>
    <div class="tab-menu">
      <slot name="menu"></slot>
    </div>
  </div>
</template>

<script>
/**
 * @Author: 焦质晔
 * @Date: 2019-06-20 10:00:00
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-02-12 23:26:13
 **/
export default {
  name: 'GlobalHeader',
};
</script>

<style lang="scss" scoped>
.global-header {
  height: 100%;
  margin: 0 -20px;
  background-color: #fff;
  border-bottom: 1px solid $borderColor;
  position: relative;
  z-index: 3;
  .tab-menu {
    width: calc(100% - 240px);
    position: absolute;
    left: 56px;
    bottom: -1px;
  }
  .sub-box {
    height: 100%;
  }
}
</style>
