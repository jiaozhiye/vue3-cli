<script lang="ts">
import { defineComponent, VNode } from 'vue';

export default defineComponent({
  name: 'App',
  data() {
    this.aa = { a: 9 };
    return {
      value: '',
    };
  },
  methods: {
    clickHandle(ev) {
      this.aa.age = 8;
      this.value = ev.target.value;
    },
  },
  render(): VNode {
    return (
      <>
        <div>{this.value}</div>
        <input v-model={this.value} />
        <div>
          <button onClick={this.clickHandle}>按钮</button>
        </div>
      </>
    );
  },
});
</script>

<style></style>
