
> The latest CHANGELOG is written in https://github.com/Liuqing650/webpack-antd/releases .

## `1.0.2`

  - 针对 `webpack.config.js` 中潜在问题做了优化和修复
  - 删除多线程压缩插件 `webpack-parallel-uglify-plugin`, 由于可能会在压缩后 `manifest.js` 的 `hash` 值不一致，导致页面访问报错
  - 使用 `uglifyjs-webpack-plugin` 替换原有的压缩方案， 压缩效果更好，且压缩时间有所缩减
  - `webpack.config.js` 中原有的 `eslint` 配置无效，现已提取 `loaders` 配置到 `webpackLoaders()` 方法中， 默认开启`eslint`
  - 修改 `package.json` 的配置， 新增部分启动参数以及一个构建分析工具 `webpack-bundle-analyzer`， 构建分析命令 `npm run analyzer`
    `package.json` 新增启动参数： `PREVIEW` 开启预览模式， `HOST` 和 `APIPORT` 是后台 `API` 访问主机及端口，默认打包时后将在同一台服务器上运行
  - `package.json` 新增启动端口配置： `PORT` 配置在 `webpack.devServer` 中可生效，默认服务端口：`3000`
  - 修复潜在问题， `node_modules` 中少部分引用库中的 `css` 解析时报错： `window is not defined` 错误，导致启动或编译失败
    修复点：
      ```js
        /* 修正前 */
        {
          test: /\.css$/,
          include: /node_modules/,
          use: ExtractTextPlugin.extract(['css-loader', 'postcss-loader'])
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: ExtractTextPlugin.extract(['css-loader', 'postcss-loader'])
        }
        /* 修正后 */
        {
          test: /\.css$/,
          include: /node_modules/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use:['css-loader', 'postcss-loader']
          })
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use:['css-loader', 'postcss-loader']
          })
        }
      ```

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
