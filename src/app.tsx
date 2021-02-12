/*
 * @Author: 焦质晔
 * @Date: 2021-02-12 14:04:39
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-02-12 20:41:34
 */
import { defineComponent } from 'vue';

import '@/assets/css/style.scss';
import '@/assets/css/element-ui.scss';

export default defineComponent({
  name: 'App',
  render() {
    return <router-view />;
  },
});
