/*
 * @Author: 焦质晔
 * @Date: 2021-02-12 12:43:43
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-06-12 14:26:26
 */
import { t } from '@/locale';
import { ComponentSize } from '@/utils/types';

const BASE_URL: string = process.env.ENV_CONFIG === 'gray' ? '/gray' : '/';
const SIZE_MAP: ComponentSize = 'medium';

export default {
  systemName: t('app.global.title'),
  baseUrl: BASE_URL,
  lang: 'zh-cn', // 语言
  size: SIZE_MAP, // 尺寸
  prefix: '/api', // ajax 请求前缀
  useIframe: true, // 是否使用 iframe 承载路由页面
  maxCacheNum: 10, // 路由组件最大缓存数量
  showBreadcrumb: false, // 是否显示面包屑
  showScreenFull: true, // 是否显示全屏按钮
  showCustomTheme: true, // 是否显示自定义主题
  showLangSelect: true, // 是否显示多语言
  showSizeSelect: true, // 是否显示尺寸选择
  showNotification: true, // 是否显示通知
  openBuryPoint: false, // 是否开启埋点
};
