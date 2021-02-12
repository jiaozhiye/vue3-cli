<script>
let UserCenter = null;

try {
  const files = require.context('@/modules/system/pages/stm9001', true, /index\.vue$/);
  if (files.keys().length) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    UserCenter = require('@/modules/system/pages/stm9001').default;
  }
} catch (err) {}

export default {
  name: 'JzyUserCenter',
  render() {
    return UserCenter ? <UserCenter /> : null;
  },
};
</script>
