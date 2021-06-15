<template>
  <section class="login-outer">
    <div class="login-wrapper" :style="loginWrapStyle">
      <div class="login-title">Welcome to MEP</div>
      <div class="login-content">
        <!-- 账号/免密 登录 -->
        <div v-if="curPanel === 'sign'">
          <div class="flow-tabs">
            <span
              v-for="(item, index) in labels"
              :key="item.key"
              :class="['tab', { active: item.key === curLabel }]"
              @click="clickHandler(index)"
              >{{ item.text }}</span
            >
          </div>
          <div class="container">
            <div class="scroll" :style="scrollTranslate">
              <div class="box">
                <Account ref="sign-account" @enter="loginHandle()" />
                <div class="forget-pwd">
                  <a href="javascript:;" @click="forgetPwdHandle">忘记密码</a>
                </div>
              </div>
              <div class="box">
                <Phone ref="sign-phone" />
              </div>
            </div>
          </div>
        </div>
        <!-- 账号/免密 登录 END -->
        <!-- 微信授权后，手机号绑定 -->
        <div v-if="curPanel === 'bindPhone'">
          <div class="bind-top tc">
            <i class="iconfont icon-arrowleft" @click="backClickHandle"></i>
            <span>绑定手机号</span>
          </div>
          <Phone ref="bindPhone" type="wx" />
        </div>
        <!-- 微信授权后，手机号绑定 END -->
        <div style="padding-top: 20px">
          <el-button
            v-if="curPanel === 'bindPhone'"
            type="primary"
            size="medium"
            :loading="loading"
            class="login-btn"
            @click="bindPhoneHandle"
            >进入系统</el-button
          >
          <el-button
            v-else
            type="primary"
            size="medium"
            :loading="loading"
            class="login-btn"
            @click="loginHandle()"
            >登 录</el-button
          >
        </div>
        <WeChat />
        <div style="height: 10px" />
      </div>
    </div>
    <!-- logo -->
    <div class="logo-right">
      <svg
        fill="#fff"
        width="240"
        height="42"
        viewBox="0 0 5882 1024"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2073.218822 976.824492c-254.551321 0-463.336141-210.229699-463.336141-464.781019a454.3779 454.3779 0 0 1 29.294894-162.332005l270.91456 545.441314c3.612194 7.224388 7.838461 12.859411 16.435484 12.859412s13.292874-5.815633 16.435483-12.859412l124.403966-279.583825c1.444878-2.853633 2.889755-5.707267 5.743388-5.707267s4.262389 2.853633 5.707267 5.707267l124.403966 279.583825c3.142609 7.224388 7.874583 12.859411 16.471605 12.859412s12.859411-5.707267 16.435484-12.859412l270.91456-545.441314a453.619339 453.619339 0 0 1 29.331016 162.332005c0 254.551321-208.784821 464.781019-463.336141 464.781019m0-569.895868c-2.853633 0-4.298511-2.853633-5.743389-5.743389l-145.860399-327.48152a447.912072 447.912072 0 0 1 303.171453 0l-145.643667 327.48152c-1.444878 2.889755-2.853633 5.743389-5.707267 5.743389m-148.099959 335.934054c-2.853633 0-4.298511-2.853633-5.707267-5.707267L1683.535319 261.754541a478.76021 478.76021 0 0 1 166.594394-156.588615l169.448026 377.54653a11.956363 11.956363 0 0 0 12.859412 8.597022h81.527221a11.956363 11.956363 0 0 0 12.859411-8.597022L2296.307932 105.165926a479.374283 479.374283 0 0 1 166.594393 156.588615l-235.840155 475.509236c-1.444878 2.853633-2.889755 5.707267-5.743388 5.707267s-4.262389-2.853633-5.707267-5.707267l-88.679366-203.077554a11.920241 11.920241 0 0 0-12.859411-8.5609h-81.635587a11.920241 11.920241 0 0 0-12.859412 8.5609l-88.715487 203.077554c-1.444878 2.853633-2.889755 5.707267-5.743389 5.707267m148.099959 281.028703a511.992396 511.992396 0 1 0-511.956274-511.956274 511.450567 511.450567 0 0 0 511.956274 511.956274M678.58679 99.530903c171.651465 0 332.32186 44.935695 452.644046 126.426794 114.470432 77.77054 177.539342 179.237073 177.539342 285.7968s-63.06891 208.02626-177.539342 285.760678c-120.213821 81.635587-280.992582 126.607404-452.644046 126.607404s-332.32186-44.971817-452.644047-126.607404c-114.470432-77.734418-177.539342-179.237073-177.539342-285.760678s63.06891-208.02626 177.539342-285.7968c120.249943-81.635587 280.992582-126.426795 452.644047-126.426794m0-48.403402C303.821648 51.127501 0 257.419908 0 511.898985s303.821648 460.771484 678.58679 460.771484 678.58679-206.147919 678.586789-460.626996S1053.351931 51.271989 678.58679 51.271989z"
          fill="#ffffff"
          p-id="5031"
        ></path>
        <path
          d="M565.850211 684.020035v-83.55005l-82.032929 43.34633H268.205414l18.819532 46.777914a51.654376 51.654376 0 0 0 46.958523 30.450796h162.006907zM732.914189 746.583238V183.333807h-41.86533l-101.61102 43.021232a21.456433 21.456433 0 0 0-13.617972 19.686458v32.509747h29.836723a17.266288 17.266288 0 0 1 18.6028 18.566678v449.429194a18.566678 18.566678 0 0 1-19.830946 19.830946h-38.578233v74.338955h225.473158v-74.338955h-38.614356a18.530556 18.530556 0 0 1-19.794824-19.794824zM565.850211 431.852763V354.660174H151.567666l18.964019 46.777914a51.401523 51.401523 0 0 0 46.70567 30.414675zM565.850211 566.334751V489.142162H205.7867l18.964019 46.777914a51.401523 51.401523 0 0 0 46.70567 30.414675zM791.323369 566.334751V489.142162h360.063511l-18.819532 46.777914a51.401523 51.401523 0 0 1-46.958523 30.414675zM879.713759 354.660174v-21.492555h-88.354268v98.685144h348.432246a51.509888 51.509888 0 0 0 46.958523-30.414675l18.927898-46.777914zM941.554523 643.852437l-69.968201-37.061112h-80.262953v77.22871h68.631688l69.9682 37.061112h93.266853a51.582132 51.582132 0 0 0 46.958524-30.450796l18.819531-46.777914z"
          fill="#ffffff"
          p-id="5032"
        ></path>
        <path
          d="M5173.528924 741.453922h-47.391987l-81.816197 226.881914h48.403401l14.448777-45.838744h84.778196l14.954484 45.838744h48.403401z m-23.479262 140.153132h-29.40326l28.897553-90.304853 0.469585 0.469585 28.897553 89.799147zM2893.331378 272.663368h545.585802v98.25168H2893.331378zM4238.367985 270.712783h196.033776v93.772559h-196.033776zM3907.707734 73.198008l12.931655-21.926019h-111.978018l-13.979191 21.926019c-8.994363 13.437362-15.929776 15.460191-33.918503 15.46019h-18.964019v92.797268h46.416695c39.409038 0 59.312228-1.517122 75.856076-23.984969h288.289214V73.198008zM3641.886368 385.905654h66.825592l-0.469586-83.802904h-26.98309c-15.965898 0-27.922261-3.612194-33.376674-18.927897l-20.986847-49.992767h-106.198508l37.891917 103.236508c15.460191 42.009818 41.395745 49.48706 83.297196 49.48706zM3741.619048 203.851069h410.489741v81.274368h-410.489741zM3741.619048 410.324086h224.425622l-222.944622 133.181598v76.28954h409.008741v-84.272489h-209.976845l209.976845-132.170184V327.532596h-410.489741v82.79149zM3579.03419 509.587181c-5.96012 19.469726-13.473484 24.960261-35.905209 24.960261h-16.977313v85.139416h55.483302c53.388229 0 81.780075-11.486777 95.795388-66.319884l32.943211-129.208184h-107.282166zM3657.852266 203.345362h50.859694V118.567166h-30.414675c-15.965898 0-23.984969-2.456292-29.439382-17.446898l-15.424069-42.371037H3527.66879l34.929917 96.734559c16.435483 45.40528 48.872987 47.861572 95.253559 47.861572zM5873.716635 534.547442c-16.94119 0-21.420311-7.007657-26.910846-27.92226l-38.361502-146.149375h-54.182912l19.578092-63.321763h-105.6928l-65.344592 207.954016c-6.501949 20.950726-10.475363 29.439382-27.452675 29.439382h-8.452535v85.139416h48.403402c47.897694 0 60.865471-7.007657 76.361784-56.855936l36.808258-118.913431 28.500212 116.890603c11.956363 50.390108 24.92414 58.878764 70.799005 58.878764h53.893936v-85.139416zM5530.124729 534.547442c-16.977312 0-20.986848-7.007657-26.946968-27.92226l-38.397624-146.149375h-53.677205l19.758702-63.321763h-106.234629l-66.283763 207.954016c-6.538071 20.950726-10.511485 29.439382-27.488797 29.439382h-6.971535v85.139416h47.897695c47.861572 0 60.793227-7.007657 76.253418-56.855936l37.133355-119.202406 28.247359 117.143456c12.46207 50.390108 24.92414 58.878764 70.835127 58.878764h53.821692v-85.103294zM5688.700051 152.991376l36.880502 73.797126c19.975434 40.420452 42.98511 48.909109 86.295318 48.909109h55.880644V191.425122h-16.471606c-16.977312 0-27.416553 0-40.890037-29.439383l-47.861573-103.236508h-410.489741l-47.897694 103.236508c-13.906947 29.439382-23.407018 29.439382-40.348208 29.439383h-17.446898v84.272489h59.817935c43.34633 0 66.319884-7.982949 85.283903-48.909109l33.918503-73.797126zM4760.546769 52.283404v81.743953h-254.190101v93.917047h233.383863l-162.223639 272.540048c-15.965898 24.454554-28.897553 33.918503-57.32552 33.918502h-15.965899v85.283904h45.874866c61.4073 0 87.27061 0 122.164405-58.373057l148.641789-248.338347 148.605667 248.338347c34.42421 58.373057 60.359764 58.373057 122.200527 58.373057h45.910988v-85.139416h-18.422191c-28.897553 0-38.939453-9.463949-54.941472-33.918503l-162.043029-272.829023h233.419985v-93.917047h-255.382125V52.283404zM3166.666108 741.526166H3118.768414l-81.816197 226.918035h48.403401l14.954484-45.910987h84.778196l14.448777 45.910987h48.403401z m-23.948847 140.11701h-29.475504l29.475504-89.763024 29.40326 89.763024zM3008.993834 741.526166v42.876744h-71.774297v47.355865h71.774297v42.912867h-71.774297v93.917047h-44.899573v-227.062523zM3571.051241 847.255088h87.776318v38.867209h-87.776318zM3909.730563 741.526166h-48.403401l-57.361643 176.997512-57.361643-176.997512h-48.367279l81.816197 226.918035h47.861572zM4039.408332 738.889264c-72.857956 0-107.751751 52.376815-107.75175 115.590213 0 64.333177 34.893795 116.709992 107.75175 116.709992 72.243883 0 107.715629-52.376815 107.71563-116.709992 0-63.105031-35.435624-115.590212-107.71563-115.590213z m0 194.516654c-42.407159 0-61.840764-35.435624-61.840763-78.781954s19.433604-77.806662 61.840763-77.806661c41.829208 0 61.4073 34.929917 61.407301 77.806661s-19.578092 78.89032-61.407301 78.89032zM4199.970362 968.408079v-226.918035h43.382451v188.520412h73.797126v38.397623h-117.179577zM4480.240504 968.408079l-72.785711-109.23275v109.23275h-43.382452v-226.918035h43.382452v102.766923l73.327541-102.766923h52.8464l-82.827612 109.232751 86.801025 117.685284h-57.361643zM4576.5416 967.432787v-41.359623a149.833813 149.833813 0 0 0 46.958524 7.946827c21.926018 0 39.372916-8.994363 39.372916-29.908967 0-43.34633-92.797267-26.441261-95.289681-98.287802-1.444878-40.38433 31.931796-68.306591 86.331439-68.306591a274.851852 274.851852 0 0 1 38.867209 4.47912v38.903331a141.092303 141.092303 0 0 0-40.890037-6.971535c-24.92414 0-37.928038 11.486777-37.928039 27.922261 0 39.914745 91.316268 24.454554 95.289681 96.228852 1.986707 34.929917-17.446898 62.852178-49.848279 70.871249-24.526798 5.454413-57.470009 3.973414-82.863733-1.517122zM4912.186679 741.453922l43.346329 168.075393 40.962282-168.075393h43.346329l-57.32552 226.881914h-52.918645l-40.348208-160.56203-40.38433 160.56203h-52.846401l-57.361642-226.881914h43.346329l40.890038 168.075393 43.346329-168.075393zM5462.757308 790.326909c-56.855936-23.44314-141.128425-16.977312-143.115131 65.30847-1.481 59.384472 46.958524 87.306732 100.238387 72.857955v-79.468271h43.888159v112.37536c-85.247782 28.897553-191.988118 5.96012-191.988118-104.75363 0-70.835127 48.331157-118.696699 126.643526-118.696699a223.414207 223.414207 0 0 1 64.333177 9.463948zM5518.60183 968.335836v-226.881914h123.248064v36.880502h-79.359906v55.338814h75.35037v35.941332h-75.35037v61.335056h79.359906v37.38621h-123.248064zM5689.675344 741.453922h54.363522l92.255438 157.094323v-157.094323h40.926159v226.881914H5822.856941l-91.785852-156.552494v156.552494h-41.395745v-226.881914zM3251.408182 741.526166h43.34633l39.734136 158.575322 33.918502-158.575322h49.884401l33.412796 158.575322 39.734136-158.575322h43.346329l-59.312227 226.918035h-50.353987l-31.895674-155.107616-31.931796 155.107616h-50.570718z"
          fill="#ffffff"
          p-id="5033"
        ></path>
      </svg>
    </div>
    <div class="logo-l">
      <svg
        fill="#fff"
        width="50"
        height="50"
        viewBox="0 0 56 56"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M28 52.7C14.5 52.7 3.4 41.5 3.4 28c0-2.8.5-5.5 1.4-8.1l14.4 28c.2.4.4.7.9.7s.7-.3.9-.7L27.7 33c.1-.2.2-.3.3-.3.2 0 .2.2.3.3l6.8 14.9c.2.4.4.7.9.7s.7-.3.9-.7l14.4-28c.9 2.5 1.4 5.2 1.4 8.1-.1 13.5-11.2 24.7-24.7 24.7zm0-31.1c-.2 0-.2-.2-.3-.3L20 4.7c2.5-.9 5.2-1.4 8-1.4s5.5.5 8 1.4l-7.7 16.6c-.1.1-.1.3-.3.3zm-8.1 18c-.2 0-.2-.2-.3-.3L7 15.1c2.2-3.6 5.4-6.6 9.1-8.7L25 25.6c.2.4.4.5.7.5h4.6c.3 0 .5-.1.7-.5l8.8-19.2c3.7 2.1 6.9 5.1 9.1 8.7L36.4 39.3c-.1.2-.2.3-.3.3-.2 0-.2-.2-.3-.3L31 28.7c-.2-.4-.4-.5-.7-.5h-4.6c-.3 0-.5.1-.7.5l-4.8 10.6c-.1.1-.1.3-.3.3zM28 56c15.5 0 28-12.5 28-28S43.5 0 28 0 0 12.5 0 28s12.5 28 28 28z"
        ></path>
      </svg>
    </div>
    <!-- logo END -->
    <div v-if="!isWebkit" class="browser-alert tc">
      您使用的浏览器版本过旧，为了更好的访问体验，请升级浏览器至
      <a
        title="下载"
        href="https://dl.google.com/release2/chrome/CUtGVpXHPGLv_SbZcTshgQ_87.0.4280.88/87.0.4280.88_chrome_installer.exe"
        >谷歌浏览器</a
      >
    </div>
    <qm-dialog
      v-model:visible="visible1"
      title="忘记密码"
      width="400px"
      :showFullScreen="false"
      destroy-on-close
    >
      <BackPwd @close="backPwdColose" />
    </qm-dialog>
    <qm-dialog
      v-model:visible="visible3"
      title="修改密码"
      width="400px"
      :showFullScreen="false"
      destroy-on-close
    >
      <ModifyPwd :loginID="loginID" :originPwd="originPwd" @close="modifyPwdColose" />
    </qm-dialog>
    <qm-dialog
      v-model:visible="visible2"
      title="选择经销商"
      width="50%"
      :showFullScreen="false"
      destroy-on-close
      :containerStyle="{ paddingBottom: '52px' }"
      @close="checkDealerColose"
    >
      <CheckDealer :list="dealerList" @confirm="checkDealerConfirm" @close="checkDealerColose" />
    </qm-dialog>
  </section>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import CryptoJS from 'crypto-js';

import { sleep, loadScript } from '@/utils';
import { setWechatAvatar } from '@/utils/cookies';
import { doLogin, bindPhone, getLoginBg } from '@framework/api/login';

import Account from './account';
import Phone from './phone';
import WeChat from './weChat';
import BackPwd from './backPwd';
import ModifyPwd from './modifyPwd';
import CheckDealer from './checkDealer';

import defaultBg from './assets/login-default.jpg';
const localLoginBg = localStorage.getItem('login_bg');

const AESEncrypt = (str, key, iv) => {
  const encrypted = CryptoJS.AES.encrypt(str, CryptoJS.enc.Utf8.parse(key), {
    iv: CryptoJS.enc.Utf8.parse(iv),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.toString();
};

export default {
  name: 'Login',
  components: { Account, Phone, WeChat, BackPwd, ModifyPwd, CheckDealer },
  data() {
    this.labels = [
      { key: 'account', text: '用户名登录' },
      { key: 'phone', text: '免密码登录' },
    ];
    return {
      bgUrl: localLoginBg || defaultBg,
      panels: ['sign', 'bindPhone'],
      curPanel: 'sign',
      curLabel: 'account',
      dealerList: [],
      vIp: '',
      vCity: '',
      loginID: '',
      originPwd: '',
      loading: false,
      visible1: false,
      visible2: false,
      visible3: false,
    };
  },
  computed: {
    ...mapState('app', ['weChat']),
    isWebkit() {
      return this.isBrowseType('AppleWebKit') && !this.isBrowseType('Edge');
    },
    loginWrapStyle() {
      return { backgroundImage: `url(${this.bgUrl})` };
    },
    scrollTranslate() {
      const index = this.labels.findIndex((x) => x.key === this.curLabel);
      const val = -1 * (index / this.labels.length) * 100 + '%';
      return {
        transform: `translate3d(${val}, 0, 0)`,
      };
    },
    currentRef() {
      return this.curPanel === 'sign' ? `${this.curPanel}-${this.curLabel}` : this.curPanel;
    },
  },
  watch: {
    curPanel() {
      this.curLabel = this.labels[0].key;
    },
    [`weChat.openid`](val) {
      if (!val) return;
      this.loginHandle();
    },
  },
  mounted() {
    window.$$setWeChat = this.createWeChat;
    this.getLoginImage();
    this.getIpInfo();
  },
  methods: {
    ...mapActions('app', ['createLoginInfo', 'createWeChat']),
    isBrowseType(type) {
      return navigator.userAgent.indexOf(type) > -1;
    },
    clickHandler(index) {
      this.curLabel = this.labels[index].key;
    },
    forgetPwdHandle() {
      this.visible1 = !0;
    },
    backClickHandle() {
      this.curPanel = 'sign';
      this.createWeChat();
    },
    async getLoginImage() {
      const res = await getLoginBg();
      if (res.code === 200) {
        this.bgUrl = res.data?.vUrl || defaultBg;
        localStorage.setItem('login_bg', this.bgUrl);
      }
    },
    getIpInfo() {
      loadScript('https://pv.sohu.com/cityjson?ie=utf-8', () => {
        // console.log(
        //   `IP: ${window.returnCitySN['cip']}; CityID: ${window.returnCitySN['cid']}; City: ${window.returnCitySN['cname']}`
        // );
        this.vIp = window.returnCitySN['cip'];
        this.vCity = window.returnCitySN['cname'];
      });
    },
    async loginHandle(dealerId) {
      const ref_str =
        this.curPanel === 'sign' ? `${this.curPanel}-${this.curLabel}` : this.curPanel;
      const loginType = !this.weChat.openid ? (this.curLabel === 'account' ? 1 : 0) : 2;
      let err, data;
      if (loginType !== 2) {
        [err, data] = await this.$refs[ref_str].GET_VALUE?.();
        if (err) return;
      }
      this.loading = !0;
      try {
        const res = await doLogin({
          loginType,
          nDID: dealerId,
          vLogin: data?.account ?? this.weChat.openid ?? '',
          vPwd: data?.password
            ? AESEncrypt(data.password, '20201010081240ff', '0102030405060708')
            : '',
          vIp: this.vIp,
          vCity: this.vCity,
          imgCheck: data?.vcode,
          msgCode: data?.captcha,
        });
        if (res.code === 200) {
          const { jwt, rData } = res.data;
          if (!jwt && Array.isArray(res.data)) {
            this.dealerList = res.data;
            return (this.visible2 = !0);
          }
          this.createLoginInfo({
            id: rData?.iD || '',
            name: rData?.vPersonName || '',
            token: jwt || 'jwt',
            gray: rData?.grayCode || 0,
            vDealerName: rData?.vDealerName || '',
          });
          // 存储微信头像
          if (loginType === 2) {
            setWechatAvatar(this.weChat.imgurl || '');
          }
          await sleep(0);
          const { redirect } = this.$route.query;
          // grayCode -> 0 生产，1 灰度
          if (rData.grayCode) {
            window.location = !redirect ? '/gray' : `/gray/#/${redirect.slice(1)}`;
          } else {
            this.$router.push({ path: !redirect ? '/' : redirect });
          }
          await sleep(1000);
        }
        // 需要显示验证码
        if (res.code === 991) {
          this.$refs[ref_str].isVcode = !0;
          this.$refs[ref_str].handleChangeCheckCode();
        }
        // 验证码错误
        if (res.code === 992) {
          this.$refs[ref_str].handleChangeCheckCode();
        }
        // 微信授权，绑定手机号
        if (res.code === 994) {
          this.curPanel = 'bindPhone';
        }
        // 初始密码 或 三个月未修改过密码
        if (res.code === 995 || res.code === 996) {
          this.loginID = data.account;
          this.originPwd = data.password;
          this.visible3 = !0;
        }
      } catch (err) {
        // ...
      }
      this.loading = !1;
    },
    async bindPhoneHandle() {
      const [err, data] = await this.$refs[this.curPanel].GET_VALUE?.();
      if (err) return;
      const res = await bindPhone({
        vWXOpenID: this.weChat.openid,
        vMobile: data.account,
        msgCode: data.captcha,
      });
      if (res.code === 200) {
        this.loginHandle();
      }
    },
    async checkDealerConfirm(row) {
      await this.loginHandle(row?.nDID);
    },
    backPwdColose() {
      this.visible1 = !1;
    },
    modifyPwdColose(type) {
      this.visible3 = !1;
      if (type === 'clear_pwd') {
        this.$refs[`sign-account`]?.CLEAR_PWD();
      }
    },
    checkDealerColose() {
      this.visible2 = !1;
      this.loading = !1;
    },
  },
};
</script>

<style lang="scss" scoped>
.login-outer {
  position: relative;
  background: #f0f0f0 url(./assets/login_bg.svg) no-repeat 50%;
  background-size: contain;
}
.login-wrapper {
  width: 100%;
  height: 100vh;
  background-position: 50% 0;
  background-repeat: no-repeat;
  background-size: cover;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .login-title {
    margin-bottom: 20px;
    margin-top: -10vh;
    font-size: 42px;
    line-height: 1;
    color: #fff;
    font-family: 'VW Text Light';
    font-weight: 400;
    user-select: none;
  }
  .login-content {
    position: relative;
    width: 400px;
    padding: 0 15px;
    border-radius: $borderRadius;
    background-color: #fff;
    box-shadow: $boxShadow;
    box-sizing: border-box;
    .flow-tabs {
      display: flex;
      .tab {
        position: relative;
        padding: 12px 0;
        margin-right: 20px;
        font-size: 16px;
        cursor: pointer;
        &.active {
          color: #1a1a1a;
          font-weight: 600;
          &::after {
            display: block;
            position: absolute;
            bottom: 0;
            content: '';
            width: 100%;
            height: 3px;
            background-color: $primaryColor;
          }
        }
      }
    }
    .container {
      width: 100%;
      padding-top: 20px;
      overflow: hidden;
      .scroll {
        width: 200%;
        display: flex;
        transition: transform 0.3s ease;
        .box {
          width: 50%;
        }
      }
    }
    .login-btn {
      width: 100%;
      height: 42px;
      font-size: 14px;
    }
    .forget-pwd {
      margin-top: -5px;
      text-align: right;
      a {
        font-size: 13px;
        &:hover {
          color: $primaryColor;
        }
      }
    }
    .bind-top {
      position: relative;
      margin-top: 15px;
      line-height: 32px;
      i {
        position: absolute;
        left: 0;
        font-size: 24px;
        cursor: pointer;
      }
      span {
        font-size: 24px;
      }
    }
  }
}
.logo-l {
  position: fixed;
  left: 10vw;
  bottom: 20vh;
  width: 50px;
  height: 50px;
  &::before {
    display: block;
    content: '';
    position: absolute;
    left: 50%;
    bottom: 60px;
    margin-left: -1.5px;
    width: 3px;
    height: 1000px;
    background-color: #fff;
  }
  &::after {
    display: block;
    content: '';
    position: absolute;
    left: 50%;
    top: 60px;
    margin-left: -1.5px;
    width: 3px;
    height: 1000px;
    background-color: #fff;
  }
}
.logo-right {
  position: fixed;
  right: 5vw;
  top: 5vh;
}
.browser-alert {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  line-height: 2;
  background-color: rgb(255, 255, 190);
  a {
    color: #1587ce;
    text-decoration: underline;
  }
}
</style>
