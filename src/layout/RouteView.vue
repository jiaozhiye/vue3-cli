<script lang="tsx">
/*
 * @Author: 焦质晔
 * @Date: 2021-02-13 16:02:24
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-06-08 13:55:40
 */
import { defineComponent } from 'vue';
import { RouterView } from 'vue-router';
import { JSXNode } from '@/utils/types';

export default defineComponent({
  name: 'RouteView',
  render(): JSXNode {
    return <RouterView />;
  },
});
</script>
