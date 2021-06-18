<template>
  <table cellspacing="0" cellpadding="0" border="0" class="fs13">
    <tr>
      <td colspan="4" class="bor">标题1</td>
      <td colspan="4" class="bor">标题2</td>
      <td colspan="4" class="bor">标题3</td>
      <td colspan="4" class="bor">标题4</td>
      <td colspan="4" class="bor">标题5</td>
      <td colspan="4" class="bor">标题6</td>
    </tr>
    <tr v-for="x in dataSource" :key="x">
      <td colspan="4" class="bor">内容{{ x }}</td>
      <td colspan="4" class="bor">内容{{ x }}</td>
      <td colspan="4" class="bor">内容{{ x }}</td>
      <td colspan="4" class="bor">内容{{ x }}</td>
      <td colspan="4" class="bor">内容{{ x }}</td>
      <td colspan="4" class="bor">内容{{ x }}</td>
    </tr>
  </table>
</template>

<script>
export default {
  name: 'Template',
  props: ['dataSource'],
};
</script>
