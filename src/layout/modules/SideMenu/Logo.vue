<template>
  <div class="logo">
    <router-link to="/" :title="title">
      <SvgIcon :icon-class="imgUrl" :class="imgClassName" />
    </router-link>
  </div>
</template>

<script>
/**
 * @Author: 焦质晔
 * @Date: 2019-06-20 10:00:00
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-02-12 23:34:11
 **/
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
      return !this.collapsed ? 'logo-right' : 'logo-left';
    },
    imgClassName() {
      const res = !this.collapsed ? 'img1' : 'img2';
      return this.isInitial ? `${res} none` : res;
    },
  },
  watch: {
    collapsed(val) {
      this.isInitial = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.logo {
  display: flex;
  align-items: center;
  height: 52px;
  border-bottom: 1px solid $logoBgColor;
  background-color: $logoBgColor;
  overflow: hidden;
  a {
    width: 100%;
    padding: 10px 0;
    svg {
      display: block;
      margin-left: 16px;
    }
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
