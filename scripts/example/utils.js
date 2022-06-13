const path = require('path')
const webpack = require('webpack')
const VueWebpackPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const modeMap = {
  build: 'production',
  dev: 'development'
}

const getCssRule = (isDev, processor = 'css') => {
  const ret = {
    test: new RegExp('\\.' + processor + '$'),
    use: [
      isDev
        ? {
            loader: 'style-loader'
          }
        : {
            loader: MiniCssExtractPlugin.loader
          },
      {
        loader: 'css-loader'
      },
      processor === 'scss' || processor === 'sass'
        ? {
            loader: 'sass-loader'
          }
        : null,
      processor === 'less'
        ? {
            loader: 'less-loader'
          }
        : null,
      processor === 'stylus' || processor === 'styl'
        ? {
            loader: 'stylus-loader'
          }
        : null
    ].filter(Boolean)
  }

  return ret
}

const createWebpackConfig = function (type = 'build') {
  const isDev = type === 'dev'

  return {
    mode: modeMap[type],
    entry: {
      app: './example/src/main.js'
    },
    output: {
      path: path.resolve('dist'),
      publicPath: '/', // 默认就是/
      filename: isDev ? 'js/[name].js' : 'js/[name].[contenthash:8].js',
      chunkFilename: isDev ? 'js/[name].js' : 'js/[name].[contenthash:8].js'
    },
    resolve: {
      extensions: ['.js', '.jsx', '.vue'],
      alias: {
        vuf: path.resolve('src'), // 组件库源码目录
        '@': path.resolve('example/src')
      }
    },
    externals: {},
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader'
            }
          ]
        },
        {
          test: /\.vue$/,
          use: [
            {
              loader: 'vue-loader'
            }
          ]
        },
        getCssRule(isDev, 'css'),
        getCssRule(isDev, 'scss'),
        getCssRule(isDev, 'less'),
        {
          test: /\.(png|jpeg|jpg|gif)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192,
                name: isDev ? 'images/[name].[ext]' : 'images/[name].[contenthash:8].[ext]'
              }
            }
          ]
        },
        {
          test: /\.(tff|woff)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192,
                name: isDev ? 'font/[name].[ext]' : 'font/[name].[contenthash:8].[ext]'
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new VueWebpackPlugin(),
      // https://github.com/webpack-contrib/copy-webpack-plugin/tree/v6.4.1
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve('example/public'),
            toType: 'dir',
            globOptions: {
              // TODO: 为什么不生效
              ignore: ['**/*.html', '.DS_Store', '*.js']
            }
          }
        ]
      }),
      // https://github.com/jantimon/html-webpack-plugin/tree/v4.5.2
      new HtmlWebpackPlugin({
        title: 'example site',
        template: path.resolve('example/src/index.html')
      }),
      // https://github.com/webpack-contrib/mini-css-extract-plugin/tree/v1.6.2
      !isDev &&
        new MiniCssExtractPlugin({
          filename: 'css/[name].[chunkhash:8].css'
        }),
      isDev && new webpack.HotModuleReplacementPlugin(),
      process.env.APP_ANALYZER && new BundleAnalyzerPlugin()
    ].filter(Boolean)
  }
}

function addClientToEntry(entry, arr) {
  if (typeof entry === 'string') {
    return [...arr, entry]
  } else if (Array.isArray(entry)) {
    return [...arr, ...entry]
  } else if (entry && typeof entry === 'object') {
    const ret = {}
    for (let key in entry) {
      ret[key] = addClientToEntry(entry[key], arr)
    }
    return ret
  }
  return entry
}

module.exports = {
  createWebpackConfig,
  addClientToEntry
}
