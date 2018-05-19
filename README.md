# webpack-demo

  - 使用webpack配置简单服务,用于学习
    - 1. 配置 hash 文件名
      - 作用： 部分前端代码更新后，由于文件名相同，浏览器继续使用原来的静态文件，不会更新，将文件名改为hash值后即可解决此问题，chunkhash则是只会修改有变动的文件名, hash则是全修改。
      - 错误源： ERROR in chunk detail [entry] [name]-[chunkhash].js Cannot use [chunkhash] for chunk in ‘[name]-[chunkhash].js’ (use [hash] instead)
      - 解决方式: 将热替换插件 HotModuleReplacementPlugin() 放到 webpack.dev.js 配置下，打包时候调用的 webpack.prod.js
    - 2. 提取第三方库
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
    - 3. 重新修改模块标识符
      - 作用: 第三方库单独提取出来后，新增文件时 vendor 的文件名依然会修改， 使用插件解决此问题
      - 插件: NamedModulesPlugin 或者 HashedModuleIdsPlugin 
      - 区别: NamedModulesPlugin 使用模块的路径，而不是数字标识符,有助于在开发过程中输出结果的可读性, HashedModuleIdsPlugin 是数字标识符, 执行时间会短一些
    - 4. 新增多线程打包配置项, isHappy = true; 默认开启

    - 5. 修复了样式路径错误问题
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
    - 6. 新增了错误捕获插件 `react-transform-catch-errors`

# 新增了插件

https://github.com/amireh/happypack

happypack 多线程webpack编译文件

webpack-parallel-uglify-plugin 多线程打包文件