<template>
  <div>
    <el-input v-model="value" />
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Dashboard',
  data() {
    return {
      value: '',
    };
  },
});
</script>
