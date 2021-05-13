<template>
  <qm-anchor style="height: 100%">
    <qm-anchor-item label="标题名称" showDivider>
      <div style="height: 400px">内容1</div>
    </qm-anchor-item>
    <qm-anchor-item label="页签名称" showDivider>
      <div style="height: 400px">内容2</div>
    </qm-anchor-item>
    <qm-anchor-item label="导航名称" showDivider>
      <div style="height: 400px">内容3</div>
    </qm-anchor-item>
  </qm-anchor>
  <div class="fixed-footer">
    <el-button @click="cancelHandle()">取 消</el-button>
    <qm-button type="primary" :click="saveHandle">提 交</qm-button>
  </div>
</template>

<script>
/*
 * @Author: 焦质晔
 * @Date: 2021-05-13 14:08:00
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-05-13 14:27:18
 */
import './lang'; // 多语言
import { dictionary } from '@/mixins/dictMixin'; // 数据字典

export default {
  name: 'AddInfo',
  mixins: [dictionary],
  methods: {
    cancelHandle() {},
    saveHandle() {},
  },
};
</script>
