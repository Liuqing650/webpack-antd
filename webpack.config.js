const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');

const nodeEnv = process.env.NODE_ENV || 'development';
const isDev = nodeEnv !== 'production';
const ASSET_PATH = process.env.ASSET_PATH || '/';

const CSSModules = true;
const eslint = true;
const stylelint = false;

// Setting the plugins for development/prodcution
const getPlugins = () => {
  // Common
  const plugins = [
    new ExtractTextPlugin({
      filename: '[name].[contenthash:8].css',
      allChunks: true,
      disable: isDev, // Disable css extracting on development
      ignoreOrder: CSSModules
    }),
    new HtmlWebpackPlugin({
      title: 'webpack-antd-5',
      template: path.join(process.cwd(), '/public/index.html')
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        // Javascript lint
        eslint: { failOnError: eslint },
        debug: isDev,
        minimize: !isDev
      }
    }),
    new StyleLintPlugin({ failOnError: stylelint }),
    new webpack.EnvironmentPlugin({ NODE_ENV: JSON.stringify(nodeEnv) }),
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
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
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: Infinity
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest'
      }),
      new ParallelUglifyPlugin({
        uglifyJS: {
          output: {
            comments: false
          },
          compress: {
            warnings: false
          }
        }
      }),
      new webpack.optimize.ModuleConcatenationPlugin()
    );
  }

  return plugins;
};

module.exports = {
  name: 'client',
  target: 'web',
  cache: isDev,
  profile: isDev, // 是否捕捉 Webpack 构建的性能信息
  context: path.resolve(process.cwd()),
  entry: './src/index.js',
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
    historyApiFallback: true
  },
  plugins: getPlugins(),
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        enforce: 'pre',
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: isDev
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract(['style-loader', 'css-loader'])
      }, {
        test: /\.less$/,
        use: ExtractTextPlugin.extract([{
          loader: 'css-loader',
          options: {
            modules: true,
            importLoaders: 1,
            localIdentName: '[path]__[name]__[local]__[hash:base64:5]',
            sourceMap: true
          }
        },
          'less-loader'])
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
  }
};
