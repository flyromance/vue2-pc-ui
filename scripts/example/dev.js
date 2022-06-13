const path = require('path')
const webpack = require('webpack')
const webpackDevServer = require('webpack-dev-server')
const { createWebpackConfig, addClientToEntry } = require('./utils')

async function dev() {
  const config = createWebpackConfig('dev')

  const devClients = [
    // dev server client
    require.resolve(`webpack-dev-server/client`),
    // hmr client
    require.resolve('webpack/hot/dev-server')
  ]

  config.entry = addClientToEntry(config.entry, devClients)

  const comipler = webpack(config)

  const devServerConfig = {
    logLevel: 'silent',
    clientLogLevel: 'silent',
    historyApiFallback: true,
    port: 8888,
    host: '127.0.0.1',
    disableHostCheck: true,
    publicPath: config.publicPath,
    contentBase: path.resolve('./example/public'), // config.output.path 这个默认添加了
    // watchContentBase: false, // TODO: 为什么修改babel.config.js会导致重写编译
    hot: true, // 启动模块热替换功能
    // injectClient: false,
    proxy: {}
  }

  const server = new webpackDevServer(comipler, devServerConfig)

  ;['SIGTERM', 'SIGINT'].forEach((key) => {
    process.on(key, () => {
      server.close(() => {
        process.exit(0)
      })
    })
  })

  return new Promise(function (resolve, reject) {
    let isFirstCompilation = true
    comipler.hooks.done.tap('vuf dev', (stats) => {
      if (stats.hasErrors()) {
        return
      }

      if (isFirstCompilation) {
        isFirstCompilation = false
        console.log(`server url: http://${devServerConfig.host}:${devServerConfig.port}`)
        resolve()
      } else {
        console.log('update app done')
      }
    })
    server.listen(devServerConfig.port, devServerConfig.host, (e) => {
      if (e) {
        return reject(e)
      }
    })
  })
}

async function start() {
  await dev()
}

start().catch((e) => {
  console.log(e)
})
