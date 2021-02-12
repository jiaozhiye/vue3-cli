<template>
  <div class="wechat-login">
    <span>社交帐号登录</span>
    <div>
      <button class="el-button el-button--text el-button--medium v-button" @click="clickHandle">
        <SvgIcon class="icon-wechat" icon-class="wechat" /> <span>微信</span>
      </button>
    </div>
  </div>
</template>

<script>
import { getWechatUrl } from '@common/api/login';
import { messageAction } from '@/utils';

export default {
  data() {
    return {
      wechatUrl: '',
    };
  },
  created() {
    this.getWechatLocation();
  },
  methods: {
    clickHandle() {
      if (!this.wechatUrl) {
        return messageAction('获取微信登录二维码失败！', 'error');
      }
      window.open(
        this.wechatUrl,
        '_blank',
        'top=200,left=300,width=600,height=550,menubar=no,toolbar=no,status=no,scrollbars=yes'
      );
    },
    async getWechatLocation() {
      const res = await getWechatUrl();
      if (res.code === 200) {
        this.wechatUrl = res.data.url;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.wechat-login {
  display: flex;
  height: 40px;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  .v-button {
    color: $textColor;
    .icon-wechat {
      width: 20px;
      height: 20px;
    }
    & > svg,
    & > span {
      vertical-align: middle;
    }
    &:hover {
      color: #4cb63a;
    }
  }
}
</style>
