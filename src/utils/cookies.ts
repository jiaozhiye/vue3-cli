/*
 * @Author: 焦质晔
 * @Date: 2021-02-12 15:42:01
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-06-16 14:45:44
 */
import Cookies from 'js-cookie';
import config from '@/config/envMaps';

const options = {
  domain: config.domain,
};

// 架构 cookie
export const getToken = (): string => Cookies.get('jwt', options) ?? '';
export const setToken = (val: string) => Cookies.set('jwt', val, options);
export const removeToken = (): void => Cookies.remove('jwt', options);

export const getUserName = (): string => Cookies.get('username', options) ?? '';
export const setUserName = (val: string) => Cookies.set('username', val, options);
export const removeUserName = (): void => Cookies.remove('username', options);

export const getWechatAvatar = (): string => localStorage.getItem('avatar') ?? '';
export const setWechatAvatar = (val: string) => localStorage.setItem('avatar', val);
export const removeWechatAvatar = (): void => localStorage.removeItem('avatar');

// 业务 cookie
export const get_vDealerName = (): string => Cookies.get('vDealerName', options) ?? '';
export const set_vDealerName = (val: string) => Cookies.set('vDealerName', val, options);
export const remove_vDealerName = (): void => Cookies.remove('vDealerName', options);
