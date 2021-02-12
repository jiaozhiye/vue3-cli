<script>
/*
 * @Author: 焦质晔
 * @Date: 2021-02-12 23:30:14
 * @Last Modified by:   焦质晔
 * @Last Modified time: 2021-02-12 23:30:14
 */
export default {
  name: 'MenuFold',
  props: {
    collapsed: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isCollapse: this.collapsed,
    };
  },
  methods: {
    clickHandler() {
      this.isCollapse = !this.isCollapse;
      this.$emit('change', this.isCollapse);
    },
  },
  render() {
    const cls = [this.isCollapse ? `el-icon-s-unfold` : `el-icon-s-fold`];
    return (
      <span
        class="menu-fold"
        title={this.isCollapse ? this.$t('app.header.unfold') : this.$t('app.header.fold')}
        onClick={this.clickHandler}
      >
        <i class={cls} />
      </span>
    );
  },
};
</script>

<style lang="scss" scoped>
.menu-fold {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 15px;
  font-size: 24px;
  cursor: pointer;
  transition: color 0.3s ease;
  &:hover {
    background-color: rgba(0, 0, 0, 0.03);
  }
}
</style>
