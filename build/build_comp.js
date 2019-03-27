const webpack = require("webpack");

const config = require("./webpack/comp");

webpack(config, (err, stat) => {
  if (err) {
    process.exit(1);
  } else {
    process.stdout.write(
      stat.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }) + "\n\n"
    );
  }
});
