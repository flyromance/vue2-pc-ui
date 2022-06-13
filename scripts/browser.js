/**
 * 打包成自执行函数，给浏览器用
 * umd iife
 */
const del = require('del')
const minimist = require('minimist')
const gulp = require('gulp')
const gulpLess = require('gulp-less')
const gulpRename = require('gulp-rename')
const { rollup } = require('rollup')
const { babel } = require('@rollup/plugin-babel')
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const { terser } = require('rollup-plugin-terser')
const alias = require('@rollup/plugin-alias')

const args = minimist(process.argv.slice(2), {
  default: {
    format: 'iife'
  }
})

const configMap = {
  iife: {
    format: 'iife',
    entry: 'src/index.js',
    output: 'umd/index.js',
    minOutput: 'umd/index.min.js',
    targetDir: './umd'
  },
  umd: {
    format: 'umd',
    entry: 'src/index.js',
    output: 'umd/index.js',
    minOutput: 'umd/index.min.js',
    targetDir: './umd'
  }
}

if (!Object.keys(configMap).includes(args.format)) {
  console.log(`unknown format: ${args.format}`)
  process.exit(0)
}

const { targetDir, entry, format, minOutput, output } = configMap[args.format]

function clean() {
  return del(targetDir)
}

function styles() {
  return gulp
    .src('./src/style/index.less')
    .pipe(gulpLess())
    .pipe(
      gulpRename({
        basename: 'index',
        extname: '.css'
      })
    )
    .pipe(gulp.dest(targetDir))
}

const pkg = require('../package.json')
const excludedModuleNames = [...Object.keys(pkg.peerDependencies), ...Object.keys(pkg.devDependencies)]

async function scripts() {
  // alias external
  const bundle = await rollup({
    input: entry,
    external(source) {
      if (excludedModuleNames.includes(source)) {
        return true
      }
      return false
    },
    plugins: [
      nodeResolve({
        extensions: ['.js', '.jsx']
      }),
      alias({}),
      babel({
        configFile: false,
        presets: [['@babel/preset-env'], '@vue/babel-preset-jsx'],
        // plugins: ['@babel/plugin-transform-runtime'], // TODO: 为什么不能设置，因为这是要打包成iife
        babelHelpers: 'bundled'
      })
    ]
  })

  await bundle.write({
    file: output,
    format,
    name: 'Vuf',
    globals: {
      vue: 'Vue'
    }
  })

  await bundle.write({
    file: minOutput,
    format,
    name: 'Vuf',
    globals: {
      vue: 'Vue'
    },
    plugins: [terser()]
  })

  await bundle.close()
}

const build = gulp.series(clean, gulp.parallel(styles, scripts))

build(() => {
  console.log('umd done')
})
