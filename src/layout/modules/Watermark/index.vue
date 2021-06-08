<template>
  <div class="app-watermark"></div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Watermark',
});
</script>

<style lang="scss" scoped>
.app-watermark {
  z-index: 9;
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  background-size: 332px;
  pointer-events: none;
  background-repeat: repeat;
  background-image: url(../../../assets/img/watermark.png);
}
</style>
