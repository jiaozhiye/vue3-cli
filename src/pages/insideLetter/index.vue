<template>
  <div class="inside-letter">
    {{ $t('app.global.emptyText') }}
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'InsideLetter',
});
</script>

<style lang="scss" scoped>
.inside-letter {
  width: 300px;
}
</style>
