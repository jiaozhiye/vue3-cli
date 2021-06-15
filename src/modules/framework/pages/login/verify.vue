<template>
  <div>
    <slide-verify
      ref="slideblock"
      :slider-text="text"
      :imgs="imgs"
      :accuracy="accuracy"
      @success="onSuccess"
      @again="onAgain"
      @fulfilled="onFulfilled"
      @fail="onFail"
      @refresh="onRefresh"
    />
  </div>
</template>

<script>
import img0 from './assets/img0.jpg';
import img1 from './assets/img1.jpg';
import img2 from './assets/img2.jpg';
import img3 from './assets/img3.jpg';
import img4 from './assets/img4.jpg';
import img5 from './assets/img5.jpg';

export default {
  data() {
    return {
      msg: '',
      text: '向右滑动 >>',
      imgs: [img0, img1, img2, img3, img4, img5],
      accuracy: 2,
    };
  },
  methods: {
    onSuccess(times) {
      // console.log('验证通过');
      // this.msg = `login success, 耗时${(times / 1000).toFixed(1)}s`;
      this.$emit('success');
    },
    onFail() {
      // console.log('验证不通过');
      // this.msg = '';
      this.$emit('fail');
    },
    onRefresh() {
      // console.log('点击了刷新小图标');
      // this.msg = '';
    },
    onFulfilled() {
      // console.log('刷新成功啦！');
    },
    onAgain() {
      // console.log('检测到非人为操作的哦！');
      // this.msg = 'try again';
      // // 刷新
      // this.handleClick();
    },
    handleClick() {
      // this.$refs.slideblock.reset();
      // this.msg = '';
    },
  },
};
</script>

<style lang="scss" scoped></style>
