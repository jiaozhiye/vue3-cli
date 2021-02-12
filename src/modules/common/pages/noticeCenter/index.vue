<script>
let Notice = null;
let Message = null;

try {
  const files = require.context('@/modules/lifecycle/pages/mes/mes1003', true, /index\.vue$/);
  if (files.keys().length) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    Notice = require('@/modules/lifecycle/pages/mes/mes1003').default;
  }
} catch (err) {}

try {
  const files = require.context('@/modules/system/pages/stm9001', true, /index\.vue$/);
  if (files.keys().length) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    Message = require('@/modules/system/pages/stm9001').default;
  }
} catch (err) {}

export default {
  name: 'JzyNoticeCenter',
  render() {
    return this.$route.params.id === '1' ? <Notice /> : <Message />;
  },
};
</script>
