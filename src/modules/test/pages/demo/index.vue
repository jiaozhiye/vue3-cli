<template>
  <qm-form
    ref="filter"
    uniqueKey="jzy_Demo"
    formType="search"
    :list="filterList"
    :fieldsChange="(items) => (this.filterList = items)"
    @finish="onFinish"
    @collapse="onCollapseChange"
  />
  <qm-table
    ref="table"
    uniqueKey="jzy_Demo"
    height="auto"
    :columns="columns"
    :fetch="fetch"
    :rowKey="(row) => row.id"
    :rowSelection="selection"
    :tablePrint="tablePrint"
    :exportExcel="exportExcel"
    :columnsChange="(columns) => (this.columns = columns)"
  >
    <qm-space>
      <el-button
        v-permission="'base:backup:clear'"
        type="primary"
        icon="el-icon-plus"
        @click="addHandle"
        >新增</el-button
      >
      <qm-button type="danger" icon="el-icon-delete" :confirm="{}" :click="removeHandle"
        >删除</qm-button
      >
    </qm-space>
  </qm-table>
  <qm-drawer
    v-model:visible="visible"
    title="新增数据"
    destroyOnClose
    :containerStyle="{ paddingBottom: '60px' }"
  >
    <AddInfo @close="closeHandle" />
  </qm-drawer>
</template>

<script>
/*
 * @Author: 焦质晔
 * @Date: 2021-05-13 14:08:00
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-05-31 13:30:07
 */
import './lang'; // 多语言
import { dictionary } from '@/mixins/dictMixin'; // 数据字典
import { notifyAction } from '@/utils';
import { getTableData, getSelectData, getTreeData, getRegionData } from '@test/api/demo';
import tableData from '@/mock/tableData';

import AddInfo from './addInfo';

export default {
  name: 'Demo',
  components: { AddInfo },
  mixins: [dictionary],
  data() {
    this.selectedKeys = [];
    return {
      list: tableData.data.items,
      filterList: this.createFilterList(),
      columns: this.createTableColumns(),
      fetch: {
        api: getTableData,
        params: {},
        dataKey: 'records',
      },
      selection: {
        type: 'checkbox',
        filterable: true,
        selectedRowKeys: this.selectedKeys,
        disabled: (row) => {
          return row.id === 3;
        },
        onChange: (val, rows) => {
          this.selectedKeys = val;
        },
      },
      tablePrint: {
        showLogo: true,
      },
      exportExcel: {
        fileName: '导出文件.xlsx',
      },
      visible: false,
    };
  },
  methods: {
    createFilterList() {
      return [
        {
          type: 'INPUT',
          label: this.$t('demo.label1'),
          labelOptions: {
            description: 'Label 描述信息',
          },
          fieldName: 'a',
        },
        {
          type: 'INPUT',
          label: '条件2',
          fieldName: 'b',
          searchHelper: {
            filters: [
              {
                type: 'INPUT',
                label: '条件1',
                fieldName: 'a1',
              },
              {
                type: 'INPUT',
                label: '条件2',
                fieldName: 'a2',
              },
              {
                type: 'INPUT',
                label: '条件3',
                fieldName: 'a3',
              },
              {
                type: 'INPUT',
                label: '条件4',
                fieldName: 'a4',
              },
            ],
            table: {
              columns: [
                {
                  title: '创建时间',
                  dataIndex: 'date',
                },
                {
                  title: '姓名',
                  dataIndex: 'person.name',
                },
              ],
              rowKey: (record) => record.id,
              fetch: {
                api: getTableData,
                params: {},
                dataKey: 'records',
              },
            },
            filterAliasMap: () => {
              return ['a1'];
            },
            fieldAliasMap: () => {
              return { b: 'date', code: 'id', b__desc: 'date', c: 'date', c__desc: 'date' };
            },
          },
          style: { width: `calc(100% - 80px)` },
          descOptions: {
            style: { width: '70px' },
          },
        },
        {
          type: 'INPUT',
          label: '条件3',
          fieldName: 'c',
          style: { width: `calc(100% - 80px)` },
          descOptions: {
            style: { width: '70px' },
          },
        },
        {
          type: 'SELECT',
          label: '条件4',
          fieldName: 'd',
          request: {
            fetchApi: getSelectData,
            params: {},
            datakey: 'records',
            valueKey: 'value',
            textKey: 'text',
          },
        },
        {
          type: 'MULTIPLE_TREE_SELECT',
          label: '条件5',
          fieldName: 'e',
          request: {
            fetchApi: getTreeData,
            params: {},
            datakey: 'records',
          },
        },
        {
          type: 'REGION_SELECT',
          label: '条件6',
          fieldName: 'f',
          request: {
            fetchApi: getRegionData,
            fetchStreetApi: getSelectData,
            params: {},
            datakey: 'records',
            valueKey: 'value',
            textKey: 'text',
          },
        },
        {
          type: 'CITY_SELECT',
          label: '条件7',
          fieldName: 'g',
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
        {
          title: '创建时间',
          dataIndex: 'date',
          width: 220,
          sorter: true,
          filter: {
            type: 'date',
          },
          editRender: (row) => {
            return {
              type: 'datetime',
            };
          },
        },
        {
          title: '个人信息',
          dataIndex: 'person',
          children: [
            {
              title: '姓名',
              dataIndex: 'person.name',
              width: 200,
              required: true,
              sorter: true,
              filter: {
                type: 'text',
              },
              editRender: (row) => {
                const obj = {
                  type: 'search-helper',
                  // editable: true,
                  extra: {
                    readonly: false,
                    maxlength: 10,
                    disabled: row.id === 3,
                  },
                  helper: {
                    filters: [
                      {
                        type: 'INPUT',
                        label: '条件1',
                        fieldName: 'a1',
                      },
                    ],
                    table: {
                      columns: [
                        {
                          title: '创建时间',
                          dataIndex: 'date',
                          filter: {
                            type: 'date',
                          },
                        },
                        {
                          title: '姓名',
                          dataIndex: 'person.name',
                        },
                      ],
                      rowKey: (record) => record.id,
                      fetch: {
                        api: getTableData,
                        params: {},
                        dataKey: 'records',
                      },
                    },
                    fieldAliasMap: () => {
                      return { 'person.name': 'date', 'person.age': 'date' };
                    },
                    filterAliasMap: () => {
                      return ['a1'];
                    },
                  },
                  rules: [{ required: true, message: '姓名不能为空' }],
                };
                return obj;
              },
            },
            {
              title: '性别',
              dataIndex: 'person.sex',
              width: 100,
              dictItems: [
                { text: '男', value: '1' },
                { text: '女', value: '0' },
              ],
            },
            {
              title: '年龄',
              dataIndex: 'person.age',
              width: 100,
              sorter: true,
              filter: {
                type: 'number',
              },
            },
          ],
        },
        {
          title: '价格',
          dataIndex: 'price',
          width: 150,
          precision: 2,
          required: true,
          sorter: true,
          groupSummary: {},
          filter: {
            type: 'number',
          },
          editRender: (row) => {
            return {
              type: 'number',
              extra: {
                max: 1000,
              },
              rules: [{ required: true, message: '价格不能为空' }],
            };
          },
        },
        {
          title: '数量',
          dataIndex: 'num',
          width: 150,
          required: true,
          sorter: true,
          groupSummary: {},
          filter: {
            type: 'number',
          },
          editRender: (row) => {
            return {
              type: 'number',
              extra: {
                max: 1000,
              },
              rules: [{ required: true, message: '数量不能为空' }],
            };
          },
        },
        {
          title: '总价',
          dataIndex: 'total',
          width: 150,
          precision: 2,
          align: 'right',
          sorter: true,
          groupSummary: {},
          filter: {
            type: 'number',
          },
          summation: {
            sumBySelection: true,
            unit: '元',
          },
          render: (text, row) => {
            row.total = row.price * row.num;
            return <span>{row.total.toFixed(2)}</span>;
          },
        },
        {
          title: '是否选择',
          dataIndex: 'choice',
          align: 'center',
          width: 150,
          editRender: (row) => {
            return {
              type: 'checkbox',
              editable: true,
              extra: {
                trueValue: 1,
                falseValue: 0,
                disabled: true,
              },
            };
          },
          dictItems: [
            { text: '选中', value: 1 },
            { text: '非选中', value: 0 },
          ],
        },
        {
          title: '状态',
          dataIndex: 'state',
          colSpan: 2,
          width: 150,
          filter: {
            type: 'radio',
            items: [
              { text: '已完成', value: 1 },
              { text: '进行中', value: 2 },
              { text: '未完成', value: 3 },
            ],
          },
          editRender: (row) => {
            return {
              type: 'select',
              items: [
                { text: '已完成', value: 1 },
                { text: '进行中', value: 2 },
                { text: '未完成', value: 3 },
              ],
            };
          },
          dictItems: [
            { text: '已完成', value: 1 },
            { text: '进行中', value: 2 },
            { text: '未完成', value: 3 },
          ],
        },
        {
          title: '业余爱好',
          dataIndex: 'hobby',
          colSpan: 0,
          width: 150,
          filter: {
            type: 'checkbox',
            items: [
              { text: '篮球', value: 1 },
              { text: '足球', value: 2 },
              { text: '乒乓球', value: 3 },
              { text: '游泳', value: 4 },
            ],
          },
          editRender: (row) => {
            return {
              type: 'select-multiple',
              items: [
                { text: '篮球', value: 1 },
                { text: '足球', value: 2 },
                { text: '乒乓球', value: 3 },
                { text: '游泳', value: 4 },
              ],
            };
          },
          dictItems: [
            { text: '篮球', value: 1 },
            { text: '足球', value: 2 },
            { text: '乒乓球', value: 3 },
            { text: '游泳', value: 4 },
          ],
        },
        {
          title: '地址',
          dataIndex: 'address',
          width: 200,
          filter: {
            type: 'textarea',
          },
          editRender: (row) => {
            return {
              type: 'text',
            };
          },
        },
      ];
    },
    onFinish(val) {
      this.fetch.params = Object.assign({}, this.fetch.params, val);
    },
    onCollapseChange() {
      this.$refs[`table`].CALCULATE_HEIGHT();
    },
    async removeHandle() {
      if (!this.selectedKeys.length) {
        return notifyAction(`请选择数据！`, 'warning');
      }
      // 执行删除
    },
    addHandle() {
      this.visible = true;
    },
    closeHandle(val) {
      this.visible = val;
    },
  },
};
</script>
