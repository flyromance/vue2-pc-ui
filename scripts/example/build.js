const webpack = require('webpack')
const del = require('del')
const { createWebpackConfig } = require('./utils')

function delDist() {
  return del('./dist')
}

function build() {
  return new Promise(function (resolve, reject) {
    const config = createWebpackConfig('build')
    webpack(config, function (error, stats) {
      if (error) {
        return reject(error)
      }
      if (stats.hasErrors()) {
        return reject('Build failed with errors.')
      }

      console.log('build success')

      resolve()
    })
  })
}

async function start() {
  await delDist()
  await build()
}

start().catch((e) => {
  console.log(e)
})
