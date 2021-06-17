<script>
let UserSetting = null;

try {
  const files = require.context('@/modules/system/pages/stm9001', true, /index\.vue$/);
  if (files.keys().length) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    UserSetting = require('@/modules/system/pages/stm9001').default;
  }
} catch (err) {
  // ...
}

export default {
  name: 'UserSetting',
  render() {
    return UserSetting ? <UserSetting /> : null;
  },
};
</script>
