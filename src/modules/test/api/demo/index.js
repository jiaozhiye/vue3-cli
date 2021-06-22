/*
 * @Author: 焦质晔
 * @Date: 2021-02-12 21:35:20
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-06-22 14:57:35
 */
import axios from '@/api/fetch';
import SERVER from '../server';

export const demoApi01 = (params) => axios.get(`${SERVER.TEST}/xxx/xxx`, { params });

export const demoApi02 = (params) => axios.post(`${SERVER.TEST}/xxx/xxx`, params);

export const getTableData = (params) =>
  axios.get(`http://127.0.0.1:3000/api/design/getTableData`, { params });

export const getSummationData = (params) =>
  axios.get(`http://127.0.0.1:3000/api/design/getSummationData`, { params });

export const getSelectData = (params) =>
  axios.get(`http://127.0.0.1:3000/api/design/getSelectData`, { params });

export const getTreeData = (params) =>
  axios.get(`http://127.0.0.1:3000/api/design/getTreeData`, { params });

export const getRegionData = (params) =>
  axios.get(`http://127.0.0.1:3000/api/design/getRegionData`, { params });
