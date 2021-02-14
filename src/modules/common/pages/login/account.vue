<template>
  <el-form ref="form" size="medium" class="v-form" :model="form" :rules="rules">
    <el-form-item prop="account">
      <el-input v-model="form.account" placeholder="账号/手机号/邮箱" autocomplete="on" />
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        v-model="form.password"
        :type="passwordType"
        placeholder="密码"
        autocomplete="on"
        @keyup.enter="enterHandle"
      />
      <span class="show-pwd" @click="showPwdHandle">
        <i :class="['iconfont', passwordType === 'password' ? 'icon-eye-close' : 'icon-eye']" />
      </span>
    </el-form-item>
    <el-form-item v-if="isVcode">
      <el-input v-model="form.vcode" placeholder="验证码" />
      <span class="show-vcode" title="看不清楚？换一张">
        <img v-if="randCodeImage" :src="randCodeImage" @click="handleChangeCheckCode" />
        <img v-else src="./assets/checkcode.png" @click="handleChangeCheckCode" />
      </span>
    </el-form-item>
  </el-form>
</template>

<script>
import { getCheckCode } from '@common/api/login';

export default {
  data() {
    return {
      form: {
        account: '',
        password: '',
        vcode: '',
      },
      rules: {
        account: [{ required: true, message: '账号不能为空', trigger: 'blur' }],
        password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
      },
      passwordType: 'password',
      isVcode: false,
      randCodeImage: '',
    };
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
    async handleChangeCheckCode() {
      const res = await getCheckCode({ vLogin: this.form.account, t: new Date().getTime() });
      if (res.code === 200) {
        this.randCodeImage = res.data;
      }
    },
    showPwdHandle() {
      if (this.passwordType === 'password') {
        this.passwordType = '';
      } else {
        this.passwordType = 'password';
      }
    },
    enterHandle() {
      this.$emit('enter');
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
  ::v-deep(.el-form-item) {
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
  .show-pwd {
    position: absolute;
    right: 5px;
    color: $textColorSecondary;
    line-height: 42px;
    cursor: pointer;
    user-select: none;
    i {
      font-size: 18px;
    }
  }
  .show-vcode {
    position: absolute;
    right: 5px;
    top: 2px;
    cursor: pointer;
  }
}
</style>
