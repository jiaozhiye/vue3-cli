<template>
  <el-dropdown
    class="header__size-select"
    trigger="click"
    placement="bottom-start"
    @command="languageChangeHandle"
  >
    <i class="iconfont icon-font-size" />
    <template v-slot:dropdown>
      <el-dropdown-menu class="size-select-dropdown">
        <el-dropdown-item class="large" :disabled="size === 'large'" command="large">
          {{ $t('app.sizeSelect.large') }}</el-dropdown-item
        >
        <el-dropdown-item class="medium" :disabled="size === 'medium'" command="medium">
          {{ $t('app.sizeSelect.medium') }}</el-dropdown-item
        >
        <el-dropdown-item class="small" :disabled="size === 'small'" command="small">
          {{ $t('app.sizeSelect.small') }}</el-dropdown-item
        >
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script>
/*
 * @Author: 焦质晔
 * @Date: 2020-04-30 15:17:48
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-06-09 14:09:02
 */
import { defineComponent } from 'vue';
import { mapState, mapActions } from 'vuex';

export default defineComponent({
  name: 'SizeSelect',
  computed: {
    ...mapState('app', ['size']),
  },
  methods: {
    ...mapActions('app', ['emitElementSize', 'createElementSize', 'refreshView']),
    languageChangeHandle(size) {
      this.emitElementSize(size);
      this.createElementSize({ ctx: this, size });
      // 重新加载路由页面
      setTimeout(() => this.refreshView({ path: this.$route.path }));
    },
  },
});
</script>

<style lang="scss">
.header__size-select {
  display: flex;
  width: 26px;
  height: 26px;
  align-items: center;
  justify-content: center;
  .icon-font-size {
    font-size: 20px;
    cursor: pointer;
  }
}
.size-select-dropdown {
  .large {
    font-size: $textSize + 2px;
  }
  .medium {
    font-size: $textSize;
  }
  .small {
    font-size: $textSize - 2px;
  }
}
</style>
