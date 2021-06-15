<template>
  <div class="modify-wrapper">
    <div class="title">
      <h4>修改密码</h4>
      <p>为了您的账号安全，请重新设置登录密码</p>
    </div>
    <div class="box">
      <el-form ref="formRest" size="medium" :model="formRest" :rules="rulesRest">
        <input type="password" name="no" class="hidden-input" />
        <el-form-item prop="newPwd">
          <el-input v-model="formRest.newPwd" type="password" placeholder="新密码" />
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
</template>

<script>
import { isFormEmpty, sleep } from '@/utils';
import { pwdValidate } from '@/utils/validate';

import { resetInitPwd } from '@framework/api/login';

export default {
  name: 'ModifyPwd',
  props: ['loginID', 'originPwd'],
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
    async submitHandle() {
      const isPassed = await this.doValidate('formRest');
      if (!isPassed) return;
      const res = await resetInitPwd({
        vLogin: this.loginID,
        oldPwd: this.originPwd,
        newPwd: this.formRest.newPwd,
      });
      if (res.code === 200) {
        this.$message.success('密码修改成功，请重新登录！');
        await sleep(300);
        this.closeHandle();
      }
    },
    closeHandle() {
      this.$emit('close', 'clear_pwd');
    },
  },
};
</script>

<style lang="scss" scoped>
.modify-wrapper {
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
  .box {
    width: 100%;
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
  }
}
</style>
