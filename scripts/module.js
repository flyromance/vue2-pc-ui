/**
 * 打包成模块
 * cjs给node服务端渲染  ems给打包工具
 */
const path = require('path')
const minimist = require('minimist')
const del = require('del')
const gulp = require('gulp')
const gulpBabel = require('gulp-babel')
const gulpLess = require('gulp-less')
const gulpRename = require('gulp-rename')
const fastGlob = require('fast-glob')
const fse = require('fs-extra')

const args = minimist(process.argv.slice(2), {
  default: {
    format: 'esm'
  }
})

const configMap = {
  esm: {
    format: 'esm',
    targetDir: './esm',
    targetAbsDir: path.resolve('./esm')
  },
  cjs: {
    format: 'cjs',
    targetDir: './lib',
    targetAbsDir: path.resolve('./lib')
  }
}

if (!Object.keys(configMap).includes(args.format)) {
  console.log(`unknown format: ${args.format}`)
  process.exit(0)
}

const { format, targetDir } = configMap[args.format]

function clean() {
  return del(targetDir)
}

function copyStyles() {
  return gulp.src('./src/**/*.less').pipe(gulp.dest(targetDir))
}

// 转为css
function styles() {
  return gulp
    .src('./src/*/style/index.less')
    .pipe(gulpLess())
    .pipe(
      gulpRename({
        extname: '.css'
      })
    )
    .pipe(gulp.dest(targetDir))
}

// https://github.com/umijs/babel-plugin-import
// style: 'css' => vuf/lib/style/css => vuf/lib/style/css.js
// style: true => vuf/lib/style => vuf/lib/style/index.js
async function createCssEntry() {
  // [./src/xxx]
  const entries = await fastGlob('./src/*', {
    ignore: ['**/(_utils|style)/**'],
    onlyDirectories: true // 默认是false
  })
  entries.forEach((filepath) => {
    let filename = filepath.split('src/')[1]
    filename = path.join(targetDir, filename, 'style/css.js')
    fse.ensureFileSync(filename)
    fse.writeFileSync(filename, `require('./index.css')`)
  })
}

// 平移编译js/jsx
function scripts() {
  return gulp
    .src('./src/**/*.?(js|jsx)')
    .pipe(
      gulpBabel({
        presets: [['@babel/preset-env'], '@vue/babel-preset-jsx'],
        plugins: ['@babel/plugin-transform-runtime'],
        caller: {
          supportsStaticESM: format === 'esm'
        },
        configFile: false // 不是使用cwd下的babel.config.js
      })
    )
    .pipe(gulp.dest(targetDir))
}

const build = gulp.series(clean, gulp.parallel(copyStyles, styles, createCssEntry, scripts))

build(() => {
  console.log(`${format} done`)
})
