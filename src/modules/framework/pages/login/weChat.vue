<template>
  <div class="wechat-login">
    <span>社交帐号登录</span>
    <div>
      <button class="el-button el-button--text el-button--medium v-button" @click="clickHandle">
        <svg fill="#60c84d" viewBox="0 0 24 24" width="20" height="20">
          <path
            d="M2.224 21.667s4.24-1.825 4.788-2.056C15.029 23.141 22 17.714 22 11.898 22 6.984 17.523 3 12 3S2 6.984 2 11.898c0 1.86.64 3.585 1.737 5.013-.274.833-1.513 4.756-1.513 4.756zm5.943-9.707c.69 0 1.25-.569 1.25-1.271a1.26 1.26 0 0 0-1.25-1.271c-.69 0-1.25.569-1.25 1.27 0 .703.56 1.272 1.25 1.272zm7.583 0c.69 0 1.25-.569 1.25-1.271a1.26 1.26 0 0 0-1.25-1.271c-.69 0-1.25.569-1.25 1.27 0 .703.56 1.272 1.25 1.272z"
            fill-rule="evenodd"
          ></path>
        </svg>
        <span>微信</span>
      </button>
    </div>
  </div>
</template>

<script>
import { getWechatUrl } from '@framework/api/login';
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
    svg {
      margin-right: 4px;
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
