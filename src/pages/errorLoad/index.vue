<template>
  <div class="error-load">
    {{ $t('app.global.errorLoad') }}
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ErrorComponent',
});
</script>

<style lang="scss" scoped>
.error-load {
  height: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
