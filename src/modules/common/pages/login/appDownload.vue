<template>
  <div class="app-download">
    <span>移动办公下载</span>
    <div>
      <el-button
        v-for="(item, index) in list"
        :key="item.vAppName"
        type="text"
        size="medium"
        @click="clickHandle(index)"
        >{{ item.vAppName }}</el-button
      >
    </div>
    <BaseDialog
      v-model:visible="visible"
      title="移动办公"
      width="400px"
      :showFullScreen="false"
      destroy-on-close
    >
      <Qrcode :text="qrUrl" />
    </BaseDialog>
  </div>
</template>

<script>
import { getAppDownload } from '@common/api/login';

export default {
  data() {
    return {
      list: [],
      qrUrl: '',
      visible: false,
    };
  },
  mounted() {
    this.getAppList();
  },
  methods: {
    async getAppList() {
      if (process.env.MOCK_DATA === 'true') return;
      const res = await getAppDownload({ hostName: window.location.hostname });
      if (res.code === 200) {
        this.list = res.data ?? [];
      }
    },
    clickHandle(index) {
      this.qrUrl = this.list[index].vUrl;
    },
  },
};
</script>

<style lang="scss" scoped>
.app-download {
  display: flex;
  height: 42px;
  margin-bottom: 10px;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid $borderColor;
}
</style>
