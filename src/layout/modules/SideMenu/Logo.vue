<template>
  <router-link class="side-logo" to="/" :title="title">
    <img :src="imgUrl" :class="imgClas" />
  </router-link>
</template>

<script>
/*
 * @Author: 焦质晔
 * @Date: 2021-02-13 12:52:32
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-02-13 13:16:18
 */
import logo1 from './assets/logo1.svg';
import logo2 from './assets/logo2.svg';

export default {
  name: 'Logo',
  props: {
    title: {
      type: String,
      default: '',
    },
    collapsed: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isInitial: true,
    };
  },
  computed: {
    imgUrl() {
      return !this.collapsed ? logo1 : logo2;
    },
    imgClas() {
      const res = !this.collapsed ? 'img1' : 'img2';
      return this.isInitial ? `${res} none` : res;
    },
  },
  watch: {
    collapsed() {
      this.isInitial = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.side-logo {
  display: flex;
  align-items: center;
  height: 52px;
  padding-left: 15px;
  background-color: $logoBgColor;
  border-bottom: 1px solid $logoBgColor;
  overflow: hidden;
  .img1 {
    width: 170px;
    height: 30px;
    animation: show 0.3s ease both;
  }
  .img2 {
    width: 30px;
    height: 30px;
    animation: hide 0.3s ease both;
  }
  .none {
    animation: none;
  }
}
@keyframes show {
  0% {
    opacity: 0;
    width: 30px;
  }
  100% {
    opacity: 1;
    width: 170px;
  }
}
@keyframes hide {
  0% {
    opacity: 0;
    width: 50px;
    height: 50px;
  }
  100% {
    opacity: 1;
    width: 30px;
    height: 30px;
  }
}
</style>
