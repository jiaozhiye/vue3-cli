/*
 * @Author: 焦质晔
 * @Date: 2021-02-12 21:05:20
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-02-14 15:11:50
 */
import store from '@/store';
import { notifyAction } from '@/utils';

import { Dictionary, RegionItem } from '@/utils/types';

// 遍历省市区方法
const deepMapCity = (data, step = 3, cur = 1): Array<RegionItem> => {
  const res: Array<RegionItem> = [];
  for (const key in data) {
    const target: RegionItem = { value: data[key]['regionCode'], text: data[key]['regionName'] };
    if (data[key].children && Object.keys(data[key].children).length) {
      if (cur < step) {
        target.children = deepMapCity(data[key].children, step, cur + 1);
      }
    }
    res.push(target);
  }
  return res;
};

export const dictionary = {
  beforeCreate(): void {
    this.$dict = Object.keys(store.state.app.dict).length
      ? { ...store.state.app.dict }
      : JSON.parse(localStorage.getItem('dict')) || {};
    if (!Object.keys(this.$dict).length) {
      notifyAction('本地数据字典被清空，请刷新当前页面！', 'warning');
    }
  },
  methods: {
    /**
     * @description 创建数据字典列表，支持过滤
     * @param {string} code 数据字典的 code 码
     * @param {array} filter 需要过滤数据字典项的 code 值
     * @param {bool} showStoped 是否显示已停用的数据字典，默认 false
     * @returns {array}
     */
    createDictList(
      code: string,
      filter: string[] | string = [],
      showStoped = false
    ): Array<Dictionary> {
      const vals: string[] = Array.isArray(filter) ? filter : [filter];
      let res: Array<Dictionary> = [];
      if (this.$dict && Array.isArray(this.$dict[code])) {
        // 过滤已停用的数据字典项
        res = !showStoped ? this.$dict[code].filter((x) => x.stoped !== '1') : this.$dict[code];
        res = res.map((x) => ({ text: x.text, value: x.value }));
        res = res.filter((x) => !vals.includes(x.value.toString()));
      }
      return res;
    },
    /**
     * @description 数据字典的翻译
     * @param {string|number} val 数据的值
     * @param {string} code 数据字典的编码
     * @returns {string} 翻译后的文本
     */
    createDictText(val: string | number, code: string): string {
      let res = '';
      if (!val) return res;
      if (this.$dict && Array.isArray(this.$dict[code])) {
        const target: Dictionary = this.$dict[code].find((x) => x.value == val);
        res = target ? target.text : val.toString();
      }
      return res;
    },
    /**
     * @description 创建省市区数据列表
     * @param {number} step 数据的级数，默认全部递归
     * @returns {array}
     */
    createDictRegion(step: number): Array<RegionItem> {
      // this.$dict.region -> 数据字典中省市区的递归数据
      return deepMapCity(this.$dict.region, step);
    },
  },
};
