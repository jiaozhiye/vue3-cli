<template>
  <div>12345 {{ $t('demo.label1') }}</div>
</template>

<script>
import { language } from '@/mixins/langMixin'; // 多语言 - mep 没有多语言功能
import './lang'; // mep 没有多语言功能
export default {
  name: 'Demo',
  mixins: [language],
};
</script>
