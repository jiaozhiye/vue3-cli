/*
 * @Author: 焦质晔
 * @Date: 2020-08-21 15:21:06
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2020-09-02 11:21:08
 */
import axios from '@/api/fetch';
import SERVER from '../server';

// 获取系统参数
export const getSysParams = params => axios.get(`${SERVER.SYS}/stm0002/doSearchNew`, { params });

// 获取省、市数据
export const getCityList = params => axios.get(`${SERVER.SYS}/stm0002/selectProvinceAll`, { params });

// 保存系统参数
export const saveSysParams = params => axios.post(`${SERVER.SYS}/stm0002/doSaveNew`, params);
