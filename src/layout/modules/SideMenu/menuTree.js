/**
 * @Author: 焦质晔
 * @Date: 2019-06-20 10:00:00
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-02-13 12:45:20
 */
import variables from '@/assets/css/variables.scss';

export default {
  name: 'MenuTree',
  props: {
    menu: {
      type: Array,
      default: () => [],
    },
    collapsed: {
      type: Boolean,
      default: false,
    },
    syncActive: {
      type: Boolean,
      default: true,
    },
    defaultOpenedKeys: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      selectedKey: '',
    };
  },
  computed: {
    variables() {
      return variables;
    },
  },
  watch: {
    $route({ path }) {
      this.selectedKey = path;
    },
  },
  methods: {
    createMenuTree(arr, depth = '') {
      return arr
        .filter((x) => !x.hideInMenu)
        .map((item, index) => {
          let { title, icon } = item;
          let key = item.key ?? '';
          // 判断是否为 http 链接
          const httpLink = /^https?:\/\//.test(key);
          const menuItemNode = !httpLink ? (
            <>
              {icon && <i class={`iconfont ${icon}`} />}
              <span title={title}>{title}</span>
            </>
          ) : (
            <a href={key} title={title} target="_blank">
              {icon && <i class={`iconfont ${icon}`} />}
              <span>{item.title}</span>
            </a>
          );
          const uniqueKey = depth + (index + 1);
          if (Array.isArray(item.children)) {
            return (
              <el-submenu
                key={uniqueKey}
                index={uniqueKey}
                v-slots={{
                  title: () => menuItemNode,
                }}
              >
                {this.createMenuTree(item.children, `${uniqueKey}-`)}
              </el-submenu>
            );
          }
          return (
            <el-menu-item
              key={uniqueKey}
              index={!httpLink ? key : ''}
              v-slots={{
                title: () => menuItemNode,
              }}
            />
          );
        });
    },
  },
  created() {
    this.selectedKey = this.$route.path;
  },
  render() {
    const { collapsed, syncActive, selectedKey, defaultOpenedKeys, variables } = this;
    const wrapProps = {
      collapse: collapsed,
      router: true,
      collapseTransition: false,
      backgroundColor: variables.menuBg,
      textColor: variables.menuText,
      activeTextColor: variables.menuActiveText,
      defaultActive: syncActive ? selectedKey : null,
      defaultOpeneds: defaultOpenedKeys,
      style: { borderRight: 'none' },
    };
    return (
      <div>
        <el-menu {...wrapProps}>{this.createMenuTree(this.menu)}</el-menu>
      </div>
    );
  },
};
