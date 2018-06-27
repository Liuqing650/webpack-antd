const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const AutoDllPlugin = require('autodll-webpack-plugin');
const HappyPack = require('happypack');
const os = require('os');

const nodeEnv = process.env.NODE_ENV || 'development';
const isDev = nodeEnv !== 'production';
const ASSET_PATH = process.env.ASSET_PATH || '/';

const isHappy = false; // 开启多线程打包
const isAutoDll = true; // 是否开启 autodll
const eslint = true;
const stylelint = false;

const vendor = [
  'react',
  'react-dom',
  // 'react-loadable',
  'redbox-react',
  'axios'
];

console.log(isDev ? '开发模式' : '发布模式');

HappyPack.SERIALIZABLE_OPTIONS = HappyPack.SERIALIZABLE_OPTIONS.concat(['postcss'])
// 构建HappyPlugin应用
const createHappyPlugin = (id, loaders) => new HappyPack({
  id,
  loaders,
  cache: true,
  threadPool: HappyPack.ThreadPool({ size: os.cpus().length - 1 }),
  verbose: true, // 日志
});

// 设置插件环境 development/prodcution
const getPlugins = () => {
  // Common
  const plugins = [
    new ExtractTextPlugin({
      filename: '[name].[contenthash:8].css',
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      title: 'webpack-antd',
      template: path.join(process.cwd(), '/public/index.html')
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest'
    }),
    new StyleLintPlugin({ failOnError: stylelint }),
    new webpack.EnvironmentPlugin({ NODE_ENV: JSON.stringify(nodeEnv) }),
    new webpack.DefinePlugin({
      'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH),
      __DEV__: isDev
    }),
    new webpack.NoEmitOnErrorsPlugin()
  ];

  if (isDev) {
    plugins.push(
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin()
    );
  } else {
    plugins.push(
      new CleanWebpackPlugin(['public/dist']),
      new webpack.HashedModuleIdsPlugin(),
      new ParallelUglifyPlugin({
        cacheDir: '.cache/', // 开启缓存功能
        uglifyJS: {
          output: {
            comments: false
          },
          compress: {
            warnings: false
          }
        }
      }),
      new webpack.optimize.ModuleConcatenationPlugin(),
      new CopyWebpackPlugin([{ 
        from: 'assets/*', context: 'public/'
      }])
    );
  }
  if (isAutoDll) {
    plugins.push(
      new AutoDllPlugin({
        context: path.resolve(process.cwd()),
        inject: true,
        filename: '[name].dll.js',
        entry: {
          vendor
        }
      })
    )
  }
  if (isHappy) {
    plugins.push(
      createHappyPlugin(
        'babel',
        [
          {
            loader: 'babel-loader',
            query: {
              cacheDirectory: isDev
            }
          }
        ]
      ),
      createHappyPlugin(
        'css',
        ['css-loader', 'postcss-loader']
      ),
      createHappyPlugin(
        'cssModules',
        [
          'css-loader',
          'postcss-loader'
        ]
      ),
      createHappyPlugin(
        'lessModules',
        [
          'css-loader', 'postcss-loader',
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true
            }
          }
        ]
      ),
      createHappyPlugin(
        'less',
        [
          {
            loader: 'css-loader',
            options: {
              modules: true,
              import: true,
              importLoaders: 1,
              localIdentName: '[path]__[name]__[local]__[hash:base64:5]',
              sourceMap: true
            }
          },
          { loader: 'postcss-loader', options: { sourceMap: true } },
          {
            loader: 'less-loader',
            options: {
              outputStyle: 'expanded',
              sourceMap: true,
              javascriptEnabled: true,
              sourceMapContents: !isDev
            }
          }
        ]
      )
    );
  }
  return plugins;
};

// 使用 happypack 时不能携带query.
// https://github.com/amireh/happypack/issues/145
const getBabelLoaders = () => {
  if (isHappy) {
    return {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'happypack/loader?id=babel'
    };
  }
  return {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    loader: 'babel-loader',
    query: {
      cacheDirectory: isDev
    }
  };
};
module.exports = {
  name: 'client',
  target: 'web',
  cache: isDev,
  profile: isDev, // 是否捕捉 Webpack 构建的性能信息
  context: path.resolve(process.cwd()),
  entry: {
    index: './src/index.js',
    vendor
  },
  devtool: isDev ? 'inline-source-map' : 'hidden-source-map',
  output: {
    path: path.join(__dirname, 'public/dist'),
    publicPath: ASSET_PATH,
    filename: isDev ? '[name].js' : '[name].[chunkhash:8].js',
    chunkFilename: isDev ? '[name].chunk.js' : '[name].[chunkhash:8].chunk.js',
    pathinfo: isDev
  },
  devServer: {
    contentBase: path.join(__dirname, "public"),
    historyApiFallback: false,
    overlay: true,
    stats: {
      modules: false,
      colors: true
    },
    headers: {
      'maby': 'demo'
    }
  },
  plugins: getPlugins(),
  module: {
    loaders: [
      {
        test: /\.(js|jsx)?$/,
        enforce: 'pre',
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
      getBabelLoaders(),
      {
        test: /\.css$/,
        include: /node_modules/,
        use: ExtractTextPlugin.extract(
          isHappy ? ('style-loader', 'happypack/loader?id=cssModules') :
          [
            'style-loader', 'css-loader', 'postcss-loader'
          ]
        )
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract(
          isHappy ? ('style-loader', 'happypack/loader?id=css') :
          [
            'style-loader',
            'css-loader',
            'postcss-loader'
          ]
        )
      }, {
        test: /\.less$/,
        include: /node_modules/,
        use: ExtractTextPlugin.extract(
          isHappy ? ('style-loader', 'happypack/loader?id=lessModules') :
          [
            'css-loader', 'postcss-loader', 
              {
                loader: 'less-loader',
                options: {
                  javascriptEnabled: true
                }
              }
          ]
        )
      }, {
        test: /\.less$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract(
          isHappy ? 'happypack/loader?id=less' : 
          [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                import: true,
                importLoaders: 1,
                localIdentName: '[path]__[name]__[local]__[hash:base64:5]',
                sourceMap: true
              }
            },
            { loader: 'postcss-loader', options: { sourceMap: true } },
            {
              loader: 'less-loader',
              options: {
                outputStyle: 'expanded',
                sourceMap: true,
                javascriptEnabled: true,
                sourceMapContents: !isDev
              }
            }
          ]
        )
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src/'), 'node_modules'],
    extensions: ['.js', '.jsx', '.json']
  }
};
