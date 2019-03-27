const path = require("path");
const merge = require("webpack-merge");
const baseConfig = require("./base");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");

const CWD = process.cwd();

module.exports = merge(baseConfig, {
  devtool: "eval-source-map",

  // 入口
  entry: {
    main: "./example/main",
    // vendors: ["vue", "vue-router"]
  },
  // 输出
  output: {
    path: path.join(CWD, "example/dist"),
    publicPath: "/",
    filename: "[name].js",
    chunkFilename: "[id].chunk.js"
  },
  resolve: {
    alias: {
      // iview: "../../src/index",
      vue: "vue/dist/vue.esm.js"
      // vue: 'vue/dist/vue.runtime.js'
    }
  },
  plugins: [
    // new webpack.optimize.CommonsChunkPlugin({ name: "vendors", filename: "vendor.bundle.js" }),
    new HtmlWebpackPlugin({
      inject: true,
      filename: path.join(CWD, "example/dist/index.html"),
      template: path.join(CWD, "example/index.html")
    }),
    new FriendlyErrorsPlugin()
  ]
});
