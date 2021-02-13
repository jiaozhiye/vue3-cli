<template>
  <div class="aside__all-menu--panel">
    <div class="search">
      <el-autocomplete
        v-model="menuPath"
        value-key="title"
        :fetch-suggestions="querySearch"
        :placeholder="$t('app.sidebar.allNavPlaceholder')"
        @select="handleSelect"
      >
        <template v-slot:prefix>
          <i class="el-icon-search el-input__icon"></i>
        </template>
        <template v-slot="{ item }">
          <span class="name">{{ item.title }}</span>
        </template>
      </el-autocomplete>
    </div>
    <div class="main">
      <el-tabs tab-position="right">
        <el-tab-pane v-for="item in tabMenuList" :key="item.key" :label="item.title" lazy>
          <div class="column-wrap">
            <div v-for="sub in item.children" :key="sub.key" class="box">
              <h4>{{ sub.title }}</h4>
              <ul>
                <li v-for="x in sub.children" :key="x.key">
                  <i
                    :class="[x.star ? 'el-icon-star-on' : 'el-icon-star-off']"
                    @click.stop="starClickHandle(x.star, x.key, x.title)"
                  />
                  <router-link :to="x.key" @click="clickHandle">{{ x.title }}</router-link>
                </li>
              </ul>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
/*
 * @Author: 焦质晔
 * @Date: 2021-02-13 16:36:01
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-02-13 17:07:25
 */
import { defineComponent } from 'vue';
import { mapState, mapActions } from 'vuex';
// import { flatten } from 'lodash-es';
import { notifyAction } from '@/utils';
import { setStarMenuList } from '@/api/application';
// import pinyin, { STYLE_FIRST_LETTER } from '@/components/Pinyin/index';

export default defineComponent({
  name: 'MenuList',
  props: {
    menu: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      menuPath: '',
    };
  },
  computed: {
    ...mapState('app', ['menuList', 'starMenuList']),
    tabMenuList() {
      return this.createMenuList(this.menu);
    },
  },
  methods: {
    ...mapActions('app', ['addStarMenuList', 'removeStarMenuList']),
    createMenuList(list) {
      return list.map((x) => {
        const t = { ...x };
        if (Array.isArray(x.children)) {
          t.children = this.createMenuList(x.children);
        }
        t.star = this.starMenuList.some((k) => k.key === t.key);
        return t;
      });
    },
    querySearch(queryString = '', cb) {
      const res = queryString
        ? this.menuList.filter(this.createFilter(queryString))
        : this.menuList;
      cb(res);
    },
    createFilter(queryString) {
      return (state) => {
        // const pyt = flatten(pinyin(state.title, { style: STYLE_FIRST_LETTER })).join('');
        // const str = `${state.title}|${pyt}`;
        const str = `${state.title}`;
        return str.toLowerCase().includes(queryString.toLowerCase());
      };
    },
    handleSelect(item) {
      this.$router.push({ path: item.key });
      this.clickHandle();
      setTimeout(() => {
        this.menuPath = '';
      }, 500);
    },
    clickHandle() {
      setTimeout(() => {
        this.$parent.close();
      }, 200);
    },
    starClickHandle(star, key, title) {
      if (!star) {
        if (this.starMenuList.length >= 10) {
          return notifyAction(this.$t('information.maxStar', { total: 10 }), 'warning');
        }
        this.addStarMenuList({ key, title });
      } else {
        this.removeStarMenuList(key);
      }
      if (process.env.MOCK_DATA === 'true') return;
      setStarMenuList(this.starMenuList);
    },
  },
});
</script>

<style lang="scss">
.aside__all-menu--panel {
  display: flex;
  flex-direction: column;
  height: 100%;
  &::after {
    content: '';
    position: absolute;
    width: 150px;
    height: 100%;
    right: 0;
    top: 0;
    background: $menuBg;
  }
  .search {
    padding: 50px 0 20px 100px;
    .el-autocomplete {
      width: 300px;
      .el-input__inner {
        color: #fff;
        font-size: $textSize;
        border-radius: 0;
        background: $allMenuBgColor;
        border: none;
        border-bottom: 1px solid #626466;
        &:-ms-input-placeholder {
          color: $menuText !important;
        }
      }
    }
  }
  .main {
    flex: 1;
    position: relative;
    overflow-y: auto;
    .el-tabs {
      height: 100%;
      overflow-y: auto;
      &::-webkit-scrollbar {
        display: none;
      }
      .el-tabs__header {
        position: absolute;
        right: 0;
        top: 0;
        .el-tabs__nav-wrap {
          padding: 0;
          .el-tabs__nav-scroll {
            overflow-y: auto;
            .el-tabs__nav {
              padding-bottom: $modulePadding;
            }
          }
          .el-tabs__item {
            padding: 0 0 0 15px;
            height: 34px;
            line-height: 34px;
            color: $menuText;
            &.is-active {
              font-weight: 700;
              color: #fff;
            }
          }
          &.is-right {
            width: 151px;
          }
          &::after {
            display: none;
          }
        }
      }
      .el-tabs__content {
        margin-right: 170px;
        .column-wrap {
          column-count: 2;
          column-gap: 0;
          .box {
            padding-left: 20px;
            padding-bottom: 10px;
            -webkit-column-break-inside: avoid;
            page-break-inside: avoid;
            break-inside: avoid;
            h4 {
              color: $menuText;
              font-weight: 700;
              line-height: 34px;
              border-bottom: 1px solid #626466;
            }
            ul {
              margin-top: 8px;
              li {
                line-height: 26px;
                i {
                  font-size: 14px;
                  cursor: pointer;
                }
                .el-icon-star-on {
                  color: $menuText;
                }
                .el-icon-star-off {
                  color: $menuText;
                }
                a {
                  font-size: $textSizeSecondary;
                  color: $menuText;
                  transition: all 0.3s ease;
                  &:hover {
                    color: $menuActiveText;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
