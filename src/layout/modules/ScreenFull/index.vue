<script>
/*
 * @Author: 焦质晔
 * @Date: 2021-02-13 14:07:44
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-02-13 14:09:49
 */
import screenfull from 'screenfull';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ScreenFull',
  data() {
    return {
      isFullscreen: false,
    };
  },
  mounted() {
    this.init();
  },
  beforeUnmount() {
    this.destroy();
  },
  methods: {
    init() {
      if (screenfull.enabled) {
        screenfull.on('change', this.change);
      }
    },
    change() {
      this.isFullscreen = screenfull.isFullscreen;
    },
    clickHandle() {
      screenfull.toggle();
    },
    destroy() {
      if (screenfull.enabled) {
        screenfull.off('change', this.change);
      }
    },
  },
  render() {
    const cls = [`iconfont`, this.isFullscreen ? `icon-fullscreen-exit` : `icon-fullscreen`];
    return (
      <div class="header__screen-full" onClick={this.clickHandle}>
        <i class={cls} />
      </div>
    );
  },
});
</script>

<style lang="scss">
.header__screen-full {
  display: flex;
  width: 26px;
  height: 26px;
  align-items: center;
  justify-content: center;
  i {
    font-size: 20px;
    font-weight: 700;
    cursor: pointer;
  }
}
</style>
