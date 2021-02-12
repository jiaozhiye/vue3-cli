/*
 * @Author: 焦质晔
 * @Date: 2021-02-12 15:42:01
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-02-12 23:43:31
 */
import Cookies from 'js-cookie';

// 架构 cookie
export const getToken = (): string => Cookies.get('jwt') ?? '';
export const setToken = (val: string) => Cookies.set('jwt', val);
export const removeToken = (): void => Cookies.remove('jwt');

export const getGray = (): string => localStorage.getItem('gray') ?? '';
export const setGray = (val: string) => localStorage.setItem('gray', val);
export const removeGray = (): void => localStorage.removeItem('gray');

export const getUserName = (): string => Cookies.get('username') ?? '';
export const setUserName = (val: string) => Cookies.set('username', val);
export const removeUserName = (): void => Cookies.remove('username');

export const getWechatAvatar = (): string => localStorage.getItem('avatar') ?? '';
export const setWechatAvatar = (val: string) => localStorage.setItem('avatar', val);
export const removeWechatAvatar = (): void => localStorage.removeItem('avatar');

// 业务 cookie
export const get_vDealerName = (): string => Cookies.get('vDealerName') ?? '';
export const set_vDealerName = (val: string) => Cookies.set('vDealerName', val);
export const remove_vDealerName = (): void => Cookies.remove('vDealerName');
