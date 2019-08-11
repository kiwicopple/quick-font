'use strict'

// Load plugins
const autoprefixer = require('autoprefixer')
const browsersync = require('browser-sync').create()
const cssnano = require('cssnano')
const del = require('del')
const eslint = require('gulp-eslint')
const fileinclude = require('gulp-file-include')
const gulp = require('gulp')
const imagemin = require('gulp-imagemin')
const newer = require('gulp-newer')
const plumber = require('gulp-plumber')
const postcss = require('gulp-postcss')
const rename = require('gulp-rename')
const sass = require('gulp-sass')
const webpack = require('webpack')
const webpackconfig = require('./webpack.config.js')
const webpackstream = require('webpack-stream')

// BrowserSync
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: './_site/',
    },
    port: 3000,
  })
  done()
}

// BrowserSync Reload
function browserSyncReload(done) {
  browsersync.reload()
  done()
}

// Clean assets
function clean() {
  return del(['./_site/assets/'])
}

function copy() {
  return gulp
    .src('./css/**/*')
    .pipe(gulp.dest('./_site/css'))
}

// Build HTML
function site() {
  return gulp
    .src('./src/pages/**/*.html')
    .pipe(
      fileinclude({
        prefix: '@@',
        basepath: '@file',
      })
    )
    .pipe(gulp.dest('./_site'))
}

// Optimize Images
function images() {
  return gulp
    .src('./src/assets/img/**/*')
    .pipe(newer('./_site/assets/img'))
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.jpegtran({ progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [
            {
              removeViewBox: false,
              collapseGroups: true,
            },
          ],
        }),
      ])
    )
    .pipe(gulp.dest('./_site/assets/img'))
}

// CSS task
function css() {
  return gulp
    .src('./src/assets/scss/**/*.scss')
    .pipe(plumber())
    .pipe(sass({ outputStyle: 'expanded' }))
    .pipe(gulp.dest('./_site/assets/css/'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(gulp.dest('./_site/assets/css/'))
    .pipe(browsersync.stream())
}

// Lint scripts
function scriptsLint() {
  return gulp
    .src(['./src/assets/js/**/*', './gulpfile.js'])
    .pipe(plumber())
    .pipe(eslint())
    .pipe(eslint.format())
    // .pipe(eslint.failAfterError())
}

// Transpile, concatenate and minify scripts
function scripts() {
  return (
    gulp
      .src(['./src/assets/js/**/*'])
      .pipe(plumber())
      .pipe(webpackstream(webpackconfig, webpack))
      // folder only, filename is specified in webpack config
      .pipe(gulp.dest('./_site/assets/js/'))
      .pipe(browsersync.stream())
  )
}

// Watch files
function watchFiles() {
  gulp.watch('./src/assets/scss/**/*', css)
  gulp.watch(['./src/includes/**/*', './src/pages/**/*'], site)
  gulp.watch('./css/**/*', copy)
  gulp.watch('./src/assets/js/**/*', gulp.series(scriptsLint, scripts))
  gulp.watch(['./src/includes/**/*', './src/pages/**/*'], gulp.series(browserSyncReload))
  gulp.watch('./src/assets/img/**/*', images)
}

// define complex tasks
const js = gulp.series(scriptsLint, scripts)
const build = gulp.series(clean, gulp.parallel(css, images, js, site, copy))
const watch = gulp.parallel(watchFiles, browserSync)

// export tasks
exports.images = images
exports.css = css
exports.js = js
exports.clean = clean
exports.build = build
exports.watch = watch
exports.default = build
