/*
 * @Author: 焦质晔
 * @Date: 2020-08-21 08:15:29
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-06-15 09:18:42
 */
import axios from '@/api/fetch';
import SERVER from '../server';

// 执行登录
export const doLogin = (params) =>
  axios.post(`${SERVER.SYS}/sysLogin/emp/loginByNameOrPhoneForMany`, params);

// 获取图片验证码
export const getCheckCode = (params) =>
  axios.get(`${SERVER.SYS}/sysLogin/emp/getVerify`, { params });

// 获取短信验证码
export const getCaptcha = (params) =>
  axios.get(`${SERVER.SYS}/sysLogin/emp/sendMsgCodeForUserPhoneLogin`, { params });

// 获取找回密码的验证码
export const getForgetCode = (params) =>
  axios.get(`${SERVER.SYS}/sysLogin/emp/getCheckCodePhoneOrEmail`, { params });

// 确认密码找回
export const confirmPwdBack = (params) =>
  axios.post(`${SERVER.SYS}/sysLogin/emp/checkCodeByPhoneOrEmail`, params);

// 修改密码
export const resetPwd = (params) => axios.post(`${SERVER.SYS}/sysLogin/emp/forgetPassword`, params);

// 获取登陆页面背景图片
export const getLoginBg = (params) =>
  axios.get(`${SERVER.SYS}/auth/stm9999/getLoginImg`, { params });

// 获取微信登录二维码地址
export const getWechatUrl = (params) => axios.get(`${SERVER.SYS}/auth/wechat/w_login`, { params });

// 获取微信 openId
export const getWechatOpenId = (params) =>
  axios.get(`${SERVER.SYS}/auth/wechat/callback`, { params });

// 微信绑定手机号
export const bindPhone = (params) =>
  axios.post(`${SERVER.SYS}/sysLogin/emp/updateWXOpenId`, params);

// 修改初始密码
export const resetInitPwd = (params) =>
  axios.post(`${SERVER.SYS}/sysLogin/emp/forgetPwdByOld`, params);
