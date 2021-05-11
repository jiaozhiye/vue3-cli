<template>
  <div>
    <qm-button type="primary"><i class="iconfont icon-info-circle" /> qm Button</qm-button>
    <el-button icon="el-icon-edit">el Button</el-button>
  </div>
</template>

<script>
import { language } from '@/mixins/langMixin'; // 多语言 - mep 没有多语言功能
import './lang'; // mep 没有多语言功能
export default {
  name: 'Demo',
  mixins: [language],
};
</script>
