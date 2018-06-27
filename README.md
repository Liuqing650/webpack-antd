# webpack-antd

## 使用webpack配置简单服务,用于学习
  1. 配置 hash 文件名
    - 作用： 部分前端代码更新后，由于文件名相同，浏览器继续使用原来的静态文件，不会更新，将文件名改为hash值后即可解决此问题，chunkhash则是只会修改有变动的文件名, hash则是全修改。
    - 错误源： ERROR in chunk detail [entry] [name]-[chunkhash].js Cannot use [chunkhash] for chunk in ‘[name]-[chunkhash].js’ (use [hash] instead)
    - 解决方式: 将热替换插件 HotModuleReplacementPlugin() 放到 webpack.dev.js 配置下，打包时候调用的 webpack.prod.js
  2. 提取第三方库
    - 将第三方库(library)（例如 lodash 或 react）提取到单独的 vendor chunk 文件中
      ```
        -   entry: './src/index.js',
        +   entry: {
        +     main: './src/index.js',
        +     vendor: [
        +       'lodash'
        +     ]
        +   },
          ...
        +   new webpack.optimize.CommonsChunkPlugin({
        +     name: 'vendor'
        +   }),
            new webpack.optimize.CommonsChunkPlugin({
              name: 'runtime'
            })
      ```
  3. 重新修改模块标识符
    - 作用: 第三方库单独提取出来后，新增文件时 vendor 的文件名依然会修改， 使用插件解决此问题
    - 插件: NamedModulesPlugin 或者 HashedModuleIdsPlugin 
    - 区别: NamedModulesPlugin 使用模块的路径，而不是数字标识符,有助于在开发过程中输出结果的可读性, HashedModuleIdsPlugin 是数字标识符, 执行时间会短一些
  4. 新增多线程打包配置项, isHappy = false; 默认关闭

  5. 修复了样式路径错误问题
    问题出现原因:
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
  6. 新增了错误捕获插件 `react-transform-catch-errors`
  7. 关闭了多线程打包,原因如下,测试环境相同(3个线程),都没有修改文件,连续打包后发现数据相差无几,故关闭该处配置.
  8. 添加新分支`antd-dva`,配置 `webpack` + `dva`
  9. 添加 `axios`
  10. 添加 `mockjs`
  11. 修复错误日志不显示在屏幕的问题
  12. 调整开发模式的控制台日志显示,关闭 `modules: false` 
  13. 调整构建模块信息.展示运行进度 `--progress`
  14. 新增 [`autodll-webpack-plugin`](https://github.com/asfktz/autodll-webpack-plugin) 插件, 新增 `isAutoDll = true` 配置项, 默认开启 `dll` 功能 打包性能有所提升
  15. 新增预览命令 `npm run preview`, 且在 `Ubuntu` 下执行有效, 不支持 `Windows`
  16. 新增 `request` 处理请求
  17. 新增 **Mock** 数据配置入口

## 多线程打包测试结果

|状态|是否开启多线程|首次运行(ms)|再次运行(ms)|三次运行(ms)|四次(ms)|五次运行(ms)|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|开发模式|是|16335|13970|13888|13451|13604|
|开发模式|否|15666|14109|14020|13826|13791|
|发布模式|是|29978|10812|10833|10567|10266|
|发布模式|否|11794|10531|11203|10648|10630|
----
