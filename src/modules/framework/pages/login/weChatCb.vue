<template>
  <div></div>
</template>

<script>
// https://tst-audiep.faw-vw.com/getAccessToken?code=031tj4Ga1399Iz00cZFa1LZJLN2tj4Gz&state=84281EA7EF300BA3EB9650E8689A539E77E22D1E443CAE594C21C49B26FC5F7C
import { getWechatOpenId } from '@framework/api/login';

export default {
  async created() {
    const { code, state, type } = this.$route.query;
    const res = await getWechatOpenId({ code, state });
    if (res.code === 200) {
      // res.data.wechatInfo -> openid , nickname , headimgurl
      // 登录
      if (type.toString() === '1') {
        window.opener.$$setWeChat({
          openid: res.data.wechatInfo.openid,
          nickname: res.data.wechatInfo.nickname,
          imgurl: res.data.wechatInfo.headimgurl,
        });
      }
      // 个人中心 微信解绑
      if (type.toString() === '2') {
        window.opener.$$bindingWeChat({ openid: res.data.wechatInfo.openid });
      }
    }
    window.close();
  },
};
</script>
