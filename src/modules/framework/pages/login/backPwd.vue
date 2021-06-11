<template>
  <div class="forget-wrapper">
    <div class="title">
      <h4>找回密码</h4>
      <p>验证码将发送到您注册的手机或邮箱</p>
    </div>
    <div class="scroll" :style="scrollTranslate">
      <div class="box">
        <el-form ref="form" size="medium" :model="form" :rules="rules">
          <el-form-item prop="phone">
            <el-input v-model="form.phone" placeholder="手机号或邮箱" />
          </el-form-item>
          <el-form-item prop="captcha">
            <el-input v-model="form.captcha" placeholder="验证码" />
            <el-button
              type="text"
              style="position: absolute; right: 0; top: 3px"
              :disabled="btnState.disabled"
              @click="clickHandle"
              >{{
                (!btnState.disabled && '获取验证码') || `重新发送 ${btnState.time} s`
              }}</el-button
            >
          </el-form-item>
        </el-form>
        <el-button type="primary" size="medium" class="next-btn" @click="nextHandle"
          >下一步</el-button
        >
      </div>
      <div class="box">
        <el-form ref="formRest" size="medium" :model="formRest" :rules="rulesRest">
          <input type="password" name="no" class="hidden-input" />
          <el-form-item prop="newPwd">
            <el-input v-model="formRest.newPwd" placeholder="新密码" />
          </el-form-item>
          <el-form-item prop="confirmPwd">
            <el-input v-model="formRest.confirmPwd" type="password" placeholder="确认密码" />
          </el-form-item>
        </el-form>
        <el-button type="primary" size="medium" style="width: 100%" @click="submitHandle"
          >重置密码</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { isFormEmpty, sleep } from '@/utils';
import { pwdValidate } from '@/utils/validate';
import { getForgetCode, confirmPwdBack, resetPwd } from '@framework/api/login';

const isPhone = (val) => /^1[2-9]\d{9}$/.test(val);
const isEmail = (val) => /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(val);

const phoneOrEmail = (rule, value, callback) => {
  if (rule.required && isFormEmpty(value)) {
    return callback(new Error('手机号或邮箱不能为空'));
  }
  if (isFormEmpty(value) || isPhone(value) || isEmail(value)) {
    return callback();
  }
  callback(new Error('手机号或邮箱格式不正确'));
};

export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (rule.required && isFormEmpty(value)) {
        return callback(new Error('请再次输入密码'));
      }
      if (value !== this.formRest.newPwd) {
        return callback(new Error('两次输入密码不一致'));
      }
      callback();
    };
    this.timer = null;
    return {
      form: {
        phone: '',
        captcha: '',
      },
      rules: {
        phone: [{ required: true, validator: phoneOrEmail, trigger: 'blur' }],
        captcha: [{ required: true, message: '验证码不能为空', trigger: 'blur' }],
      },
      stepIndex: 0,
      btnState: {
        time: 60,
        disabled: false,
      },
      formRest: {
        newPwd: '',
        confirmPwd: '',
      },
      rulesRest: {
        newPwd: [{ required: true, validator: pwdValidate, trigger: 'blur' }],
        confirmPwd: [{ required: true, validator: validatePass, trigger: 'blur' }],
      },
    };
  },
  computed: {
    scrollTranslate() {
      const val = -1 * (this.stepIndex / 2) * 100 + '%';
      return {
        transform: `translate3d(${val}, 0, 0)`,
      };
    },
  },
  beforeUnmount() {
    clearInterval(this.timer);
  },
  methods: {
    async doValidate(formType) {
      try {
        return await this.$refs[formType].validate();
      } catch (err) {
        return false;
      }
      // eslint-disable-next-line no-unreachable
      return false;
    },
    doAccountValidate() {
      return new Promise((resolve, reject) => {
        this.$refs.form.validateField('phone', (err) => {
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
        // 获取短信验证码
        this.setButtonState(true);
        this.timer = setInterval(() => {
          if (this.btnState.time-- <= 0) {
            this.setButtonState(false);
            clearInterval(this.timer);
          }
        }, 1000);
        this.$message.warning('验证码发送中...');
        // 判断是手机号还是邮箱
        const isPhoneType = isPhone(this.form.phone);
        const res = await getForgetCode({
          type: isPhoneType ? 0 : 1,
          vMobileOrEmail: this.form.phone,
        });
        if (res.code === 200) {
          this.$message.success(`验证码发送成功，请在${isPhoneType ? '手机' : '邮箱'}查收！`);
        } else {
          this.setButtonState(false);
          this.form.phone = '';
        }
      } catch (err) {
        // ...
      }
    },
    setButtonState(disabled) {
      this.btnState.time = isPhone(this.form.phone) ? 60 : 60 * 5;
      this.btnState.disabled = disabled;
    },
    async nextHandle() {
      try {
        const isPassed = await this.doValidate('form');
        if (!isPassed) return;
        const res = await confirmPwdBack({
          vMobileOrEmail: this.form.phone,
          code: this.form.captcha,
        });
        if (res.code === 200) {
          this.stepIndex = 1;
        }
      } catch (err) {
        // ...
      }
    },
    async submitHandle() {
      const isPassed = await this.doValidate('formRest');
      if (!isPassed) return;
      const res = await resetPwd({
        vMobileOrEmail: this.form.phone,
        vPwd: this.formRest.newPwd,
        code: this.form.captcha,
      });
      if (res.code === 200) {
        this.$message.success('密码修改成功！');
        await sleep(300);
        this.closeHandle();
      }
    },
    closeHandle() {
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss" scoped>
.forget-wrapper {
  overflow: hidden;
  margin: 5px;
  .title {
    margin-bottom: 20px;
    h4 {
      font-size: 18px;
      color: #1a1a1a;
      font-weight: 600;
    }
    p {
      color: $textColorSecondary;
    }
  }
  .scroll {
    width: 200%;
    display: flex;
    transition: transform 0.3s ease;
    .box {
      width: 50%;
      ::v-deep(.el-form) {
        position: relative;
        .hidden-input {
          opacity: 0;
          position: absolute;
          padding: 0;
          border: 0;
          width: 0;
          height: 0;
          left: 0;
          top: -1px;
          z-index: -1;
        }
        .el-form-item {
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
      .next-btn {
        width: 100%;
        margin-top: 20px;
        font-size: 14px;
      }
    }
  }
}
</style>
