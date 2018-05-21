
> The latest CHANGELOG is written in https://github.com/Liuqing650/webpack-antd/releases .

## `1.0.1`

  - 添加新分支`antd-dva`,配置 `webpack` + `dva`
  - 添加 `axios`
  - 添加 `mockjs`
  - 修复错误日志不显示在屏幕的问题
  - 调整开发模式的控制台日志显示,关闭 `modules: false`
  - 调整构建模块信息.展示运行进度 `--progress`

## `1.0.0`

  - First version
  - 添加webpacke-dev-server配置
  - 添加webpack.dev.config配置和babel
  - 增加 **CHANGELOG** 日志
  - 添加 `url-loader` 支持图片处理，压缩
  - 修改 `css-loader` 路径，支持末尾追加 `hash`
    `localIdentName: '[path]__[name]__[local]__[hash:base64:5]',`
  - 添加 `babel` ES7支持插件: `babel-plugin-transform-decorators-legacy`
  - 添加 `babel` 复用模块插件: `babel-plugin-transform-runtime`
  - 新增多线程打包配置项, `isHappy = true;` 默认开启
  - 修复样式路径错误问题
    ```
      // 删除该插件
      new webpack.LoaderOptionsPlugin({
        options: {
          // Javascript lint
          eslint: { failOnError: eslint },
          debug: isDev,
          minimize: !isDev
        }
      })
    ```
  - 添加错误捕获插件 `react-transform-catch-errors`
  - 添加 `antd` 模块
  - 增加 `less-loader`配置
    以排除 `node_modules/` 下样式名称被误解析.
  - 基本配置完成,可选择 [mobx](https://github.com/mobxjs/mobx) 或者 [redux](https://github.com/reduxjs/redux) 等
