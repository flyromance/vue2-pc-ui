const webpack = require("webpack");

let config = require("./webpack/dev.js");

const compiler = webpack(config);

compiler.run(function(err, stats) {
  // code here
});
