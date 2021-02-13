<template>
  <menu-tree
    ref="starMenu"
    class="aside__star-menu"
    :menu="navList"
    :sync-active="false"
    :collapsed="collapsed"
  />
</template>

<script>
/*
 * @Author: 焦质晔
 * @Date: 2021-02-13 16:34:05
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-02-13 16:54:16
 */
import { defineComponent } from 'vue';
import { mapState } from 'vuex';
import MenuTree from './menuTree';

export default defineComponent({
  name: 'StarMenu',
  components: {
    MenuTree,
  },
  props: {
    collapsed: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    this.starMenuRef = null;
    return {};
  },
  computed: {
    ...mapState('app', ['starMenuList', 'commonMenuList']),
    navList() {
      return [
        {
          title: this.$t('app.sidebar.usedNav'),
          key: null,
          icon: 'icon-flag-fill',
          children: this.commonMenuList,
        },
        {
          title: this.$t('app.sidebar.starNav'),
          key: null,
          icon: 'icon-star-fill',
          children: this.starMenuList,
        },
      ];
    },
    allMenuList() {
      const keys = [...this.starMenuList, ...this.commonMenuList].map((x) => x.key);
      return [...new Set(keys)];
    },
  },
  watch: {
    $route({ path }) {
      this.starMenuRef.activeIndex = path;
      if (!this.allMenuList.includes(path)) {
        this.starMenuRef.activeIndex = '';
      }
    },
  },
  mounted() {
    this.starMenuRef = this.$refs.starMenu;
  },
});
</script>
