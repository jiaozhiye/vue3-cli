<template>
  <el-color-picker
    v-model="theme"
    class="header__theme-picker"
    popper-class="theme-picker-dropdown"
    :offset="10"
    :predefine="themeColors"
    @change="changeThemeColor"
  />
</template>

<script>
/*
 * @Author: 焦质晔
 * @Date: 2020-04-23 19:44:29
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-06-05 11:53:05
 */
import { defineComponent } from 'vue';
import { mapActions } from 'vuex';

export default defineComponent({
  name: 'ThemePicker',
  data() {
    return {
      theme: localStorage.getItem('theme') || this.$store.state.app.theme,
      themeColors: [
        process.env.THEME_COLOR,
        '#1890ff',
        '#001e50',
        '#722ed1',
        '#11a983',
        '#13c2c2',
        '#52c41a',
        '#f5222d',
        '#fa541c',
        '#faad14',
      ],
    };
  },
  methods: {
    ...mapActions('app', ['emitThemeColor', 'createThemeColor']),
    changeThemeColor(newColor) {
      this.emitThemeColor(newColor);
      this.createThemeColor(newColor);
    },
  },
});
</script>

<style lang="scss">
.header__theme-picker {
  width: 26px;
  height: 26px;
  .el-color-picker__trigger {
    height: 100%;
    width: 100%;
    border: 0;
    outline: 0;
  }
}
.theme-picker-dropdown {
  .el-color-dropdown__link-btn {
    display: none;
  }
}
</style>
