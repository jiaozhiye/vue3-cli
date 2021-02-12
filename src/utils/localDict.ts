/*
 * @Author: 焦质晔
 * @Date: 2021-02-12 14:23:01
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-02-12 14:41:52
 */
import { Indexable, Dictionary } from '@/utils/types';

const localDict: Indexable<Array<Dictionary>> = {
  sex: [
    { text: '男', value: '1' },
    { text: '女', value: '0' },
  ],
};

export default localDict;
