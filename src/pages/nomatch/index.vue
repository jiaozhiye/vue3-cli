<template>
  <div class="nomatch-wrap">
    <div class="container">
      <h2>404</h2>
      <div class="desc">{{ $t('app.global.noMatch') }}</div>
      <!-- <div class="actions">
        <el-button type="primary" @click="goHome">{{ $t('login.backHome') }}</el-button>
      </div> -->
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Nomatch',
  methods: {
    goHome() {
      this.$router.push({ path: '/' });
    },
  },
});
</script>

<style lang="scss" scoped>
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
      margin-bottom: 24px;
      color: #434e59;
      font-weight: 600;
      font-size: 72px;
      line-height: 72px;
    }
    .desc {
      margin-bottom: 16px;
      color: $textColorSecondary;
      font-size: 20px;
      line-height: 28px;
    }
  }
}
</style>
