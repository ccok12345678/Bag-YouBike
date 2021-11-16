const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const sass = require('gulp-sass')(require('node-sass'));
const minimist = require('minimist');
const del = require('del');
const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync');
const { syncBuiltinESMExports } = require('module');
const path = require('path');
// const { dest } = require('vinyl-fs');

// 環境設定
const envOpts = {
  string: 'env',
  default: { env: 'develop' }
};
const opts = minimist(process.argv.slice(2), envOpts);
console.log(opts);

function clean() {
  return del([
    './public'
  ])
}

exports.clean = clean;

// Pug
function buildTemplate() {
  return gulp.src('./src/**/*.pug')
    .pipe($.data(() => {
      const menu = require('./src/data/menu.json');
      const data = {
        menu,
      }
      return data;
    }))
    .pipe($.pug({
      pretty: true,
    }))
    .pipe(gulp.dest('./public/'))
    .pipe(browserSync.stream());
}

exports.pug = buildTemplate;

// Sass
function buildStyle() {
  const plugins = [
    autoprefixer(),
  ];

  return gulp.src('./src/stylesheets/*.scss')
    .pipe($.sourcemaps.init())
    .pipe(sass({
      outputstyle: 'nest',
      includePaths: ['./node_modules/bootstrap/scss']
    }).on('error', sass.logError))
    .pipe($.postcss(plugins))
    .pipe($.if(opts.env === 'production', $.cleanCss()))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('./public/stylesheets'))
    .pipe(browserSync.stream());
}

exports.sass = buildStyle;

// babel
function buildScript() {
  return gulp.src('./src/js/**/*.js')
    .pipe($.sourcemaps.init())
    // .pipe($.babel(
    //   { presets: ['@babel/env'] }
    // ))
    // .pipe($.concat('all.js'))
    .pipe($.if(opts.env === 'production', $.uglify({
      compress: {
        drop_console: true,
      }
    })))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('./public/js/'))
    .pipe(browserSync.stream());
}

exports.babel = buildScript;

// 第三方套件
function vendorJS() {
  return gulp.src([
    './node_modules/bootstrap/dist/js/bootstrap.min.js',
    './node_modules/axios/dist/axios.min.js'
  ])
  .pipe($.order([
    'bootstrap.min.js',
    'axios.min.js'
  ]))
  .pipe($.concat('vendor.js'))
  .pipe($.if(opts.env === 'production', $.uglify()))
  .pipe(gulp.dest('./public/js/'));
}

exports.vendor = vendorJS;

// images
function imageMin() {
  return gulp.src('./src/images/**/*')
    .pipe($.if(opts.env === 'production', $.imagemin()))
    .pipe(gulp.dest('./public/images/'))
    .pipe(browserSync.stream());
}

exports.imagemin = imageMin;

// browserSync
function browser_sync() {
  browserSync.init({
    server: {
      baseDir: './public',
      index: 'index.html'
    },
    reloadDebounce: 3
  });
}

exports.sync = browser_sync;

// deploy on github page
function deploy() {
  return gulp.src('./public/**/*')
    .pipe($.ghPages());
}

exports.deploy = deploy;

// watch
function watch() {
  gulp.watch('./src/stylesheets/**/*.scss', buildStyle)
    .on('unlink', evt => del(`.public/stylesheets/**/${path.basename(evt, '.scss')}.css`));
  gulp.watch('./src/**/*.pug', buildTemplate)
    .on('unlink', evt => del(`.public/**/${path.basename(evt, '.pug')}.html`));
  gulp.watch('./src/js/**/*.js', buildScript)
    .on('unlink', evt => del(`.public/js/**/${path.basename(evt)}`));
  gulp.watch('./src/images/**/*', imageMin)
    .on('unlink', evt => del(`.public/images/**/${path.basename(evt)}`));

  browser_sync();
}

exports.watch = watch;

// build
exports.build = gulp.series(
  clean,
  buildTemplate,
  buildStyle,
  buildScript,
  vendorJS,
  imageMin
);

exports.default = gulp.series(
  buildTemplate,
  buildStyle,
  buildScript,
  vendorJS,
  imageMin,
  watch
);
