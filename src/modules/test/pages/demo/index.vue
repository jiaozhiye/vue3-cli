<template>
  <div>
    <qm-form
      ref="filter"
      uniqueKey="jzy_Demo"
      formType="search"
      :list="filterList"
      :fieldsChange="(items) => (this.filterList = items)"
      @collapse="this.onCollapseChange"
      @finish="onFinish"
    />
    <qm-table
      ref="table"
      uniqueKey="jzy_Demo"
      height="auto"
      :columns="columns"
      :dataSource="list"
      :rowKey="(row) => row.id"
      webPagination
      :columnsChange="(columns) => (this.columns = columns)"
    />
  </div>
</template>

<script>
import './lang'; // 多语言
import { getTableData } from '@test/api/demo';
import tableData from '@/mock/tableData';

export default {
  name: 'Demo',
  data() {
    return {
      list: tableData.data.items,
      filterList: this.createFilterList(),
      columns: this.createTableColumns(),
    };
  },
  methods: {
    createFilterList() {
      return [
        {
          type: 'INPUT',
          label: this.$t('demo.label1'),
          fieldName: 'a',
        },
        {
          type: 'INPUT',
          label: '条件2',
          fieldName: 'b',
        },
        {
          type: 'INPUT',
          label: '条件3',
          fieldName: 'c',
        },
        {
          type: 'INPUT',
          label: '条件4',
          fieldName: 'd',
        },
        {
          type: 'INPUT',
          label: '条件5',
          fieldName: 'e',
        },
      ];
    },
    createTableColumns() {
      return [
        {
          title: '操作',
          dataIndex: '__action__', // 操作列的 dataIndex 的值不能改
          fixed: 'left',
          width: 100,
          render: (text, row) => {
            return (
              <div>
                <el-button type="text">编辑</el-button>
                <el-button type="text">查看</el-button>
              </div>
            );
          },
        },
        {
          title: '序号',
          description: '数据索引',
          dataIndex: 'pageIndex',
          width: 80,
          sorter: true,
          render: (text) => {
            return text + 1;
          },
        },
      ];
    },
    onFinish(val) {
      console.log(123, val);
    },
    onCollapseChange() {
      this.$refs[`table`].CALCULATE_HEIGHT();
    },
  },
};
</script>
