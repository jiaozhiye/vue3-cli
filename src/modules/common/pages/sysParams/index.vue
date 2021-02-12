<script>
/*
 * @Author: 焦质晔
 * @Date: 2020-09-02 13:03:13
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2020-09-02 13:04:28
 */
import { dictionary } from '@/mixins/dictMixin';
import { sleep, messageAction } from '@/utils';
import { getSysParams, getCityList, saveSysParams } from '@common/api/sysParams';

export default {
  name: 'JzySysParams',
  mixins: [dictionary],
  props: {
    vModule: {
      type: String,
      default: 'sys'
    }
  },
  data() {
    this.initValue = {}; // 初始值
    return {
      activeTabKey: '0',
      formList: {},
      dataList: [], // 接口数据
      cities: [], // 省、市数据
      loading: false
    };
  },
  computed: {
    formRefs() {
      return this.dataList.map((x, i) => `form_${i}`);
    },
    allDataList() {
      const result = [];
      this.dataList.forEach(x => {
        result.push(...(x.list ?? []));
      });
      return result;
    }
  },
  mounted() {
    this.getSysParamData();
  },
  methods: {
    async getSysParamData() {
      this.loading = !0;
      const res1 = await getSysParams({ vModule: this.vModule });
      if (res1.code === 200) {
        this.dataList = res1.data ?? [];
      }
      this.loading = !1;
      await sleep(0);
      if (!(this.findFormItem('CSQDM') || this.findFormItem('CSXDM'))) return;
      const res2 = await getCityList();
      if (res2.code === 200) {
        this.cities = res2.data ?? [];
        this.setProvinceItems(this.cities);
        this.setCityItems(this.initValue['CSQDM']);
      }
    },
    setProvinceItems(arr) {
      const item = this.findFormItem('CSQDM');
      if (!item) return;
      item.options.itemList = arr.map(x => ({ text: x.text, value: x.value.toString() }));
    },
    setCityItems(val) {
      const item = this.findFormItem('CSXDM');
      if (!item) return;
      const arr = this.cities.find(x => x.value.toString() === val)?.children ?? [];
      item.options.itemList = arr.map(x => ({ text: x.text, value: x.value.toString() }));
      this.findFormRef('CSXDM')?.SET_FIELDS_VALUE({ ['CSXDM']: arr.length ? arr[0].value.toString() : '' });
    },
    async saveHandle() {
      let result = {};
      for await (let val of this.formRefs) {
        const [err, data] = await this.$refs[val]?.GET_FORM_DATA();
        if (err) return;
        result = Object.assign({}, result, data);
      }
      if (!Object.keys(result).length) return;
      for (let key in result) {
        result[key] = result[key].toString();
      }
      // [{ iD: 'xxx', vModule: "SYS", vPara: 'CSXDM', vParaValue: 'xxx' }, { iD: 'xxx', vModule: "SYS", vPara: 'CSXDM', vParaValue: 'xxx' }]
      const params = this.allDataList.filter(x => x.cVisible === '1').map(x => ({ iD: x.iD, vModule: x.vModule, vPara: x.vPara, vParaValue: result[x.vPara] }));
      const res = await saveSysParams(params);
      if (res.code === 200) {
        messageAction('保存成功！', 'success');
      }
    },
    formatType(type) {
      let result;
      switch (type) {
        case 'INT_NUMBER':
        case 'FLOAT_NUMBER':
          result = 'INPUT_NUMBER';
          break;
        case 'SEARCH_HELP':
          result = 'SELECT';
          break;
        default:
          result = type;
          break;
      }
      return result;
    },
    findFormItem(fieldName) {
      for (let val of this.formRefs) {
        let target = this.formList[val].find(x => x.fieldName === fieldName);
        if (target) {
          return target;
        }
      }
      return null;
    },
    findFormRef(fieldName) {
      for (let val of this.formRefs) {
        let target = this.formList[val].find(x => x.fieldName === fieldName);
        if (target) {
          return this.$refs[val];
        }
      }
      return null;
    },
    createFormList(arr) {
      return arr
        .filter(x => x.cVisible === '1')
        .map(x => ({
          type: this.formatType(x.formType),
          label: x.vParaName,
          fieldName: x.vPara,
          style: { width: '200px' },
          disabled: x.cAlert === '2',
          options: {
            precision: x.formType === 'FLOAT_NUMBER' ? 2 : 0,
            min: x.nMinValue,
            max: x.nMaxValue,
            trueValue: '1',
            falseValue: '0',
            itemList: this.createDictList(x.vDataSource ?? '')
          },
          ...(x.formType === 'SEARCH_HELP' && x.vPara === 'CSQDM'
            ? {
                onChange: val => {
                  this.setCityItems(val);
                }
              }
            : null),
          descOptions: {
            content: x.vDesc
          }
        }));
    },
    createFormValue(arr) {
      const result = {};
      arr
        .filter(x => x.cVisible === '1')
        .forEach(x => {
          result[x.vPara] = this.initValue[x.vPara] = ['INT_NUMBER', 'FLOAT_NUMBER'].includes(x.formType) ? Number(x.vParaValue) : x.vParaValue;
        });
      return result;
    },
    resetHandle() {
      this.$refs[this.formRefs[this.activeTabKey]]?.RESET_FORM();
    }
  },
  render() {
    const { activeTabKey, loading, dataList, formRefs } = this;
    return (
      <div class="sys-wrapper">
        <Spin spinning={loading} tip="Loading...">
          <SuperTabs initial-value={activeTabKey} lazyLoad={false} onChange={val => (this.activeTabKey = val)}>
            {dataList.map((x, i) => {
              if (!this.formList[formRefs[i]]) {
                this.$set(this.formList, formRefs[i], this.createFormList(x.list));
              }
              return (
                <tab-panel key={i.toString()} label={x.title}>
                  <FormPanel ref={formRefs[i]} initialValue={this.createFormValue(x.list)} list={this.formList[formRefs[i]]} cols={2} labelWidth={200} />
                </tab-panel>
              );
            })}
            <div slot="extraContent" style="margin-top: -4px;">
              <el-button type="default" onClick={this.resetHandle}>
                取消
              </el-button>
              <multiuse-button type="primary" icon="iconfont icon-save" click={this.saveHandle}>
                保存
              </multiuse-button>
            </div>
          </SuperTabs>
        </Spin>
      </div>
    );
  }
};
</script>

<style lang="scss" scoped>
.sys-wrapper {
  position: relative;
  margin-top: -5px;
  /deep/ .el-tabs__content {
    height: calc(100vh - 110px);
    overflow-y: auto;
  }
}
</style>
