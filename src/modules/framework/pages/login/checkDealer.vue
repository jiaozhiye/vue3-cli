<template>
  <div>
    <qm-table
      ref="table"
      :height="300"
      :columns="columns"
      :dataSource="list"
      rowKey="index"
      :rowSelection="rowSelection"
      :showFullScreen="false"
      :showAlert="false"
      topSpaceAlign="left"
      :columnsChange="(columns) => (this.columns = columns)"
      @rowDblclick="dbClickHandle"
    >
      <h5 class="title">
        <i class="el-icon-info" />
        <span>您的帐号在以下经销商共享，请选择本次登录的经销商。</span>
      </h5>
    </qm-table>
    <div
      :style="{
        position: 'absolute',
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: 9,
        borderTop: '1px solid #d9d9d9',
        padding: '10px 15px',
        background: '#fff',
        textAlign: 'right',
      }"
    >
      <el-button @click="cancelHandle">关闭</el-button>
      <el-button type="primary" :disabled="disabled" @click="confirmHandle">确定</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['list'],
  data() {
    return {
      columns: this.createTableColumns(),
      rowSelection: {
        type: 'radio',
        onChange: this.selectedRowChange,
      },
      result: null,
    };
  },
  computed: {
    disabled() {
      return !this.result;
    },
  },
  methods: {
    createTableColumns() {
      return [
        {
          title: '经销商名称',
          dataIndex: 'vDealerName',
          filter: {
            type: 'text',
          },
        },
        {
          title: '经销商代码',
          dataIndex: 'salesCode',
          filter: {
            type: 'text',
          },
        },
        {
          title: '服务站代码',
          dataIndex: 'vDealerCode',
          filter: {
            type: 'text',
          },
        },
      ];
    },
    selectedRowChange(keys, rows) {
      this.result = rows.length ? rows[0] : null;
    },
    dbClickHandle(row) {
      this.result = row;
      this.confirmHandle();
    },
    confirmHandle() {
      this.$emit('confirm', this.result);
      this.cancelHandle();
    },
    cancelHandle() {
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  display: flex;
  align-items: center;
  height: 100%;
  font-size: $textSize;
  line-height: 1;
  i {
    font-size: $textSize + 2px;
    margin-right: 5px;
  }
}
</style>
