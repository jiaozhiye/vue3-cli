## 说明

- EP 管理系统，车厂上下游互通及厂店一体化建设的集成解决方案。

## 前序准备

- 本地安装 nodejs 请使用 v14.16.0 及以上版本，建议使用 nvm 管理。
- 建议使用 yarn 管理 npm 依赖。
- 编译器统一使用 VScode，必要的插件列表：
  - Vetur
  - Prettier
  - EditorConfig
  - ESLint

## 安装

### 使用 yarn 或 npm 安装

```bash
# 安装依赖
$ yarn install 或 npm install

# 启动本地服务
$ npm run dev

# 发布，构建生产环境代码
$ npm run build
```

## 微前端

### 微应用(子系统) + 微模块(业务模块)

### 主机应用充当路由注册中心和分发调度的角色，来调用各子应用页面

| 应用名 | 说明       | 域名      | 端口号 |
| ------ | ---------- | --------- | ------ |
| app    | 主机应用   | localhost | 9020   |
| dms    | DMS 子应用 | localhost | 9021   |
| tds    | TDS 子应用 | localhost | 9022   |

注意：架构 维护 config/sub.env.js 文件(子应用注册)

## 自定义主题

```bash
# config/index.js
primaryColor: '#409eff'
```

## 目录结构

```
├── build                      # webpack 构建相关
├── config                     # webpack 参数配置
├── static                     # 资源文件
├── public                     # 公共资源
│   ├── index.html             # 所有请求
│   ├── favicon.ico            # favicon 图标
├── src                        # 源代码
│   ├── api                    # 所有请求
│   ├── assets                 # 静态资源
│   ├── charts                 # 图表组件
│   ├── components             # 全局公用组件
│   ├── directive              # 全局自定义指令
│   ├── config                 # 全局配置
│   ├── layout                 # 全局 layout
│   ├── locale                 # 多语言支持
│   ├── mixins                 # 全局混入
│   ├── mock                   # 项目 mock 模拟数据
│   ├── modules                # 微前端模块
│   ├── pages                  # 非业务页面
│   ├── router                 # 路由
│   ├── store                  # 全局 store 管理
│   ├── utils                  # 全局公用方法
│   ├── app.tsx                # 根组件
│   ├── index.ts               # 应用入口
│   └── shims-vue.d.ts         # 声明文件
├── babel.config.js            # babel-loader 配置
├── .browserslistrc            # 浏览器兼容配置
├── .editorconfig              # EditorConfig 配置
├── .env.dev                   # 开发环境环境常量
├── .env.prod                  # 生产环境环境常量
├── .eslintignore              # Eslint 忽略清单
├── .eslintrc.js               # Eslint 校验规则
├── .gitignore                 # git 忽略清单
├── .npmrc                     # npm 配置
├── .postcssrc.js              # postcss 配置
├── .prettierrc                # Prettier 配置
├── README.md                  # README.md
├── package.json               # package.json
└── tsconfig.json              # tsconfig.json
```

欢迎访问个人 [github](https://github.com/jiaozhiye) 主页.
