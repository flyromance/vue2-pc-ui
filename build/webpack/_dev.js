const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CWD = process.cwd();

// vue-loader >= 15 才需要下面
// const VueLoaderPlugin = require("vue-loader/lib/plugin");

function resolve(val = "") {
  return path.join(CWD, val);
}

module.exports = {
  devtool: "source-map",
  entry: {
    app: path.join(CWD, "example", "main.js")
  },
  output: {
    path: path.join(CWD, "example", "dist"),
    filename: "[name].[hash:8].js",
    publicPath: "/",
    chunkFilename: "[id].[hash:8].js"
  },
  resolve: {
    extensions: [".js", ".vue", ".json"],
    alias: {
      // 'vue$': 'vue/dist/vue.esm.js'
    },
    modules: ["node_modules"],
    mainFields: ["jsnext:main", "browser", "module", "main"]
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        loader: "vue-loader",
        // vue-loader <= 14 默认是按照自身推断的，如果想要自定义配置，要按照如下设置
        // options: {
        //   loaders: {
        //     css: [
        //       "vue-style-loader",
        //       {
        //         loader: "css-loader",
        //         options: {
        //           sourceMap: true
        //         }
        //       }
        //     ],
        //     less: [
        //       "vue-style-loader",
        //       {
        //         loader: "css-loader",
        //         options: {
        //           sourceMap: true
        //         }
        //       },
        //       {
        //         loader: "less-loader",
        //         options: {
        //           sourceMap: true
        //         }
        //       }
        //     ]
        //   },
        //   postLoaders: {
        //     html: "babel-loader?sourceMap"
        //   },
        //   sourceMap: true
        // }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
            options: {}
          },
          {
            loader: "css-loader",
            options: {}
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader",
            options: {}
          },
          {
            loader: "css-loader",
            options: {}
          },
          {
            loader: "less-loader",
            options: {}
          }
        ]
      },
      {
        test: /\.(gif|png|jpg|jpeg|svg|ttf|eot)$/,
        loader: "url-loader",
        options: {
          limit: 8192
        }
      }
    ]
  },
  devServer: {
    port: 8080,
    hot: true,
    contentBase: resolve("example/dist"),
    historyApiFallback: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: resolve("example/index.html"),
      filename: "index.html",
      chunks: ["app"]
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development")
    })
  ]
};
