<template>
  <div class="nomatch-wrap">
    <div class="container">
      <h2>404</h2>
      <div class="desc">{{ $t('app.global.noMatch') }}</div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Nomatch',
});
</script>

<style lang="scss">
.nomatch-wrap {
  display: flex;
  align-items: center;
  height: 100%;
  background: url(../../assets/img/not-found.svg) 30% 40% no-repeat;
  .container {
    flex: 1;
    margin: 0;
    margin-top: -10vh;
    margin-left: 50vw;
    h2 {
      margin-bottom: 20px;
      color: $textColor;
      font-weight: 600;
      font-size: 72px;
    }
    .desc {
      margin-bottom: 16px;
      font-size: 20px;
      color: $textColorSecondary;
    }
  }
}
</style>
