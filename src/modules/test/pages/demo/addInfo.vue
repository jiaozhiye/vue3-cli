<template>
  <qm-anchor style="height: 100%">
    <qm-anchor-item label="标题名称">
      <div>
        <qm-form ref="form" :list="formList" @valuesChange="formChangeHandle" />
      </div>
    </qm-anchor-item>
    <qm-anchor-item label="页签名称" showDivider>
      <div style="margin-bottom: 10px">
        <qm-table
          ref="table"
          :height="400"
          :columns="columns1"
          :dataSource="list"
          :rowKey="(record) => record.id"
          :columnsChange="(columns) => (this.columns1 = columns)"
          @dataChange="tableChangeHandle"
        >
          <qm-space>
            <el-button type="primary" icon="el-icon-plus" @click="insertHandle">新建</el-button>
          </qm-space>
        </qm-table>
      </div>
    </qm-anchor-item>
    <qm-anchor-item label="导航名称" showDivider>
      <div>
        <qm-table
          :columns="columns"
          :fetch="fetch"
          :rowKey="(row) => row.id"
          :rowSelection="selection"
          :columnsChange="(columns) => (this.columns = columns)"
        >
        </qm-table>
      </div>
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
 * @Last Modified time: 2021-06-25 19:43:24
 */
import './lang'; // 多语言
import { dictionary } from '@/mixins/dictMixin'; // 数据字典
import { createUidKey } from '@/utils';
import { getTableData, getSelectData, getTreeData, getRegionData } from '@test/api/demo';

export default {
  name: 'AddInfo',
  mixins: [dictionary],
  inject: ['$$drawer'],
  emits: ['close'],
  data() {
    return {
      formList: this.createFilterList(),
      columns: this.createTableColumns(),
      fetch: {
        api: getTableData,
        params: {},
        dataKey: 'records',
      },
      selection: {
        type: 'checkbox',
        filterable: true,
        selectedRowKeys: this.selectedKeys || [],
        disabled: (row) => {
          return row.id === 3;
        },
        onChange: (val, rows) => {
          this.selectedKeys = val;
        },
      },
      columns1: this.createTableColumns1(),
      list: [],
    };
  },
  mounted() {
    // 开启 drawer loading
    this.$$drawer.START_LOADING();
    // 关闭 drawer loading
    setTimeout(() => {
      this.$$drawer.STOP_LOADING();
    }, 3000);
  },
  methods: {
    findFormItem(val) {
      return this.formList.find((x) => x.fieldName === val);
    },
    createFilterList() {
      return [
        {
          type: 'BREAK_SPACE',
          label: '标题名称',
          collapse: {
            showLimit: 4,
            remarkItems: [{ fieldName: 'e1' }, { fieldName: 'f1', isLabel: true }],
          },
        },
        {
          type: 'INPUT',
          label: this.$t('demo.label1'),
          labelOptions: {
            description: 'Label 描述信息',
          },
          fieldName: 'a1',
          rules: [{ required: true, message: '不能为空', trigger: 'change' }],
        },
        {
          type: 'INPUT',
          label: '条件2',
          fieldName: 'b1',
          searchHelper: {
            filters: [
              {
                type: 'INPUT',
                label: '条件1',
                fieldName: 's1',
              },
              {
                type: 'INPUT',
                label: '条件2',
                fieldName: 's2',
              },
              {
                type: 'INPUT',
                label: '条件3',
                fieldName: 's3',
              },
              {
                type: 'INPUT',
                label: '条件4',
                fieldName: 's4',
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
              return ['s1'];
            },
            fieldAliasMap: () => {
              return { b1: 'date', code: 'id', b1__desc: 'date', c1: 'date', c1__desc: 'date' };
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
          fieldName: 'c1',
          style: { width: `calc(100% - 80px)` },
          descOptions: {
            style: { width: '70px' },
          },
        },
        {
          type: 'SELECT',
          label: '条件4',
          fieldName: 'd1',
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
          fieldName: 'e1',
          request: {
            fetchApi: getTreeData,
            params: {},
            datakey: 'records',
          },
        },
        {
          type: 'REGION_SELECT',
          label: '条件6',
          fieldName: 'f1',
          request: {
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
          fieldName: 'g1',
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
        },
      ];
    },
    createTableColumns1() {
      return [
        {
          title: '操作',
          dataIndex: '__action__', // 操作列的 dataIndex 的值不能改
          fixed: 'left',
          width: 100,
          render: () => {
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
          dataIndex: 'index',
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
          title: '姓名',
          dataIndex: 'person.name',
          width: 200,
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
        {
          title: '价格',
          dataIndex: 'price',
          width: 150,
          precision: 2,
          required: true,
          sorter: true,
          filter: {
            type: 'number',
          },
          editRender: (row) => {
            return {
              type: 'number',
              editable: true,
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
          filter: {
            type: 'number',
          },
          summation: {
            unit: '元',
          },
          render: (text, row) => {
            row.total = row.price * row.num;
            return <span>{row.total.toFixed(2)}</span>;
          },
          extraRender: (text, row) => {
            return Number(row.price * row.num).toFixed(2);
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
          width: 150,
          filter: {
            type: 'checkbox',
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
          width: 300,
        },
      ];
    },
    formChangeHandle() {
      this.formChanged = true;
    },
    tableChangeHandle() {
      const { inserted, updated, removed } = this.$refs[`table`].GET_LOG();
      this.tableChanged = inserted.length || updated.length || removed.length;
    },
    getValueChange() {
      return this.formChanged || this.tableChanged;
    },
    insertHandle() {
      this.$refs[`table`].INSERT_RECORDS({ id: createUidKey('new-'), price: 1, num: 1 });
    },
    cancelHandle() {
      this.$emit('close', false, this.$$drawer);
    },
    async saveHandle() {
      const [err, res] = await this.$refs[`form`].GET_FORM_DATA();
      if (err) return;
      console.log(res);
    },
  },
};
</script>
