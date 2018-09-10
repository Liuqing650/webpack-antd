# webpack-antd

## 项目简述

### webpack相关功能

  1. 支持自动刷新浏览器，模块热替换功能，浏览器实时展示错误信息
  2. 支持多种模式下开发、预览、发布， 发布时为 `chunkhash` 文件名
  3. 支持项目分析工具和第三方库提取，针对较大的外部引入模块可配置到 `vendor` 中
  4. 支持 `js`, `jsx`, `css`, `less`, `png`, `svg`, `jpg`, `gif`, `字体` 等
  5. 支持 `eslint`， 遵守 `airbnb` 语法规则校验
  6. 支持按需载入模块 `webpackChunkName: 'YourPage'`
  7. 支持 `antd` 主题自定义
  8. 默认获取 `package.json` 中的： `PORT`，`HOST`， `APIPORT`作为全局静态变量

### React相关功能

  1. `master`分支项目配置 `react` + `antd` + `dva` + `axios` + `mockjs`
  2. `antd-mobx`分支项目配置 `react` + `antd` + `mobx` + `axios` + `mockjs`
  3. 语法支持 `es6`, `es7`

## 使用

**npm安装 install** npm install

**yarn安装** yarn

**开发环境** npm start

**发布到预览环境** npm run preview

**发布到线上环境** npm run build

## 目录结构

```base
webpack-antd
├─src
|  ├─index.js 入口文件
|  ├─index.less 全局样式
|  ├─router.js 路由
|  ├─utils 工具
|  |   ├─config.js web配置
|  |   ├─index.js
|  |   ├─loadable.js 页面动态加载,可配置加载loading效果
|  |   └request.js 请求配置
|  ├─services 请求
|  |    └home.js
|  ├─routes
|  |   ├─SecondPage
|  |   |     └index.js
|  |   ├─HomePage
|  |   |    └index.js
|  ├─models
|  |   └home.js
|  ├─mock mock数据源
|  |  └index.js
|  ├─components
├─public
|   ├─index.html
|   ├─dist 打包文件夹， 发布时上传此文件夹所有文件即可
|   ├─assets 静态资源,打包后将自动复制到 dist目录下,且不会进行压缩
|   |   └favicon.ico
├─.babelrc
├─.eslintignore
├─.eslintrc
├─.gitignore
├─Makefile 执行 npm run preview 的命令文件, Windows下使用 npm run preview:win
├─package.json
├─webpack.config.js webpack 配置文件
```

## 更新日志

查看： [CHANGELOG](https://github.com/Liuqing650/webpack-antd/blob/master/CHANGELOG.md)