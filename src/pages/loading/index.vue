<template>
  <div class="loading">
    <qm-spin spinning tip="Loading..." />
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LoadingComponent',
});
</script>

<style lang="scss" scoped>
.loading {
  height: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
