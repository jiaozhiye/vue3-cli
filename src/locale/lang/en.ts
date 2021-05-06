/*
 * @Author: 焦质晔
 * @Date: 2021-02-12 13:18:02
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-02-14 10:03:26
 */
export default {
  name: 'en',
  app: {
    global: {
      title: '大众MEP系统',
      home: '首页',
      dashboard: '概览',
      emptyText: '暂无数据',
      noMatch: '抱歉，你访问的页面不存在或仍在开发中',
    },
    sidebar: {
      allNavTitle: 'All Nav',
      allNavPlaceholder: '请输入菜单名称/拼音头',
      usedNav: '常用导航',
      starNav: '我的收藏',
    },
    header: {
      fold: '收起',
      unfold: '展开',
    },
    multiTab: {
      refresh: '刷新当前',
      closeRight: '关闭右侧',
      closeLeft: '关闭左侧',
      closeOthers: '关闭其它',
    },
    settings: {
      usercenter: '个人中心',
      clearcache: '清理缓存',
      logout: '退出登录',
    },
    insideLetter: {
      notice: '通知',
      message: '消息',
      waiting: '待办',
    },
    dreadcrumb: {
      location: '位置导航',
    },
    sizeSelect: {
      large: '大尺寸',
      medium: '中等',
      small: '小尺寸',
    },
    login: {
      title: '系统登录',
      weChat: '微信登录',
    },
    fetch: {
      errorCode: {
        200: '服务器成功返回请求的数据。',
        201: '新建或修改数据成功。',
        202: '一个请求已经进入后台排队（异步任务）。',
        204: '删除数据成功。',
        400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
        401: '用户没有权限（令牌、用户名、密码错误）。',
        403: '用户得到授权，但是访问是被禁止的。',
        404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
        406: '请求的格式不可得。',
        410: '请求的资源被永久删除，且不会再得到的。',
        412: '客户端请求信息的先决条件错误。',
        422: '当创建一个对象时，发生一个验证错误。',
        500: '服务器发生错误，请检查服务器。',
        502: '网关错误。',
        503: '服务不可用，服务器暂时过载或维护。',
        504: '网关超时。',
      },
      errorText: '请求超时。',
      lockText: '锁定请求。',
      cancelText: '取消请求。',
    },
    information: {
      title: '提示信息',
      confirm: '确认进行此操作？',
      maxCache: '最多支持 {total} 个菜单项！',
      maxStar: '最多只能收藏 {total} 个菜单！',
    },
    button: {
      confirm: '确定',
      cancel: '取消',
      close: '关闭',
      submit: '提交',
      remove: '删除',
      edit: '编辑',
      modify: '修改',
      details: '详情',
      view: '查看',
      add: '新建',
      print: '打印',
      export: '导出',
      import: '导入',
      upload: '上传',
      download: '下载',
      search: '搜索',
      reset: '重置',
      save: '保存',
      clear: '清空',
      action: '操作',
      preview: '预览',
    },
  },
};
