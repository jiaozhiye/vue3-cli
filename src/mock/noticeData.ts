/*
 * @Author: 焦质晔
 * @Date: 2020-05-02 09:10:56
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-03-22 17:32:53
 */
import Mock from 'mockjs';

export default Mock.mock({
  code: 1,
  message: '',
  'data|5-10': [
    {
      'id|+1': 1,
      title: '@county(true)',
    },
  ],
});
