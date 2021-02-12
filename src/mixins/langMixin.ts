/*
 * @Author: 焦质晔
 * @Date: 2021-02-12 15:49:03
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-02-12 23:18:47
 */
export const language = {
  beforeCreate(): void {
    this.$lang = this.$store.state.app.lang || localStorage.getItem('lang') || 'zh-cn';
  },
};
