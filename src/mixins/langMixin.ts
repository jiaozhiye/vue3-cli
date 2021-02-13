/*
 * @Author: 焦质晔
 * @Date: 2021-02-12 15:49:03
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-02-13 23:55:18
 */
export const language = {
  computed: {
    $lang(): string {
      return this.$store.state.app.lang || localStorage.getItem('lang') || 'zh-cn';
    },
  },
};
