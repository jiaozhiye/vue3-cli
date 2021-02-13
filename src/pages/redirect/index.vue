<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Redirect',
  beforeCreate() {
    const { params, query } = this.$route;
    const { path } = params;
    // refresh view
    this.$router.replace({ path: `/${path}`, query });
  },
  render() {
    return h();
  },
});
</script>
