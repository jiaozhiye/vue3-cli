<template>
  <div>
    <el-form ref="form" size="medium" class="v-form" :model="form" :rules="rules">
      <el-form-item prop="account">
        <el-input v-model="form.account" placeholder="手机号" />
      </el-form-item>
      <el-form-item prop="captcha">
        <el-input v-model="form.captcha" placeholder="验证码" />
        <el-button
          type="text"
          style="position: absolute; right: 0; top: 3px"
          :disabled="btnState.disabled"
          @click="clickHandle"
          >{{ (!btnState.disabled && '获取验证码') || `重新发送 ${btnState.time} s` }}</el-button
        >
      </el-form-item>
    </el-form>
    <BaseDialog
      v-model:visible="visible"
      title="滑动校验"
      width="420px"
      :showFullScreen="false"
      destroy-on-close
    >
      <Verify @success="successHandle" @fail="failHandle" />
    </BaseDialog>
  </div>
</template>

<script>
import { sleep } from '@/utils';
import { phoneValidate } from '@/utils/validate';
import { getCaptcha } from '@common/api/login';

import Verify from './verify';

export default {
  components: { Verify },
  data() {
    this.timer = null;
    return {
      form: {
        account: '',
        captcha: '',
      },
      rules: {
        account: [{ required: true, validator: phoneValidate, trigger: 'blur' }],
        captcha: [{ required: true, message: '验证码不能为空', trigger: 'blur' }],
      },
      btnState: {
        time: 60,
        disabled: false,
      },
      isPassed: false,
      visible: false,
    };
  },
  beforeUnmount() {
    clearInterval(this.timer);
  },
  methods: {
    async doValidate() {
      try {
        return await this.$refs.form.validate();
      } catch (err) {
        return err;
      }
      // eslint-disable-next-line no-unreachable
      return false;
    },
    doAccountValidate() {
      return new Promise((resolve, reject) => {
        this.$refs.form.validateField('account', (err) => {
          if (err) {
            reject({ errMsg: err });
          } else {
            resolve();
          }
        });
      });
    },
    async clickHandle() {
      try {
        const errMsg = await this.doAccountValidate();
        if (errMsg) return;
        this.visible = true;
      } catch (err) {
        // ...
      }
    },
    async successHandle() {
      await sleep(500);
      this.isPassed = true;
      this.visible = false;
      // 获取短信验证码
      this.setButtonState(true);
      this.timer = setInterval(() => {
        if (this.btnState.time-- <= 0) {
          this.setButtonState(false);
          clearInterval(this.timer);
        }
      }, 1000);
      this.$message.warning('验证码发送中...');
      const res = await getCaptcha({ vMobile: this.form.account });
      if (res.code === 200) {
        this.$message.success('验证码发送成功，请查收！');
      } else {
        this.setButtonState(false);
        this.form.account = '';
      }
    },
    setButtonState(disabled) {
      this.btnState.time = 60;
      this.btnState.disabled = disabled;
    },
    failHandle() {
      // ...
    },
    async GET_VALUE() {
      const bool = await this.doValidate();
      return [!bool, this.form];
    },
  },
};
</script>

<style lang="scss" scoped>
.v-form {
  >>> .el-form-item {
    margin-bottom: 20px;
    .el-form-item__content {
      position: relative;
      .el-input__inner {
        height: 42px;
        line-height: 42px;
        font-size: 14px;
        border: 0;
        border-bottom: 1px solid $borderColor !important;
      }
      .el-input__icon {
        font-size: 18px;
      }
    }
  }
}
</style>
