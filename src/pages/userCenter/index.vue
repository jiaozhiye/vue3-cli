<template>
  <div class="header__user-center">
    <el-popover
      v-model:visible="visible"
      placement="bottom-end"
      width="260px"
      transition="el-zoom-in-top"
      :stop-popper-mouse-event="false"
      :gpu-acceleration="false"
    >
      <div :class="userCenterCls">
        <div class="user-avatar">
          <span class="avatar">
            <img class="img" :src="weChatAvatar || info.profileUrl || avatarImg" />
          </span>
          <span class="name">{{ username }}</span>
        </div>
        <div class="user-box">
          <div class="title">
            <span class="text">公司名称</span>
          </div>
          <div class="content">
            <span class="text_overflow_cut" :title="info.vDealerName"
              ><i class="iconfont icon-home" /> {{ info.vDealerName }}</span
            >
          </div>
        </div>
        <div class="user-box">
          <div class="title">
            <span class="text">个人信息</span>
            <router-link to="/user-center" class="more" @click="closePopperHandle"
              >详细</router-link
            >
          </div>
          <div class="content">
            <li class="text_overflow_cut" :title="info.vLogin">
              <i class="iconfont icon-user" /> {{ info.vLogin }}
            </li>
            <li class="text_overflow_cut" :title="info.vOrgName">
              <i class="iconfont icon-apartment" /> {{ info.vOrgName }}
            </li>
            <li class="text_overflow_cut" :title="info.vPhone">
              <i class="iconfont icon-phone" /> {{ info.vPhone }}
            </li>
            <li class="text_overflow_cut" :title="info.vEmail">
              <i class="iconfont icon-mail" /> {{ info.vEmail }}
            </li>
          </div>
        </div>
        <div class="user-box">
          <div class="title">
            <span class="text">系统角色</span>
          </div>
          <div class="content">
            <li v-for="text in info.vRoles" :key="text" class="text_overflow_cut" :title="text">
              {{ text }}
            </li>
          </div>
        </div>
        <div class="user-action">
          <span class="item" @click="clearCacheHandle">清理缓存</span>
          <span class="item" @click="logoutHandle">退出登录</span>
        </div>
      </div>
      <template v-slot:reference>
        <span class="avatar">
          <img class="img" :src="weChatAvatar || info.profileUrl || avatarImg" />
        </span>
      </template>
    </el-popover>
  </div>
</template>

<script>
/*
 * @Author: 焦质晔
 * @Date: 2021-02-13 10:01:08
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-02-14 16:13:16
 */
import { defineComponent } from 'vue';
import { mapActions } from 'vuex';
import { getUserName, getWechatAvatar } from '@/utils/cookies';
import { getUserInfo } from '@/api/application';

import { currentSize } from '@/mixins/sizeMixin';

export default defineComponent({
  name: 'UserCenter',
  mixins: [currentSize],
  data() {
    this.avatarImg = require('@/assets/img/avatar.jpg');
    return {
      username: getUserName() ?? '管理员',
      weChatAvatar: getWechatAvatar() ?? '',
      info: {
        profileUrl: '', // 头像
        vEmail: '', // Email
        vPhone: '', // 手机号
        vLogin: '', // P 码
        vOrgName: '', // 部门
        vDealerName: '', // 经销商名称
        vPersonName: '', // 姓名
        vRoles: [], // 角色列表
      },
      visible: false,
    };
  },
  computed: {
    userCenterCls() {
      return {
        [`user-center`]: !0,
        [`user-center-sm`]: this.$size === 'small',
        [`user-center-lg`]: this.$size === 'large',
      };
    },
  },
  created() {
    this.getUserData();
  },
  methods: {
    ...mapActions('app', ['clearKeepAliveCache', 'createLogout']),
    closePopperHandle() {
      this.visible = !1;
    },
    clearCacheHandle() {
      this.clearKeepAliveCache();
      setTimeout(() => window.history.go(0), 0);
    },
    async getUserData() {
      if (process.env.MOCK_DATA === 'true') {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const res = require('@/mock/userInfo').default;
        this.info = res;
      } else {
        const res = await getUserInfo();
        if (res.code === 200) {
          for (let key in this.info) {
            this.info[key] = res.data[key];
          }
        }
      }
    },
    logoutHandle() {
      // 需要走后台推出接口
      this.createLogout();
    },
  },
});
</script>

<style lang="scss" scoped>
.header__user-center {
  display: flex;
  width: 26px;
  height: 26px;
  align-items: center;
  justify-content: center;
  margin-left: $moduleMargin;
  .avatar {
    display: block;
    overflow: hidden;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    cursor: pointer;
    .img {
      object-fit: cover;
      height: 100%;
    }
  }
}
.user-center {
  max-width: 260px;
  color: $textColor;
  .user-avatar {
    display: flex;
    flex-direction: column;
    align-items: center;
    .avatar {
      display: block;
      overflow: hidden;
      width: 70px;
      height: 70px;
      border-radius: 50%;
      img {
        object-fit: cover;
        height: 100%;
      }
    }
    .name {
      margin-top: 6px;
    }
  }
  .user-box {
    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 40px;
      border-bottom: 1px solid $borderColor;
      box-sizing: border-box;
      .text {
        color: #1a1a1a;
        font-weight: 600;
      }
      .more {
        color: $primaryColor;
      }
    }
    .content {
      display: flex;
      flex-wrap: wrap;
      margin: 0;
      padding-top: 6px;
      line-height: 1.75;
      max-height: 260px;
      overflow-y: auto;
      .iconfont {
        font-size: inherit;
      }
      li {
        width: 50%;
        list-style: none;
      }
    }
  }
  .user-action {
    height: 40px;
    margin: 10px -12px -12px;
    display: flex;
    border-top: 1px solid $borderColor;
    border-bottom-left-radius: $borderRadius;
    border-bottom-right-radius: $borderRadius;
    box-sizing: border-box;
    .item {
      width: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      transition: all 0.3s ease;
      &:hover {
        background-color: $backgroundColorSecondary;
      }
      + .item {
        border-left: 1px solid $borderColor;
      }
    }
  }
  &-sm {
    .content {
      font-size: $textSizeSecondary;
    }
  }
  &-lg {
  }
}
</style>
