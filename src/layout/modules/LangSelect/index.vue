<template>
  <el-dropdown
    class="header__lang-select"
    trigger="click"
    placement="bottom-start"
    @command="languageChangeHandle"
  >
    <i class="iconfont icon-earth" />
    <template v-slot:dropdown>
      <el-dropdown-menu>
        <el-dropdown-item :disabled="lang === 'zh-cn'" command="zh-cn">
          CN&nbsp;&nbsp;简体中文
        </el-dropdown-item>
        <el-dropdown-item :disabled="lang === 'en'" command="en">
          US&nbsp;&nbsp;English
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script>
/*
 * @Author: 焦质晔
 * @Date: 2020-04-30 15:17:48
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-02-14 10:16:31
 */
import { defineComponent } from 'vue';
import { mapState, mapActions } from 'vuex';
import { changeLocale } from '@/locale';

export default defineComponent({
  name: 'LangSelect',
  computed: {
    ...mapState('app', ['lang']),
  },
  methods: {
    ...mapActions('app', ['setLanguage', 'refreshView']),
    languageChangeHandle(lang) {
      changeLocale(lang);
      this.setLanguage(lang);
      localStorage.setItem('lang', lang);
      // 浏览器刷新，重新获取数据
      // window.history.go(0);
      // 重新加载路由页面
      this.refreshView({ path: this.$route.path });
    },
  },
});
</script>

<style lang="scss">
.header__lang-select {
  display: flex;
  width: 26px;
  height: 26px;
  align-items: center;
  justify-content: center;
  .icon-earth {
    font-size: 20px;
    cursor: pointer;
  }
}
</style>
