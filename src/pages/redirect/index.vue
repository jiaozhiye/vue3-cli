<script>
import { defineComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
  name: 'Redirect',
  beforeCreate() {
    const { params, query } = useRoute();
    const { path } = params;
    useRouter()
      .replace({ path: `/${path}`, query })
      .catch((err) => console.warn(err));
  },
  render() {
    return null;
  },
});
</script>
